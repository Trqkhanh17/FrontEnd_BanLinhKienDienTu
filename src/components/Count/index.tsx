import { ChangeEvent, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./style.module.css";
import { toast } from "react-toastify";
import { YourCart } from "../../interfaces/cartInterface";
import { getSession, setSession } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCartToStore } from "../../redux/features/cartSlice";

interface Props {
  onChange: (value: number) => void;
  width?: number;
  proId?: number;
  valueP?: number;
}
const MyCount: React.FC<Props> = ({ onChange, width, proId, valueP }) => {
  const [value, setValue] = useState(valueP || 0);
  const user = useAppSelector((state) => state.profile.dataProfile);
  const dispatch = useAppDispatch();

  const handleIncreaseValue = () => {
    upQuantity();
    setValue((state) => state + 1);
  };

  const handleDescreaseValue = () => {
    lowQuantity();
    setValue((state) => state - 1);
  };

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) {
      setValue(1);
    } else {
      setValue(value);
    }
  };

  const upQuantity = () => {
    // Lấy danh sách giỏ hàng từ session
    const getCartItem: YourCart[] = getSession("yourCart") || [];

    // Tìm giỏ hàng của người dùng hiện tại dựa trên email
    const userCart = getCartItem.find((cart) => cart.email === user?.cus_email);

    if (!userCart) {
      return null;
    }

    // Giỏ hàng đã tồn tại, kiểm tra sản phẩm trong giỏ
    const existingProductIndex = userCart.listCart.findIndex(
      (item) => item.pro_id === proId
    );

    if (existingProductIndex !== -1) {
      // Sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
      userCart.listCart[existingProductIndex].quantity += 1;
    }

    // Cập nhật giỏ hàng vào session
    setSession("yourCart", getCartItem);
    const filter = getCartItem.filter((x) => x.email === user?.cus_email);
    dispatch(addCartToStore(filter[0]));
  };

  const lowQuantity = () => {
    // Lấy danh sách giỏ hàng từ session
    const getCartItem: YourCart[] = getSession("yourCart") || [];

    // Tìm giỏ hàng của người dùng hiện tại dựa trên email
    const userCart = getCartItem.find((cart) => cart.email === user?.cus_email);

    if (!userCart) {
      return null;
    }

    // Giỏ hàng đã tồn tại, kiểm tra sản phẩm trong giỏ
    const existingProductIndex = userCart.listCart.findIndex(
      (item) => item.pro_id === proId
    );

    if (existingProductIndex !== -1) {
      // Sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
      userCart.listCart[existingProductIndex].quantity -= 1;
    }

    // Cập nhật giỏ hàng vào session
    setSession("yourCart", getCartItem);
    const filter = getCartItem.filter((x) => x.email === user?.cus_email);
    dispatch(addCartToStore(filter[0]));
  };

  useEffect(() => {
    if (value <= 0) {
      toast.warning("Quantity must be is positive number!!!");
      setValue(1);
    }
    if (valueP) {
      onChange(valueP);
    } else {
      onChange(1);
    }
  }, [value, onChange, valueP]);

  return (
    <Container fluid className={style.containerCount}>
      <Row>
        <Col className={style.boxDes} onClick={() => handleDescreaseValue()}>
          -
        </Col>
        <Col className={`${style.boxValue}`} style={{ width: width }}>
          <input
            className={style.inputValue}
            type="number"
            onChange={(e) => handleSetValue(e)}
            value={value}
          />
        </Col>
        <Col className={style.boxInc} onClick={() => handleIncreaseValue()}>
          +
        </Col>
      </Row>
    </Container>
  );
};

export default MyCount;
