import { Button, Col, Container, Row } from "react-bootstrap";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";
interface Props {
  total: number;
}

const BoxTotalCart: React.FC<Props> = ({ total }) => {
  const navigate = useNavigate();

  return (
    <Container fluid className={style.boxCart}>
      <Row className={style.BoxInforOrderText}>
        <Col className="p-0">
          <h5>Information Order</h5>
        </Col>
      </Row>
      <Row className={style.BoxTotalMoney}>
        <Col className="p-0 d-flex justify-content-between align-items-center gap-5">
          <strong>Total money:</strong>
          <span className={style.totalMoney}>{total.toFixed(0)} vnd</span>
        </Col>
      </Row>
      <Row>
        <Col className="p-0">
          <ul className="ps-3">
            <li>Shipping charges will be calculated at checkout.</li>
          </ul>
        </Col>
      </Row>
      <Row style={{ width: "100%" }}>
        <Button
          onClick={() => navigate("/payment")}
          variant="danger"
          className={style.buttonPayment}
        >
          Payment
        </Button>
      </Row>
    </Container>
  );
};

export default BoxTotalCart;
