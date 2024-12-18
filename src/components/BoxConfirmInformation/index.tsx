import { Col, Container, Row } from "react-bootstrap";
import Tabs, { Tab } from "../TabsPayment";
import DeliveryInformation from "../DeliveryInformation";
import style from "./style.module.css";
import ShippingMethod from "../ShippingMethod";

const BoxDeliveryInformation = () => {
  const render: Tab[] = [
    { title: "Delivery information", content: <DeliveryInformation /> }
  ];
  return (
    <Container className={style.BoxDeliveryInformation}>
      <Row>
        <Col className="p-0">
          <h1 className={style.titleNameShop}>JoyFull Letter</h1>
        </Col>
      </Row>
      <Row>
        <Tabs render={render} />
      </Row>
    </Container>
  );
};

export default BoxDeliveryInformation;
