import { Col, Container, Image, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import MySwiper from "../../components/Swiper";
import ButtonCustomize from "../../components/Button";
import { getProductByIDAPI } from "../../api/productAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Product } from "../../interfaces/productInterfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSession, setSession } from "../../utils";
import { YourCart } from "../../interfaces/cartInterface";
import { addCartToStore } from "../../redux/features/cartSlice";
import style from "./style.module.css";

const ProductDetail = () => {
  const user = useAppSelector((state) => state.profile.dataProfile);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState<Product | null>(null);

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };
  console.log("Check data", data);

  const getProductDetails = useCallback(async () => {
    try {
      const res = await getProductByIDAPI(params.proId + "");

      if (res.data.statusCode === 404) {
        return toast.warning(res.data.message);
      }
      return setData(res.data.data[0]);
    } catch (error) {
      console.log(error);
      return toast.warning("Not found!!!");
    }
  }, [params]);

  const handleOnClick = async () => {
    if (!user) {
      return navigate("/login");
    }

    // Lấy danh sách giỏ hàng từ session
    const getCartItem: YourCart[] = getSession("yourCart") || [];
    console.log("Check getCartItem ", getCartItem);

    // Tìm giỏ hàng của người dùng hiện tại dựa trên email
    const userCart = getCartItem.find((cart) => cart.email === user.cus_email);

    if (!userCart) {
      // Nếu không có giỏ hàng của user, tạo mới
      if (!data) {
        return;
      }
      const newCart = {
        email: user.cus_email,
        listCart: [{ ...data, quantity }],
      };
      getCartItem.push(newCart);
      setSession("yourCart", getCartItem);
      dispatch(addCartToStore(getCartItem[0]));
      toast.success("Add to cart successfull");
      return;
    }

    // Giỏ hàng đã tồn tại, kiểm tra sản phẩm trong giỏ
    const existingProductIndex = userCart.listCart.findIndex(
      (item) => item.pro_id === data?.pro_id
    );

    if (existingProductIndex !== -1) {
      // Sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
      userCart.listCart[existingProductIndex].quantity += quantity;
    } else {
      // Sản phẩm chưa tồn tại, thêm mới
      if (data) {
        userCart.listCart.push({ ...data, quantity });
      }
    }

    // Cập nhật giỏ hàng vào session
    setSession("yourCart", getCartItem);
    const filter = getCartItem.filter((x) => x.email === user.cus_email);
    dispatch(addCartToStore(filter[0]));
    toast.success("Add to cart successfull");
  };

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  return (
    <Layout>
      {data ? (
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
                <h4>Số lượng: {data.quantity}</h4>
              </Row>
              <Row className="mt-3">
                <h5>Hãng: {data?.pro_brand}</h5>
              </Row>
              <Row className="mt-3">
                <h5>Xuất xứ: {data?.pro_origin}</h5>
              </Row>
              <Row className="mt-3 mb-3">
                <h5>Mô tả: {data?.pro_description}</h5>
              </Row>
              <Container className={style.containerCount}>
                <Row className="w-50">
                  <Col
                    className={style.boxDes}
                    onClick={() => setQuantity((state) => state - 1)}
                  >
                    -
                  </Col>
                  <Col className={`${style.boxValue}`}>
                    <input
                      className={style.inputValue}
                      type="number"
                      onChange={(e) => handleSetValue(e)}
                      value={quantity}
                    />
                  </Col>
                  <Col
                    className={style.boxInc}
                    onClick={() => setQuantity((state) => state + 1)}
                  >
                    +
                  </Col>
                </Row>
              </Container>
              <Row className="mt-3 w-50">
                <ButtonCustomize
                  size="lg"
                  title="Thêm vào giỏ hàng"
                  onClick={() => handleOnClick()}
                />
              </Row>
            </Col>
          </Row>
        </Container>
      ) : null}
    </Layout>
  );
};

export default ProductDetail;
