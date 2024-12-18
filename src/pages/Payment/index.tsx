import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import style from "./style.module.css";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import { createOrderAPI, createOrderDetailAPI } from "../../api/orderAPI";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../utils";
const Payment = () => {
  console.log(getSession("yourCart"));
  const emailProfile = useAppSelector((state) => state.profile.dataProfile?.cus_email);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const cartList = useAppSelector((state) => state.cart.dataCart);
  const User = useAppSelector((state) => state.profile.dataProfile);
  const total =
    cartList &&
    cartList.listCart &&
    cartList.listCart.reduce((acc: any, item) => acc + item.price * item.quantity,0);
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!fullName || !address || !phone || !email) {
        return toast.error("Please fill in all required fields");
       }
       if (!User) {
         return toast.error("Please login to continue");
       } 
       const data = {
         cus_id: User?.cus_id,
         order_name: fullName,
         order_phone: phone,
         order_email: email,
         order_address: address,
         order_note: note,
       };
       const res = await createOrderAPI(data);
       if (res.data.statusCode === 400) {
         return toast.error(res.data.message);
       }
       const order_id = res.data.data;
       
      if(cartList && cartList.listCart){
        cartList.listCart.forEach(async (item: any) => {
          const dataDetail = {
            order_id: order_id,
            pro_id: item.pro_id,
            detail_quantity: item.quantity,
            detail_price: item.price,
          };
          
      const res = await createOrderDetailAPI(dataDetail);
      if (res.data.statusCode === 400) {
        return toast.error(res.data.message);
      }
        });
        const getSessionCart = getSession("yourCart");
        const filter = getSessionCart.filter((item: any) => item.email !== emailProfile);

        setSession("yourCart", filter);

        navigate("/order");

      return toast.success("Order successfully placed");
      }
      return toast.error("ERROR");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container className={style.BoxPayment} fluid>
      <Row className={style.boxContent}>
        <Col className={style.paymentLeft} md={6}>
          <Container className={style.BoxDeliveryInformation}>
            <Row>
              <Col className="p-0">
                <h1 className={style.titleNameShop}>JoyFull Letter</h1>
              </Col>
            </Row>
            <Row>
              <Form className={style.boxForm}>
                <Row>
                  <Col className="p-0">
                    <h5>Delivery information</h5>
                  </Col>
                </Row>
                <Row>
                  <Row className="mb-2">
                    <Form.Group
                      as={Col}
                      className="p-0"
                      controlId="validationCustom01"
                    >
                      <Form.Label>Full name</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Full name"
                        defaultValue={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                        }}
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
                        defaultValue={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
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
                        defaultValue={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>

                  <Row className="mb-2">
                    <Form.Group
                      as={Col}
                      className="p-0"
                      controlId="validationCustom06"
                    >
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Address"
                        defaultValue={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                  <Row className="mb-2">
                    <Form.Group
                      as={Col}
                      className="p-0"
                      controlId="validationCustom07"
                    >
                      <Form.Label>Note</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Note"
                        as="textarea"
                        rows={2}
                        defaultValue={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                  </Row>
                </Row>
              </Form>
            </Row>
            <Row className="d-flex justify-content-between align-items-center">
              <Col className="text-end">
                <Button
                  type="button"
                  onClick={(e) => handleFormSubmit(e)}
                  className={style.buttonPaymentContinue}
                >
                  Payment
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col className={style.paymentRight} md={6}>
          <Container className={style.boxPR}>
            <Row className={style.boxProPayment}>
              <Col className="">
                {cartList &&
                  cartList.listCart &&
                  cartList.listCart.length > 0 &&
                  cartList.listCart.map((item, index) => (
                    <Row
                      key={index}
                      className="border pt-2 pb-2 d-flex justify-content-around align-items-center mb-3"
                    >
                      <Col md={3} className="position-relative">
                        <Image
                          className={style.imagePR}
                          src={item.pro_img}
                          fluid
                        />
                        <span className={style.quantityP}>{item.quantity}</span>
                      </Col>
                      <Col className={style.descriptionPR} md={6}>
                        {item.pro_name}
                      </Col>
                      <Col md={3}>
                        <span className="fw-medium">{item.price} vnd</span>
                      </Col>
                    </Row>
                  ))}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col className="fw-bold fs-5">Total</Col>
              <Col>
                <h5 className="fw-bold fs-5">{total} vnd</h5>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default Payment;
