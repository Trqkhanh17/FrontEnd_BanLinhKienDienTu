import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../hooks";
import { listOrderByIdAPI } from "../../api/orderAPI";
import "./Order.css";

const OrderHistory = () => {
  const User = useAppSelector((state) => state.profile.dataProfile);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (User?.cus_id) {
      getListOrder();
      console.log(data);
    }
  }, [User]);

  const getListOrder = async () => {
    try {
      const cusId = User?.cus_id.toString();
      const res = await listOrderByIdAPI(cusId ? cusId : "");
      const orders = res.data.data;
        if(!orders || orders.length <= 0){
            return;
        }
      // Nhóm các đơn hàng theo order_id
      const groupedOrders = orders.reduce((acc: any, order: any) => {
        if (!acc[order.order_id]) {
          acc[order.order_id] = {
            order_id: order.order_id,
            order_name: order.order_name,
            order_email: order.order_email,
            order_phone: order.order_phone,
            order_create: order.order_create,
            order_status: order.order_status,
            order_address: order.order_address,
            details: [],
          };
        }
        acc[order.order_id].details.push(order);
        return acc;
      }, {});

      setData(Object.values(groupedOrders));
    } catch (error) {
      toast.error("Failed to get order history: " + error);
    }
  };

  const checkStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Chưa Xác Nhận";
      case 1:
        return "Đã Xác Nhận";
      case 2:
        return "Đã Giao";
      default:
        return "";
    }
  };

  return (
    <Layout>
      <div className="order-history-container">
      <h2 className="order-history-title">Order History</h2>
        {!data || data.length <= 0? (<div>Không có đơn hàng nào được đặt</div>)
         : 
         data.map((order: any) => (
          <div key={order.order_id} className="order-box">
            <p>Name: {order.order_name}</p>
            <p>Email: {order.order_email}</p>
            <p>Phone: {order.order_phone}</p>
            <p>Address: {order.order_address}</p>
            <p>Order Date: {order.order_create.split("T")[0]}</p>
            <p>Status: {checkStatus(order.order_status)}</p>
            <table className="order-history-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Product Image</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {order.details.map((detail: any) => (
                  <tr key={detail.detail_id}>
                    <td>{detail.pro_name}</td>
                    <td>
                      <img
                        src={detail.pro_img}
                        alt={detail.pro_name}
                        className="order-history-table img"
                      />
                    </td>
                    <td>{detail.detail_quantity}</td>
                    <td>{detail.detail_price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default OrderHistory;
