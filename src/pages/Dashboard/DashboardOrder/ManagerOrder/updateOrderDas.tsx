import { useNavigate, useParams } from "react-router-dom"
import LayoutDash from "../../Layout"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrderByOrderIdAPI, updateStatus } from "../../../../api/orderAPI";
import { useAppSelector } from "../../../../hooks";
import { Form } from "react-bootstrap";
const UpdateStatusDas = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [orderID, SetOrderId] = useState("");
    const [cus_id, SetCusId] = useState("");
    const [order_name, SetOrderName] = useState("");
    const [order_phone, SetPhone] = useState("");
    const [order_address, SetOrderAddress] = useState("");
    const [order_email, SetEmail] = useState("");
    const [order_status, SetStatus] = useState("");
    const [order_note, SetNote] = useState("");
    const [pay_status, SetPayStatus] = useState("");
    const staffId = useAppSelector((state) => state.profile.dataProfile?.staff_id);

    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        try {
            const res = await getOrderByOrderIdAPI(orderId);
            console.log(res.data.data);
            SetCusId(res.data.data[0].cus_id);
            SetOrderId(res.data.data[0].order_id);
            SetOrderName(res.data.data[0].order_name);
            SetPhone(res.data.data[0].order_phone);
            SetEmail(res.data.data[0].order_email);
            SetStatus(res.data.data[0].order_status);
            SetNote(res.data.data[0].order_note);
            SetPayStatus(res.data.data[0].pay_status);
            SetOrderAddress(res.data.data[0].order_address)
        } catch (error: any) {
            toast.error(error);
        }
    }
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const data = {
                order_id: orderID,
                staff_id: staffId,
                order_note: order_note,
                order_status: order_status,
                pay_status: pay_status
            }
            console.log("CHECK DATA", data);

            const res = await updateStatus(data);
            if (res.data.statusCode === 400) {
                return toast.error(res.data.message);
            }
            toast.success("Cập Nhật Thành Công")
            navigate("/dashboard/order")
        } catch (error) {
            console.log(error);
            return toast.error("Submit Error");
        }
    }
    return (
        <LayoutDash>
            <Form
                style={{ width: "50%", margin: "auto", marginTop: "50px" }}
            >
                <Form.Group className="mb-3">
                    <Form.Label>Mã đơn hàng:</Form.Label>
                    <Form.Control
                        type="text"
                        value={orderID}
                        disabled
                        onChange={(e) => SetOrderId(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mã khách hàng:</Form.Label>
                    <Form.Control
                        type="text"
                        value={cus_id}
                        disabled
                        onChange={(e) => SetCusId(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tên khách hàng:</Form.Label>
                    <Form.Control
                        type="text"
                        value={order_name}
                        disabled
                        onChange={(e) => SetOrderName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Địa Chỉ:</Form.Label>
                    <Form.Control
                        type="text"
                        value={order_address}
                        disabled
                        onChange={(e) => SetOrderName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Số điện thoại:</Form.Label>
                    <Form.Control
                        type="text"
                        value={order_phone}
                        disabled
                        onChange={(e) => SetPhone(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        type="email"
                        value={order_email}
                        disabled
                        onChange={(e) => SetEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Trạng thái đơn hàng:</Form.Label>
                    <Form.Select
                        value={order_status}
                        onChange={(e) => SetStatus(e.target.value)}
                    >
                        <option value="0">Chờ Xác Nhận</option>
                        <option value="1">Đã Xác Nhận</option>
                        <option value="2">Đang Giao Hàng</option>
                        <option value="3">Đã giao hàng</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Ghi chú:</Form.Label>
                    <Form.Control
                        type="text"
                        value={order_note}
                        onChange={(e) => SetNote(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Trạng thái thanh toán:</Form.Label>
                    <Form.Select
                        value={pay_status}
                        onChange={(e) => SetPayStatus(e.target.value)}
                    >
                        <option value="0">Chưa Thanh Toán</option>
                        <option value="1">Đã thanh toán</option>
                    </Form.Select>
                </Form.Group>

                <button type="submit" className="btn btn-primary" onClick={(e) => { handleSubmit(e) }}>
                    Cập nhật trạng thái
                </button>
            </Form>
        </LayoutDash>
    )
}
export default UpdateStatusDas