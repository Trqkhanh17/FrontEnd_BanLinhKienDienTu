import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../hooks";
import { listOrderByIdAPI } from "../../api/orderAPI";
import "./Order.css";
import Table from 'react-bootstrap/Table';
const OrderHistory = () => {
  const User = useAppSelector((state) => state.profile.dataProfile);
  const [data, setData] = useState([]);

  useEffect(() => {
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
    if (User?.cus_id) {
      getListOrder();
    }
  }, [User]);
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
  const getListOrder = async () => {
    try {
      const cusId = User?.cus_id.toString();
      const res = await listOrderByIdAPI(cusId ? cusId : "");
      const orders = res.data.data;
      if (!orders || orders.length <= 0) {
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
            is_rejected: order.is_rejected,
            details: [],
          };
        }
        acc[order.order_id].details.push(order);
        return acc;
      }, {});
      console.log("CHECKKK", res.data);

      setData(Object.values(groupedOrders));
    } catch (error) {
      toast.error("Failed to get order history: " + error);
    }
  };
  console.log("Check data:", data);
  console.log(User?.cus_id.toString());

  const checkStatus = (status: number) => {
    switch (status) {
      case 0:
        return "Chưa Xác Nhận";
      case 1:
        return "Đã Xác Nhận";
      case 2:
        return "Đang Giao Hàng";
      case 3:
        return "Đã Giao Hàng";
      default:
        return "";
    }
  };
  function formatDate(dateString: any) {
    // Tách chuỗi YYYY-MM-DD thành mảng [YYYY, MM, DD]
    const [year, month, day] = dateString.split("-");
    // Trả về chuỗi theo định dạng DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }
  return (
    <Layout>
      <div className="order-history-container">
        <h2 className="order-history-title">Order History</h2>
        {!data || data.length <= 0 ? (<div>Không có đơn hàng nào được đặt</div>)
          :
          data.map((order: any) => (
            <div key={order.order_id} className="order-box">
              <p><b>Tên Đơn Hàng: </b>{order.order_name}</p>
              <p><b>Email: </b>{order.order_email}</p>
              <p><b>Số Điện Thoại: </b>{order.order_phone}</p>
              <p><b>Địa Chỉ Nhận Hàng: </b>{order.order_address}</p>
              <p><b>Ngày Đặt Hàng:</b> {formatDate(order.order_create.split("T")[0])}</p>
              <p><b>Trạng Thái Đơn Hàng:</b> {checkStatus(order.order_status)}</p>
              {!order.is_rejected ? (<></>) : (<p style={{ color: "red" }}>*Đã bị từ chối</p>)}
              <Table className="order-history-table">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
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
              </Table>
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default OrderHistory;
