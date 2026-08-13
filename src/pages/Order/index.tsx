import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../hooks";
import { listOrderByIdAPI } from "../../api/orderAPI";
import Table from 'react-bootstrap/Table';

interface OrderDetail {
  detail_id: number;
  pro_name: string;
  pro_img: string;
  detail_quantity: number;
  detail_price: number;
}

interface CustomerOrder {
  order_id: number;
  order_name: string;
  order_email: string;
  order_phone: string;
  order_create: string;
  order_status: number;
  order_address: string;
  is_rejected: number;
  details: OrderDetail[];
}

type OrderApiRow = Omit<CustomerOrder, "details"> & OrderDetail;

const OrderHistory = () => {
  const User = useAppSelector((state) => state.profile.dataProfile);
  const [data, setData] = useState<CustomerOrder[]>([]);

  const getListOrder = useCallback(async () => {
    try {
      const cusId = User?.cus_id.toString();
      const res = await listOrderByIdAPI(cusId ? cusId : "");
      const orders = res.data.data;
      if (!orders || orders.length <= 0) {
        return;
      }
      // Nhóm các đơn hàng theo order_id
      const groupedOrders = (orders as OrderApiRow[]).reduce<Record<number, CustomerOrder>>((acc, order) => {
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

      setData(Object.values(groupedOrders));
    } catch (error) {
      toast.error("Failed to get order history: " + error);
    }
  }, [User?.cus_id]);

  useEffect(() => {
    if (User?.cus_id) getListOrder();
  }, [User?.cus_id, getListOrder]);

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
  function formatDate(dateString: string) {
    // Tách chuỗi YYYY-MM-DD thành mảng [YYYY, MM, DD]
    const [year, month, day] = dateString.split("-");
    // Trả về chuỗi theo định dạng DD/MM/YYYY
    return `${day}/${month}/${year}`;
  }
  return (
    <Layout>
      <div className="page-shell">
        <h1 className="mb-6 text-2xl font-extrabold text-slate-900 sm:text-3xl">Lịch sử đơn hàng</h1>
        {!data || data.length <= 0 ? (<div className="panel py-14 text-center text-slate-500">Không có đơn hàng nào được đặt</div>)
          :
          data.map((order) => (
            <article key={order.order_id} className="panel mb-5">
              <p><b>Tên Đơn Hàng: </b>{order.order_name}</p>
              <p><b>Email: </b>{order.order_email}</p>
              <p><b>Số Điện Thoại: </b>{order.order_phone}</p>
              <p><b>Địa Chỉ Nhận Hàng: </b>{order.order_address}</p>
              <p><b>Ngày Đặt Hàng:</b> {formatDate(order.order_create.split("T")[0])}</p>
              <p><b>Trạng Thái Đơn Hàng:</b> {checkStatus(order.order_status)}</p>
              {!!order.is_rejected && <p className="font-semibold text-red-600">* Đã bị từ chối</p>}
              <div className="table-scroll mt-5"><Table className="mb-0 min-w-[600px]">
                <thead>
                  <tr>
                    <th>Tên sản phẩm</th>
                    <th>Ảnh</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                  </tr>
                </thead>
                <tbody>
                  {order.details.map((detail) => (
                    <tr key={detail.detail_id}>
                      <td>{detail.pro_name}</td>
                      <td>
                        <img
                          src={detail.pro_img}
                          alt={detail.pro_name}
                          className="h-14 w-14 rounded-lg object-cover"
                        />
                      </td>
                      <td>{detail.detail_quantity}</td>
                      <td>{Number(detail.detail_price).toLocaleString("vi-VN")} ₫</td>
                    </tr>
                  ))}
                </tbody>
              </Table></div>
            </article>
          ))}
      </div>
    </Layout>
  );
};

export default OrderHistory;
