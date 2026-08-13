import { useEffect, useState } from "react";
import LayoutDash from "../Layout";
import { listOrderAPI, rejectedOrderAPI } from "../../../api/orderAPI";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);
const OrderDas = () => {
    const navigate = useNavigate();
    const [data, Setdata] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getAllOrder();
    }, [])
    const getAllOrder = async () => {
        try {
            const res = await listOrderAPI();
            Setdata(res.data.data);
        } catch (error) {
            toast.error("Không thể tải danh sách đơn hàng");
        } finally {
            setLoading(false);
        }
    }
    console.log(data);
    const getIOrderStatus = (check: any) => {
        switch (check) {
            case 0:
                return "Chờ Xác Nhận"
            case 1:
                return "Đã Xác Nhận"
            case 2:
                return "Đang Giao Hàng"
            case 3:
                return "Đã Giao Hàng"
            default:
                break;
        }
    }
    const getRejected = (check: any) => {
        switch (check) {
            case 0:
                return "Không Bị Từ Chối"
            case 1:
                return "Đã Bị Từ Chối"
            default:
                break;
        }
    }
    const getPayStatus = (check: any) => {
        switch (check) {
            case 0:
                return "Chưa Thanh Toán"
            case 1:
                return "Đã Thanh Toán"
            default:
                break;
        }
    }
    const handleSubmitReject = async (order_id: any) => {
        try {
            const res = await rejectedOrderAPI({ order_id: order_id });
            if (res.data.statusCode === 400) {
                return toast.error(res.data.message);
            }
            toast.success(res.data.message);
            getAllOrder();
        } catch (error) {
            console.log(error);
        }
    }
    function formatDate(dateString: any) {
        // Tách chuỗi YYYY-MM-DD thành mảng [YYYY, MM, DD]
        const [year, month, day] = dateString.split("-");
        // Trả về chuỗi theo định dạng DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }
    return (
        <div>
            <LayoutDash>
                <div className="panel min-w-0 overflow-hidden">
                    <div className="mb-5"><p className="mb-1 text-sm font-bold uppercase tracking-wider text-brand-600">Quản lý</p><h1 className="dashboard-title !mb-0">Đơn hàng</h1></div>
                    {loading ? (<p className="py-8 text-center text-slate-500">Đang tải đơn hàng...</p>)
                        : data.length === 0 ? (<p className="py-8 text-center text-slate-500">Chưa có đơn hàng.</p>)
                        : (
                            <DataTable
                                className="table table-striped custom-datatable"
                                options={{ lengthMenu: [10, 15, 20], pageLength: 10 }}>
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Sản phẩm</th>
                                        <th scope="col">Số Lượng</th>
                                        <th scope="col">Tổng giá</th>
                                        <th scope="col">ID Khách Hàng</th>
                                        <th scope="col">ID Nhân Viên</th>
                                        <th scope="col">Tên Khách Hàng</th>
                                        <th scope="col">Số Điện Thoại</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Địa Chỉ Nhận Hàng</th>
                                        <th scope="col">Trạng Thái Đơn Hàng</th>
                                        <th scope="col">Trạng Thái Thanh Toán</th>
                                        <th scope="col">Ghi Chú</th>
                                        <th scope="col">Ngày Đặt Hàng</th>
                                        <th scope="col">Ngày Cập Nhật Lại Đơn Hàng</th>
                                        <th scope="col">Chức Năng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item: any) => (
                                        <tr key={item.order_id}>
                                            <td>{item.order_id}</td>
                                            <td>{item.pro_id}</td>
                                            <td>{item.detail_quantity}</td>
                                            <td>{item.detail_price}</td>
                                            <td>{item.cus_id}</td>
                                            <td>{item.staff_id}</td>
                                            <td>{item.order_name}</td>
                                            <td>{item.order_phone}</td>
                                            <td>{item.order_email}</td>
                                            <td>{item.order_address}</td>
                                            <td>{getIOrderStatus(item.order_status)}</td>
                                            <td>{getPayStatus(item.pay_status)}</td>
                                            <td>{item.order_note}</td>
                                            <td>{formatDate(item.order_create.split("T")[0])}</td>
                                            <td>{item.order_update}</td>
                                            <td><div className="flex gap-2">
                                                <button className="btn btn-primary" onClick={() => navigate(`/edit-order/${item.order_id}`)}>Cập Nhật</button>
                                                <button className="btn btn-danger" onClick={() => { handleSubmitReject(item.order_id) }}>Từ Chối</button>
                                            </div></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </DataTable>
                        )}
                </div>
            </LayoutDash>
        </div>
    )
}
export default OrderDas;
