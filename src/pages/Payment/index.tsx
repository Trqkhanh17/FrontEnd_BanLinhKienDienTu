import { Button, Col, Container, Form, FormSelect, Image, Row } from "react-bootstrap";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { toast } from "react-toastify";
import { createOrderAPI, createOrderDetailAPI } from "../../api/orderAPI";
import { useNavigate } from "react-router-dom";
import { getSession, setSession } from "../../utils";
import { sendMailOrderAPI } from "../../api/sendMailAPI";
import { exportStock, getListStockByproId } from "../../api/stockAPI";
import { log } from "node:console";
const Payment = () => {
  console.log(getSession("yourCart"));
  const emailProfile = useAppSelector((state) => state.profile.dataProfile?.cus_email);
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [stockId, setStockId] = useState("");
  const cartList = useAppSelector((state) => state.cart.dataCart);
  const User = useAppSelector((state) => state.profile.dataProfile);
  useEffect(() => {
    setPaymentMethod("paypal");
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      const paymentId = urlParams.get('paymentId');
      const payerId = urlParams.get('PayerID');
      console.log(urlParams);

      if (paymentId && payerId) {
        handlePaymentResult(paymentId, payerId);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, []);

  const total =
    cartList &&
    cartList.listCart &&
    cartList.listCart.reduce((acc: any, item) => acc + item.price * item.quantity, 0);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!paymentMethod) {
        return toast.warn("Hãy Chọn Hình Thức Thanh Toán");
      }
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

        //navigate("/order");

        return toast.success("Order successfully placed");
      }
      return toast.error("Order failed");

    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentResult = async (paymentId: string, payerId: string) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/execute-payment/${paymentId}/${payerId}`);
      const data: any = await response.json();
      if (data.success) {
        toast.success('Thanh toán thành công!');
      } else {
        toast.error('Thanh toán thất bại!');
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  const handlePayPalPayment = async (e: any) => {
    try {
      if (!paymentMethod) {
        return toast.warn("Hãy Chọn Hình Thức Thanh Toán");
      }
      if (!fullName || !address || !phone || !email) {
        return toast.error("Vui lòng điền đầy đủ thông tin");
      }
      if (!User) {
        return toast.error("Vui lòng đăng nhập để thanh toán");
      }
      if (!paymentMethod) {
        return toast.warn("Hãy Chọn Hình Thức Thanh Toán");
      }
      const response = await fetch('http://localhost:8000/api/v1/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          description: 'Mô tả giao dịch',
          currency: 'USD',
        }),
      });
      const data: any = await response.json();
      window.location.href = data.links[1].href;
      e.preventDefault();
      const dataOrder = {
        cus_id: User?.cus_id,
        order_name: fullName,
        order_phone: phone,
        order_email: email,
        order_address: address,
        order_note: note,
        pay_status: 1,
      };
      const res = await createOrderAPI(dataOrder);
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
          if (res.data.statusCode === 400) {
            return toast.error(res.data.message);
          }
          const dataStock = await getListStockByproId(item.pro_id);
          console.log("check dataStock:", dataStock);
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

      }
    } catch (error) {
      console.log(error);
    }
  };
  const checkPaymentMethod = () => {
    if (paymentMethod === "paypal") {
      return true;
    }
    if (paymentMethod === "cod") {
      return false;
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
              <FormSelect
                className="mb-3"
                aria-label="Chọn hình thức thanh toán"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="" disabled>
                  -- Chọn hình thức thanh toán --
                </option>
                <option value="paypal">PayPal</option>
                <option value="cod">Thanh toán khi nhận hàng (COD)</option>
              </FormSelect>
            </Row>
            <Row className="d-flex justify-content-between align-items-center">
              {checkPaymentMethod() ? (<Col className="text-end">
                <Button onClick={async (e) => { await handlePayPalPayment(e) }}>Thanh toán</Button>
              </Col>) : (<Col className="text-end">
                <Button onClick={async (e: any) => { await handleFormSubmit(e) }}>Thanh toán</Button>
              </Col>)}
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
