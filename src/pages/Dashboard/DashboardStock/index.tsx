import { useEffect, useState } from "react";
import LayoutDash from "../Layout";
import { getListStock, updateStock } from "../../../api/stockAPI";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);

const StockDas = () => {
    const [data, SetData] = useState([]);
    const [showForm, SetShowForm] = useState(false);
    const [stock_id, SetStockId] = useState("");
    const [pro_id, SetProId] = useState("");
    const [stock_import, SetStockImport] = useState("");
    useEffect(() => {
        getAllStock();
    }, []);
    const staffId = useAppSelector((state) => state.profile.dataProfile?.staff_id);
    const getAllStock = async () => {
        const res = await getListStock();
        if (res.data.statusCode === 404) {
            return toast.error(res.data.message);
        }
        SetData(res.data.data);
    }

    function formatDate(dateString: any) {
        // Tách chuỗi YYYY-MM-DD thành mảng [YYYY, MM, DD]
        const [year, month, day] = dateString.split("-");
        // Trả về chuỗi theo định dạng DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }
    const importStock = async (e: any) => {
        e.preventDefault();
        try {
            const data = {
                stock_id: stock_id,
                staff_id: staffId,
                pro_id: pro_id,
                stock_import: stock_import,
            };
            const res = await updateStock(data);
            if (res.data.statusCode === 400) {
                return toast.error(res.data.message);
            }
            getAllStock();
            toast.success(res.data.message);
            SetShowForm(false);
        } catch (error) {
            console.log(error);
            toast.error("Error updating stock!");
        }
    };
    return (
        <LayoutDash>
            <div className="panel min-w-0 overflow-hidden">
            <div className="mb-5"><p className="mb-1 text-sm font-bold uppercase tracking-wider text-brand-600">Quản lý</p><h1 className="dashboard-title !mb-0">Kho hàng</h1></div>
            {showForm && (
                <Form className="mb-5 max-w-xl rounded-xl border border-slate-200 bg-slate-50 p-4" onSubmit={(e) => { importStock(e) }}>
                    <Form.Group>
                        <Form.Label> Mã Kho</Form.Label>
                        <Form.Control value={stock_id} type="text" disabled />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>San Pham</Form.Label>
                        <Form.Control value={pro_id} type="text" disabled />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>So Luong</Form.Label>
                        <Form.Control value={stock_import} type="number" onChange={(e) => SetStockImport(e.target.value)} />
                    </Form.Group>
                    <Button className="mt-3" type="submit">Thêm</Button>
                </Form>
            )}
            {!data ? (<h1>Loading....</h1>)
                :
                (
                    <DataTable className="table table-striped display">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nhân Viên</th>
                                <th>Sản Phẩm</th>
                                <th>Số Lượng Còn Lại</th>
                                <th>Số Lượng Đã Xuất</th>
                                <th>Ngày Nhập Vào</th>
                                <th>Ngày Thêm Vào</th>
                                <th>Chức Năng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: any) => (
                                <tr key={item.stock_id}>
                                    <td>{item.stock_id}</td>
                                    <td>{item.staff_id ? item.staff_id : "Không có dữ liệu"}</td>
                                    <td>{item.pro_id}</td>
                                    <td>{item.stock_import}</td>
                                    <td>{item.stock_export}</td>
                                    <td>{item.date_import ? formatDate(item.date_import.split("T")[0]) : "Chưa nhập hàng"}</td>
                                    <td>{item.stock_update ? formatDate(item.stock_update.split("T")[0]) : "Chưa sửa đổi"}</td>
                                    <td><Button onClick={() => { SetStockId(item.stock_id); SetProId(item.pro_id); SetShowForm(true) }}>Nhập Hàng</Button></td>
                                </tr>
                            ))}
                        </tbody>
                    </DataTable>
                )}</div>
        </LayoutDash>
    )
}
export default StockDas;
