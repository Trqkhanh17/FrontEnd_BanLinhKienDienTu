import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface Props {
  total: number;
  cart: any;
}

const BoxTotalCart: React.FC<Props> = ({ total, cart }) => {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    if (!cart || cart.length === 0) {
      toast.warning("Giỏ hàng của bạn đang trống");
      return;
    }
    navigate("/payment");
  };
  return (
    <Container fluid className={style.boxCart}>
      <Row className={style.BoxInforOrderText}>
        <Col className="p-0">
          <h5>Thông tin đơn hàng</h5>
        </Col>
      </Row>
      <Row className={style.BoxTotalMoney}>
        <Col className="p-0 d-flex justify-content-between align-items-center gap-5">
          <strong>Tổng tiền:</strong>
          <span className={style.totalMoney}>{total.toFixed(0)} vnd</span>
        </Col>
      </Row>
      <Row>
        <Col className="p-0">
          <ul className="ps-3">
            <li>Phí vận chuyển sẽ được tính khi thanh toán.</li>
          </ul>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Button
          onClick={() => handleFormSubmit()}
          variant="danger"
          className={style.buttonPayment}
        >
          Mua
        </Button>
      </Row>
    </Container>
  );
};

export default BoxTotalCart;
