import { Col, Image, Row } from "react-bootstrap";
import style from "./style.module.css";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import MyCount from "../Count";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSession, setSession } from "../../utils";
import { addCartToStore } from "../../redux/features/cartSlice";
import { YourCart } from "../../interfaces/cartInterface";
interface Props {
  image: string;
  price: number;
  quantity: number;
  name: string;
  decription: string;
  proId: number;
}
const BoxCard: React.FC<Props> = ({
  image,
  name,
  price,
  quantity,
  decription,
  proId,
}) => {
  const [quant, setQuant] = useState<number>(quantity);
  const user = useAppSelector((state) => state.profile.dataProfile);
  const dispatch = useAppDispatch();

  const deleteCart = () => {
    // Lấy danh sách giỏ hàng từ session
    const getCartItem: YourCart[] = getSession("yourCart") || [];

    // Tìm giỏ hàng của người dùng hiện tại dựa trên email
    const userCart = getCartItem.find((cart) => cart.email === user?.cus_email);
    console.log("check userCart ", userCart);

    if (userCart) {
      // Sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
      userCart.listCart = userCart?.listCart.filter((x) => x.pro_id !== proId);
      console.log("check getCartItem ", getCartItem);

      // Cập nhật giỏ hàng vào session
      setSession("yourCart", getCartItem);
      const filter = getCartItem.filter((x) => x.email === user?.cus_email);
      dispatch(addCartToStore(filter[0]));
    }
  };

  return (
    <Row className={style.boxContainerBoxCart}>
      <MdDeleteForever
        className={style.removeCart}
        onClick={() => deleteCart()}
      />
      <Col md={3} className="p-0">
        <Image className={style.imageBoxCart} src={image} fluid alt={image} />
      </Col>
      <Col md={6} className="mt-2">
        <h5>{name}</h5>
        <p className={style.decriptionCart}>{decription}</p>
        <div className={style.priceProduct}>{price} vnd</div>
      </Col>
      <Col
        className="d-flex flex-column mt-2 mb-2 justify-content-around align-items-end"
        md={3}
      >
        <Row>
          <strong>{price * quantity} vnd</strong>
        </Row>
        <Row className="p-2">
          <MyCount
            proId={proId}
            valueP={quant}
            width={25}
            onChange={setQuant}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default BoxCard;
