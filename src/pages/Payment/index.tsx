import { Col, Container, Row } from "react-bootstrap";
import style from "./style.module.css";
import BoxConfirmInformation from "../../components/BoxConfirmInformation";
import PaymentRight from "../../components/PaymentRight";
const Payment = () => {
  return (
    <Container className={style.BoxPayment} fluid>
      <Row className={style.boxContent}>
        <Col className={style.paymentLeft} md={6}>
          <BoxConfirmInformation />
        </Col>
        <Col className={style.paymentRight} md={6}>
          <PaymentRight />
        </Col>
      </Row>
    </Container>
  );
};

export default Payment;
