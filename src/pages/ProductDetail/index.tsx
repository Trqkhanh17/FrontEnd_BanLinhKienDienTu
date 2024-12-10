import { Col, Container, Image, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import MySwiper from "../../components/Swiper";
import MyCount from "../../components/Count";
import ButtonCustomize from "../../components/Button";
import { getProductByIDAPI } from "../../api/productAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/productInterfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSession, setSession } from "../../utils";
import { YourCart } from "../../interfaces/cartInterface";
import { addCartToStore } from "../../redux/features/cartSlice";

const ProductDetail = () => {
  const user = useAppSelector((state) => state.profile.dataProfile);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState<Product | null>(null);
  const getProductDetails = async () => {
    try {
      const res = await getProductByIDAPI(params.proId + "");
      setData(res.data.data[0]);
    } catch (error) {
      toast.error(error + "");
    }
  };

  const handleOnClick = async () => {
    if (!user) {
      return navigate("/login");
    }

    const getCartItem: YourCart = getSession("yourCart"); // Lấy dữ liệu giỏ hàng từ session

    if (!getCartItem || getCartItem.email !== user.cus_email) {
      // Nếu giỏ hàng chưa tồn tại hoặc thuộc email khác, tạo giỏ hàng mới
      const storeCart = {
        email: user.cus_email,
        listCart: [{ ...data, quantity }],
      };
      setSession("yourCart", storeCart);
      dispatch(addCartToStore(getCartItem));
      return;
    }

    // Nếu giỏ hàng đã tồn tại và thuộc cùng email
    const existingProductIndex = getCartItem.listCart.findIndex(
      (item) => item.pro_id === data?.pro_id
    );

    if (existingProductIndex !== -1) {
      // Sản phẩm đã tồn tại trong giỏ hàng, cập nhật số lượng
      getCartItem.listCart[existingProductIndex].quantity += quantity;
    } else {
      // Sản phẩm chưa tồn tại, thêm sản phẩm mới
      if (data) {
        getCartItem.listCart.push({ ...data, quantity });
      }
    }

    // Cập nhật lại giỏ hàng vào session
    setSession("yourCart", getCartItem);
    dispatch(addCartToStore(getCartItem));
    return;
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return (
    <Layout>
      <Container fluid className="mt-3 mb-3">
        <Row>
          <Col md={7}>
            <Row className="mt-3 mb-3 justify-content-center">
              <Image className="w-75" fluid src={data?.image} />
            </Row>
            <Row
              style={{
                position: "relative",
                margin: "20px 50px",
                background: "background: #bdc3c7",
              }}
            >
              <MySwiper
                data={data ? data.gallery : []}
                loop={true}
                slidesPerView={4}
                spaceBetween={10}
              />
            </Row>
          </Col>
          <Col md={5} className="">
            <Row>
              <h1>{data?.pro_name}</h1>
            </Row>
            <Row>
              <h3 className="text-danger">
                <strong>{data?.price} vnd</strong>
              </h3>
            </Row>
            <Row className="mt-3">
              <h4>Số lượng: 200</h4>
            </Row>
            <Row className="mt-3">
              <h5>Brand: {data?.pro_brand}</h5>
            </Row>
            <Row className="mt-3">
              <h5>Origin: {data?.pro_origin}</h5>
            </Row>
            <Row className="mt-3 mb-3">
              <h5>Description: {data?.pro_description}</h5>
            </Row>
            <Row className="w-50">
              <MyCount onChange={setQuantity} />
            </Row>
            <Row className="mt-3 w-50">
              <ButtonCustomize
                size="lg"
                title="Add to cart"
                onClick={() => handleOnClick()}
              />
            </Row>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductDetail;
