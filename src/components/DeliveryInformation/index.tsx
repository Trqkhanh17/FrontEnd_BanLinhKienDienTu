import { Col, Form, Row } from "react-bootstrap";
import style from "./style.module.css";
import { useState } from "react";
const DeliveryInformation = () => {
  const [checkAddQR, setCheckAddQR] = useState(false);
  const [checkWrite, setCheckWrite] = useState(false);
  return (
    <Form className={style.boxForm}>
      <Row>
        <Col className="p-0">
          <h5>Delivery information</h5>
        </Col>
      </Row>
      <Row>
        <Row className="mb-2">
          <Form.Group as={Col} className="p-0" controlId="validationCustom01">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Full name"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-2 d-flex justify-content-between">
          <Form.Group
            as={Col}
            className="p-0"
            md="7"
            controlId="validationCustom02"
          >
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            as={Col}
            className="p-0"
            md="4"
            controlId="validationCustom03"
          >
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Phone number"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} className="p-0" controlId="validationCustom06">
            <Form.Label>Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Address"
              defaultValue=""
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group as={Col} className="p-0" controlId="validationCustom07">
            <Form.Label>Note</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Note"
              as="textarea"
              rows={2}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
      </Row>
    </Form>
  );
};

export default DeliveryInformation;
