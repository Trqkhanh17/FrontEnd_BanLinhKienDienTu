import { Col, Container, Image, Row } from "react-bootstrap";
import IconVietQR from "../../assets/images/VietQR.png";
import Bank from "../../assets/images/Bank.png";

const QRPayment = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center "
    >
      <Row>
        <Col className="d-flex justify-content-center">
          <Image fluid width={"20%"} src={IconVietQR} />
        </Col>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Image fluid width={"50%"} src={Bank} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Row>
          <Col className="d-flex justify-content-between">
            <span>Money:</span>
            <strong>90 $</strong>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between">
            <span>Account:</span>
            <strong>Joyfull Letter Team</strong>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-between">
            <span>Account Number:</span>
            <strong>09388383782</strong>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

export default QRPayment;
