import { useEffect, useState } from "react";
import LayoutDash from "../Layout";
import { getListStock, updateStock } from "../../../api/stockAPI";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppSelector } from "../../../hooks";
DataTable.use(DT);

const StockDas = () => {
    const [data, SetData] = useState([]);
    const [showForm, SetShowForm] = useState(false);
    const [stock_id, SetStockId] = useState("");
    const [pro_id, SetProId] = useState("");
    const [stock_import, SetStockImport] = useState("");
    useEffect(() => {
        getAllStock();
    }, [])
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
            {showForm && (
                <Form onSubmit={(e) => { importStock(e) }}>
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
                    <Button type="submit">Thêm</Button>
                </Form>
            )}
            {!data ? (<h1>Loading....</h1>)
                :
                (
                    <DataTable className="table table-striped display">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>staff</th>
                                <th>San Pham</th>
                                <th>So Luong Con Lai</th>
                                <th>So Luong Da Xuat</th>
                                <th>Ngay Nhap Vao</th>
                                <th>Ngay Cap Nhat</th>
                                <th>Chuc Nang</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: any) => (
                                <tr>
                                    <td>{item.stock_id}</td>
                                    <td>{item.staff_id ? item.staff_id : "Không có dữ liệu"}</td>
                                    <td>{item.pro_id}</td>
                                    <td>{item.stock_import}</td>
                                    <td>{item.stock_export}</td>
                                    <td>{item.date_import ? formatDate(item.date_import.split("T")[0]) : "Chưa nhập hàng"}</td>
                                    <td>{item.stock_update ? formatDate(item.stock_update.split("T")[0]) : "Chưa sửa đổi"}</td>
                                    <td><Button onClick={() => { SetStockId(item.stock_id); SetProId(item.pro_id); SetShowForm(true) }}>Nhập Hàng</Button></td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </DataTable>
                )}
        </LayoutDash>
    )
}
export default StockDas;