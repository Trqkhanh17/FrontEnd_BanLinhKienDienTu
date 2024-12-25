import { useEffect, useState } from "react";
import LayoutDash from "../Layout";
import { createStaff, getAllStaff } from "../../../api/staffAPI";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
DataTable.use(DT);
const StaffDashboard = () => {
    const [data, Setdata] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [staffName, SetStaffName] = useState("")
    const [staffPhone, SetStaffPhone] = useState("")
    const [staffEmail, SetStaffEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [comfirmPassword, SetComfirmPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    useEffect(() => {
        getAllOrder();
    }, []);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const getAllOrder = async () => {
        const res = await getAllStaff();
        Setdata(res.data.data);
    };

    const handleSubmitCreate = async (event: any) => {
        event.preventDefault();
        try {
            const data = {
                acc_email: staffEmail,
                password: password,
                staff_name: staffName,
                staff_phone: staffPhone,
                comfirmPass: comfirmPassword
            }
            const res = await createStaff(data)
            if (res.data.statusCode === 400) {
                return toast.error(res.data.message);
            }
            if (res.data.statusCode === 409) {
                return toast.error(res.data.message);
            }
            if (res.data.statusCode === 402) {
                return toast.error(res.data.message);
            }
            if (res.data.statusCode === 403) {
                return toast.error(res.data.message);
            }
            if (res.data.statusCode === 404) {
                return toast.error(res.data.message);
            }
            toast.success(res.data.message);
            getAllOrder();
        } catch (error) {
            toast.error("Thêm thất bại");
        }
    };
    return (
        <LayoutDash>
            <h1>Quản Lý Nhân Viên</h1>
            {!showForm ? (<Button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
            >
                Thêm mới
            </Button>)
                :
                (
                    <Button
                        className="btn btn-primary"
                        onClick={() => setShowForm(false)}
                        style={{ backgroundColor: "red" }}
                    >
                        Đóng
                    </Button>
                )}
            {showForm && (
                <Form onSubmit={handleSubmitCreate}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Tên Nhân Viên</Form.Label>
                        <Form.Control type="text" placeholder="Nhập tên nhân viên" value={staffName} onChange={(e: any) => SetStaffName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Nhập email" value={staffEmail} onChange={(e: any) => SetStaffEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Số Điện Thoại</Form.Label>
                        <Form.Control type="text" placeholder="Nhập số điện thoại" value={staffPhone} onChange={(e: any) => SetStaffPhone(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassw  ord">
                        <Form.Label>Nhập Mật Khẩu</Form.Label>
                        <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Nhập mật khẩu" value={password} onChange={(e: any) => SetPassword(e.target.value)} />
                        <Button variant="secondary" onClick={handleTogglePassword}>
                            {showPassword ? 'Ẩn' : 'Hiện'}
                        </Button>
                    </Form.Group><Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Nhập Lại Mật Khẩu</Form.Label>
                        <Form.Control type={showConfirmPassword ? 'text' : 'password'} placeholder="Nhập lại mật khẩu" value={comfirmPassword} onChange={(e: any) => SetComfirmPassword(e.target.value)} />
                        <Button variant="secondary" onClick={handleToggleConfirmPassword}>
                            {showConfirmPassword ? 'Ẩn' : 'Hiện'}
                        </Button>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            )}
            {!data || data.length === 0 ? (
                <h1>Loading...</h1>
            ) : (
                <DataTable options={{ lengthMenu: [5], pageLength: 5 }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên Nhân Viên</th>
                            <th>Email</th>
                            <th>Số Điện Thoại</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any) => (
                            <tr key={item.staff_id}>
                                <td>{item.staff_id}</td>
                                <td>{item.staff_name}</td>
                                <td>{item.staff_email}</td>
                                <td>{item.staff_phone}</td>
                            </tr>
                        ))}
                    </tbody>
                </DataTable>
            )}
        </LayoutDash>
    );
};

export default StaffDashboard;
