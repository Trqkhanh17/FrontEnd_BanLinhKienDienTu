import { Col, Container, Image, Row } from "react-bootstrap";
import image from "../../assets/images/image_leter.jpg";
import style from "./style.module.css";
const PaymentRight = () => {
  return (
    <Container className={style.boxPR}>
      <Row className={style.boxProPayment}>
        <Col className="">
          <Row className="border pt-2 pb-2 d-flex justify-content-around align-items-center mb-3">
            <Col md={3} className="position-relative">
              <Image className={style.imagePR} src={image} fluid />
              <span className={style.quantityP}>1</span>
            </Col>
            <Col className={style.descriptionPR} md={6}>
              Congratulations Card
            </Col>
            <Col md={3}>
              <span className="fw-medium">30 $</span>
            </Col>
          </Row>{" "}
          <Row className="border pt-2 pb-2 d-flex justify-content-around align-items-center mb-3">
            <Col md={3} className="position-relative">
              <Image
                className={style.imagePR}
                src={
                  "https://i.pinimg.com/564x/d5/b8/6a/d5b86acc3b694e1df86dcc27d3de17d3.jpg"
                }
                fluid
              />
              <span className={style.quantityP}>1</span>
            </Col>
            <Col className={style.descriptonPR} md={6}>
              Birthday Card
            </Col>
            <Col md={3}>
              <span className="fw-medium">30 $</span>
            </Col>
          </Row>{" "}
          <Row className="border pt-2 pb-2 d-flex justify-content-around align-items-center mb-3">
            <Col md={3} className="position-relative">
              <Image
                className={style.imagePR}
                src={
                  "https://i.pinimg.com/564x/73/bd/a1/73bda114532a78c5d38578d51825435b.jpg"
                }
                fluid
              />
              <span className={style.quantityP}>1</span>
            </Col>
            <Col className={style.descriptonPR} md={6}>
              Anniversary Card
            </Col>
            <Col md={3}>
              <span className="fw-medium">30 $</span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="border-bottom border-top">
        <Col className="mt-3 mb-3 d-flex flex-column gap-3">
          <Row>
            <Col>Estimate</Col>
            <Col>90 $</Col>
          </Row>
          <Row>
            <Col>Shipping Fee</Col>
            <Col>____</Col>
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="fw-bold fs-5">Total</Col>
        <Col>
          <h5 className="fw-bold fs-5">90$</h5>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentRight;
