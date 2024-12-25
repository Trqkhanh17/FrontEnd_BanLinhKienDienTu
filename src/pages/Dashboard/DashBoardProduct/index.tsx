import { useEffect, useState } from "react";
import LayoutDash from "../Layout";
import { createProductAPI, deleteProductAPI, listProductAPI } from "../../../api/productAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { listCategoryAPI } from "../../../api/categoryAPI";
import { uploadFileAPI } from "../../../utils";
import { Button, Form } from "react-bootstrap";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';

DataTable.use(DT);

const ListAllProductDas = () => {
  const [data, setData] = useState([]);
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
      <div>
        <h2>Danh sách sản phẩm</h2>
        {!showForm ? (<button
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Thêm mới
        </button>)
          :
          (
            <button
              className="btn btn-primary"
              onClick={() => setShowForm(false)}
              style={{ backgroundColor: "red" }}
            >
              Đóng
            </button>
          )}
        {showForm && (
          <Form onSubmit={handleSubmitCreate}>
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

            <Form.Group controlId="formDescription">
              <Form.Label>Mô tả:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={proDescription}
                onChange={(event) => SetProDescription(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Thêm mới
            </Button>
          </Form>
        )}

        {!data || data.length === 0 ? (
          "Loading..."
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
                <tr>
                  <td>{item.pro_name}</td>
                  <td>{item.pro_brand}</td>
                  <td>{item.pro_origin}</td>
                  <td>{item.pro_description}</td>
                  <td>{item.price}</td>
                  <td><img style={{ height: "40px", width: "40px" }} src={item.pro_img} alt="Product image" /></td>
                  <td>{item.pro_create}</td>
                  <td>{item.pro_update}</td>
                  <td>{item.is_delete}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => navigate(`/edit-product/${item.pro_id}`)}>Sửa Sản Phẩm</button>
                    <button className="btn btn-danger" onClick={() => { handleSubmitDelete(item.pro_id.toString()) }}>Xóa Sản Phẩm</button>
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