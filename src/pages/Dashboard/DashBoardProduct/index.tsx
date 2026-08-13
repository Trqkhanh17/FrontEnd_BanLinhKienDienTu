import { useEffect, useState } from "react";
import LayoutDash from "../Layout";
import { createProductAPI, deleteProductAPI, listProductAPI } from "../../../api/productAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { listCategoryAPI } from "../../../api/categoryAPI";
import { uploadFileAPI } from "../../../utils";
import { Button, Form } from "react-bootstrap";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
DataTable.use(DT);

const ListAllProductDas = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [catId, SetCateId] = useState("");
  const [proName, SetProName] = useState("");
  const [proImg, SetProImg] = useState(null);
  const [price, SetPrice] = useState("");
  const [proOrigin, SetProOrigin] = useState("");
  const [proBrand, SetProBrand] = useState("");
  const [proDescription, SetProDescription] = useState("");

  console.log(proImg);


  const navigate = useNavigate();

  useEffect(() => {
    getAllProduct();
    getAllCategories();
  }, []);

  const getAllProduct = async () => {
    try {
      const res = await listProductAPI();
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllCategories = async () => {
    try {
      const res = await listCategoryAPI();
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitCreate = async (event: any) => {
    event.preventDefault();
    try {
      const res: any = await uploadFileAPI(proImg);

      if (!res.data) {
        toast.error("Upload file error!");
        return;
      }

      const imageURL = await res.data.downloadURL;
      const dataConfig = {
        cate_id: catId,
        pro_name: proName,
        pro_img: imageURL,
        price: price,
        pro_origin: proOrigin,
        pro_brand: proBrand,
        pro_description: proDescription
      }

      console.log(dataConfig);

      const res1 = await createProductAPI(dataConfig);

      if (res1.data.statusCode === 400) {
        return toast.error(res1.data.message);
      }
      toast.success("Thêm mới thành công!");
      getAllProduct();
      setShowForm(false);
    } catch (error) {
      console.log(error);
      toast.error("Error thêm mới!");
    }
  };

  const handleSubmitDelete = async (proId: any) => {
    try {
      if (proId) {
        const res = await deleteProductAPI({ pro_id: proId });
        getAllProduct();
        return toast.success(res.data.message);
      } else {
        console.log("No ID");
      }
    } catch (error) {
      toast.error("Delete Product Error: ");
    }
  };

  return (
    <LayoutDash>
      <div className="panel min-w-0 overflow-hidden">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div><p className="mb-1 text-sm font-bold uppercase tracking-wider text-brand-600">Quản lý</p><h1 className="dashboard-title !mb-0">Danh sách sản phẩm</h1></div>
        {!showForm ? (<button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          + Thêm mới
        </button>)
          :
          (
            <button
              className="btn btn-danger"
              onClick={() => setShowForm(false)}
            >
              Đóng
            </button>
          )}</div>
        {showForm && (
          <Form className="mb-6 grid gap-x-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2" onSubmit={handleSubmitCreate}>
            <Form.Group controlId="formCategory">
              <Form.Label>Loại sản phẩm:</Form.Label>
              <Form.Control
                as="select"
                value={catId}
                onChange={(e) => SetCateId(e.target.value)}
              >
                {categories.map((category: any) => (
                  <option key={category.cate_id} value={category.cate_id}>
                    {category.cate_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProductName">
              <Form.Label>Tên sản phẩm:</Form.Label>
              <Form.Control
                type="text"
                value={proName}
                onChange={(e) => SetProName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formProductImage">
              <Form.Label>Hình ảnh:</Form.Label>
              <Form.Control
                type="file"
                onChange={(event: any) => SetProImg(event.target.files[0])}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Giá:</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(event) => SetPrice(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formOrigin">
              <Form.Label>Xuất xứ:</Form.Label>
              <Form.Control
                type="text"
                value={proOrigin}
                onChange={(event) => SetProOrigin(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBrand">
              <Form.Label>Thương hiệu:</Form.Label>
              <Form.Control
                type="text"
                value={proBrand}
                onChange={(event) => SetProBrand(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="sm:col-span-2" controlId="formDescription">
              <Form.Label>Mô tả:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={proDescription}
                onChange={(event) => SetProDescription(event.target.value)}
              />
            </Form.Group>

            <Button className="mt-3 w-full sm:col-span-2 sm:w-auto" variant="primary" type="submit">
              Thêm mới
            </Button>
          </Form>
        )}

        {loading ? (
          <p className="py-8 text-center text-slate-500">Đang tải sản phẩm...</p>
        ) : data.length === 0 ? (
          <p className="py-8 text-center text-slate-500">Chưa có sản phẩm.</p>
        ) : (
          <DataTable className="table table-striped" options={{ lengthMenu: [5] }}>
            <thead>
              <tr>
                <th scope="col">Tên Sản Phẩm</th>
                <th scope="col">Hãng</th>
                <th scope="col">Xuất Xứ</th>
                <th scope="col">Mô Tả</th>
                <th scope="col">Giá</th>
                <th scope="col">Ảnh</th>
                <th scope="col">Ngày Tạo</th>
                <th scope="col">Ngày Cập Nhật</th>
                <th scope="col">Trạng Thái</th>
                <th scope="col">Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item: any) => (
                <tr key={item.pro_id}>
                  <td>{item.pro_name}</td>
                  <td>{item.pro_brand}</td>
                  <td>{item.pro_origin}</td>
                  <td>{item.pro_description}</td>
                  <td>{item.price}</td>
                  <td><img className="h-10 w-10 rounded-lg object-cover" src={item.pro_img} alt={item.pro_name} /></td>
                  <td>{item.pro_create}</td>
                  <td>{item.pro_update}</td>
                  <td>{item.is_delete}</td>
                  <td>
                    <div className="flex gap-2"><button className="primary-button !min-h-9 !px-3 !py-1 text-xs" onClick={() => navigate(`/edit-product/${item.pro_id}`)}>Sửa</button>
                    <button className="danger-button !min-h-9 !px-3 !py-1 text-xs" onClick={() => { handleSubmitDelete(item.pro_id.toString()) }}>Xóa</button></div>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        )}
      </div>
    </LayoutDash>
  );
};

export default ListAllProductDas;
