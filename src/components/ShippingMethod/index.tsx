import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaDotCircle } from "react-icons/fa";
import { FcShipped } from "react-icons/fc";
import { FcLibrary } from "react-icons/fc";
import QRPayment from "../QRPayment";
import ModalCustomize from "../Modal";
import style from "./style.module.css";
import { FcHome } from "react-icons/fc";
const ShippingMethod = () => {
  const [active, setActive] = useState(0);
  const [modalShow, setModalShow] = useState(false);

  return (
    <Container className="mt-3">
      <Row>
        <Col className="p-0">
          <h5>Shipping method</h5>
        </Col>
      </Row>
      <Row
        className={`${style.boxChoose} border d-flex justify-content-around align-items-center p-2`}
      >
        <Col className="d-flex justify-content-between gap-5 align-items-center">
          <div className="d-flex gap-5 align-items-center">
            <FaDotCircle size={16} color="#cfab68" />
            <FcHome size={50} />
            <span>Home delivery</span>
          </div>
          <span>0.3 $</span>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="p-0">
          <h5>Payment method</h5>
        </Col>
      </Row>
      <Row
        onClick={() => setActive(0)}
        className={`${style.boxChoose} border d-flex justify-content-around align-items-center p-2`}
      >
        <Col className="d-flex justify-content-start gap-5 align-items-center">
          <FaDotCircle size={16} color={active === 0 ? "#cfab68" : "#ecf0f1"} />
          <FcShipped size={50} />
          <span>Cash on Delivery</span>
        </Col>
      </Row>
      <Row
        onClick={() => {
          setActive(1);
          setModalShow(!modalShow);
        }}
        className={`${style.boxChoose} border d-flex justify-content-around align-items-center p-2`}
      >
        <Col className="d-flex justify-content-start gap-5 align-items-center">
          <FaDotCircle size={16} color={active === 1 ? "#cfab68" : "#ecf0f1"} />
          <FcLibrary size={50} />
          <span>Bank transfer</span>
        </Col>
      </Row>
      <ModalCustomize
        handleClose={() => setModalShow(!modalShow)}
        showP={modalShow}
      >
        <QRPayment />
      </ModalCustomize>
    </Container>
  );
};

export default ShippingMethod;
