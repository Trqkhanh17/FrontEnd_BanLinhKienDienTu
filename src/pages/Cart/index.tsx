import { Col, Container, Row } from "react-bootstrap";
import Layout from "../../components/Layout";
import BoxCard from "../../components/BoxCart";
import BoxTotalCart from "../../components/BoxTotalCart";
import { useAppSelector } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
const Cart = () => {
  const cart = useAppSelector((state) => state.cart.dataCart?.listCart);
  const [total, setTotal] = useState(0);
  const totalPrice = useCallback(() => {
    let count = 0;
    if (cart) {
      for (const e of cart) {
        count += e.price * e.quantity;
      }
    }
    setTotal(count);
  }, [cart]);

  useEffect(() => {
    totalPrice();
  }, [totalPrice]);
  return (
    <Layout>
      <Container fluid className="mt-4 mb-4">
        <Row>
          <Col md={6}>
            <Row
              style={{
                margin: "10px 20px",
                borderBottom: "1px solid",
                borderColor: "rgb(226, 226, 226)",
              }}
            >
              <Col className="">
                <h5>Thông tin giỏ hàng</h5>
              </Col>
            </Row>
            <Row style={{ margin: "10px 20px" }}>
              <Col className="">
                <p>
                  Bạn có <strong>{cart ? cart.length : 0} sản phẩm</strong> trong
                  giỏ hàng
                </p>
              </Col>
            </Row>
            {cart &&
              cart.length > 0 &&
              cart.map((item, index) => (
                <BoxCard
                  key={index}
                  proId={item.pro_id}
                  decription={item.pro_description}
                  quantity={item.quantity}
                  name={item.pro_name}
                  price={item.price}
                  image={item.image}
                />
              ))}
          </Col>
          <Col md={4} className="mt-3">
            <BoxTotalCart total={total} cart={cart} />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default Cart;
