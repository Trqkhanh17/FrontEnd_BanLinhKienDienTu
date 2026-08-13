import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import style from "./style.module.css";
import { useState } from "react";
import { useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import { createOrderAPI, createOrderDetailAPI } from "../../api/orderAPI";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../utils";
import { sendMailOrderAPI } from "../../api/sendMailAPI";
import { exportStock } from "../../api/stockAPI";
import Layout from "../../components/Layout";
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
    cartList.listCart.reduce((acc: any, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (!fullName || !address || !phone || !email) {
        return toast.error("Vui lòng điền đầy đủ thông tin");
      }
      if (!User) {
        return toast.error("Hãy Đăng Nhập Để Thanh Toán");
      }
      const data = {
        cus_id: User?.cus_id,
        order_name: fullName,
        order_phone: phone,
        order_email: email,
        order_address: address,
        order_note: note,
        pay_status: 0,
      };
      const res = await createOrderAPI(data);
      if (res.data.statusCode === 400) {
        return toast.error(res.data.message);
      }
      const order_id = res.data.data;

      if (cartList && cartList.listCart) {
        cartList.listCart.forEach(async (item: any) => {
          const dataDetail = {
            order_id: order_id,
            pro_id: item.pro_id,
            detail_quantity: item.quantity,
            detail_price: item.price,
          };

          const res = await createOrderDetailAPI(dataDetail);
          console.log("check res:", res);

          if (res.data.statusCode === 400) {
            return toast.error(res.data.message);
          }
          console.log("check itedddm:", item.pro_id);
          const proId = item.pro_id;
          const resStock = await exportStock({ pro_id: proId, stock_export: item.quantity });
          if (resStock.data.statusCode === 400) {
            return toast.error(resStock.data.message);
          }
          const info = {
            email: email,
            subject: "ĐƠN HÀNG CỦA BẠN",
            htmlContent: `
              <h3>Đơn hàng của bạn đã được đặt thành công</h3>
              <p>Cảm ơn bạn đã mua sắm tại TechShop!</p>
              <p>Thông tin đơn hàng:</p>
              <ul>
                ${cartList.listCart
                .map(
                  (item: any) => `
                    <li>
                      <img src="${item.pro_img}" alt="${item.pro_name}" style="width: 100px; height: auto; display: block; margin-bottom: 10px;" />
                      <strong>Sản phẩm:</strong> ${item.pro_name} <br />
                      <strong>Số lượng:</strong> ${item.quantity} <br />
                      <strong>Giá:</strong> ${item.price.toLocaleString()} VND
                    </li>
                  `
                )
                .join("")}
              </ul>
              <p><strong>Tổng cộng:</strong> ${total?.toLocaleString()} VND</p>
              <p>Địa chỉ giao hàng: ${address}</p>
              <p>Họ và tên: ${fullName}</p>
              <p>Số điện thoại: ${phone}</p>
              <p>Ghi chú: ${note || "Không có"}</p>
              <p>Vui lòng kiểm tra lại thông tin và liên hệ chúng tôi nếu có bất kỳ sai sót nào.</p>
              <img src="src/assets/images/logoThanks.webp" alt="Thank you" style="width: 100%; height: auto; margin-top: 20px;" />
            `,
          };
          console.log(info);

          const sendMail = await sendMailOrderAPI(info);
          if (sendMail.data.statusCode === 400) {
            return toast.error(sendMail.data.message);
          }
        });
        const getSessionCart = getSession("yourCart");
        const filter = getSessionCart.filter((item: any) => item.email !== emailProfile);

        setSession("yourCart", filter);

        navigate("/order");

        return toast.success("Order successfully placed");
      }
      return toast.error("Order failed");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <Container className={style.BoxPayment} fluid>
        <Row className={style.boxContent}>
          <Col className={style.paymentLeft} md={6}>
            <Container className={style.BoxDeliveryInformation}>
              <Row>
                <Col className="p-0">
                  <h1 className={style.titleNameShop}>Tech Shop</h1>
                </Col>
              </Row>
              <Row>
                <Form className={style.boxForm}>
                  <Row>
                    <Col className="p-0">
                      <h5>Thông tin nhận hàng</h5>
                    </Col>
                  </Row>
                  <Row>
                    <Row className="mb-2">
                      <Form.Group
                        as={Col}
                        className="p-0"
                        controlId="validationCustom01"
                      >
                        <Form.Label>Họ tên</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Họ và tên"
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
                          placeholder="email nhận hàng"
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
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Số điện thoại"
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
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Địa chỉ giao hàng"
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
                        <Form.Label>Ghi chú</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Nhập ghi chú nếu có"
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
                <p style={{ fontWeight: 'bold' }}>Hình thức thanh toán: Thanh toán khi nhận hàng (COD)</p>
              </Row>
              <Row className="d-flex justify-content-between align-items-center">
                <Col className="text-end">
                  <Button onClick={async (e: any) => { await handleFormSubmit(e) }}>Thanh toán</Button>
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
                <Col className="fw-bold fs-5">Tổng giá:  <span className="fw-bold fs-5">{total} vnd</span></Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
export default Payment;
