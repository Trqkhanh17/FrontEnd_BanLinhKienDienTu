import { useEffect, useState } from "react";
import LayoutDash from "../Layout";
import { toast } from "react-toastify";
import { addCategoryAPI, deleteCategoryAPI, listCategoryAPI, updateCategoryAPI } from "../../../api/categoryAPI";
import { Navigate } from "react-router-dom";
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

import { Button, Form } from "react-bootstrap";
interface Category {
  cate_id: string;
  cate_name: string;
}

DataTable.use(DT);
const CategoryDas = () => {
  const [data, setData] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [cateName, setCateName] = useState("");
  const [cateId, setCateId] = useState("");
  const [loading, setLoading] = useState(true);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [] = useState();
  useEffect(() => {
    getAllCate();
  }, []);
  const handleUpdate = async (event: any) => {
    event.preventDefault();
    try {
      const dataConfig = {
        cate_id: cateId,
        cate_name: cateName,
      }
      const res = await updateCategoryAPI(dataConfig);
      if (res.data.statusCode === 400) {
        toast.error(res.data.message);
      }
      toast.success(res.data.message);
      getAllCate();
      setShowFormEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Error updating category!");
    }
  }
  const getAllCate = async () => {
    try {
      const res = await listCategoryAPI();
      setData(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error loading data!");
      setLoading(false);
    }
  };
  console.log(cateId);

  const handleSubmitCreate = async (event: any) => {
    event.preventDefault();
    try {
      const dataConfig = {
        cate_id: cateId,
        cate_name: cateName,
      }

      console.log(dataConfig);

      const res = await addCategoryAPI(dataConfig);
      if (res.data.statusCode === 400) {
        toast.error(res.data.message);
      }
      toast.success(res.data.message);
      getAllCate();
      setShowForm(false);
    } catch (error) {
      console.log(error);
      toast.error("Error thêm mới!");
    }
  };
  const handleDelete = async (cateId: any) => {
    try {
      const res = await deleteCategoryAPI(cateId);
      if (res.data.statusCode === 400) {
        toast.error(res.data.message);
      }
      toast.success(res.data.message);
      getAllCate();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting category!");
    }
  };

  return (
    <LayoutDash>
      <div>
        <h2>Category List</h2>
        {showFormEdit && (
          <Form onSubmit={handleUpdate}>
            <div className="form-group">
              <Form.Label htmlFor="cateName">Tên Loại Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="cateName"
                placeholder={cateName}
                onChange={(e) => setCateName(e.target.value)}
              />
            </div>
            <Button type="submit" className="btn btn-primary">
              Cập Nhật
            </Button>
          </Form>
        )}
        {!showForm ? (<Button
          className="btn btn-primary"
          onClick={() => { setShowForm(true), setShowFormEdit(false) }}
        >Thêm Mới</Button>)
          :
          (
            <Button
              className="btn btn-primary"
              onClick={() => setShowForm(false)}
              style={{ backgroundColor: "red" }}
            >Đóng</Button>
          )}
        {showForm && (
          <Form onSubmit={handleSubmitCreate}>
            <div className="form-group">
              <Form.Label htmlFor="cateName">Tên Loại Sản Phẩm</Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                id="cateName"
                placeholder="Nhập tên loại sản phẩm"
                onChange={(e) => setCateName(e.target.value)}
              />
            </div>
            <Button type="submit" className="btn btn-primary">
              Thêm Mới
            </Button>
          </Form>
        )}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <DataTable
            options={{ lengthMenu: [10] }}
            className="table table-striped display ">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Tên Loại Sản Phẩm</th>
                <th scope="col">Chức Năng</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.cate_id}>
                  <td>{item.cate_id}</td>
                  <td>{item.cate_name}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => { setCateId(item.cate_id); setCateName(item.cate_name); setShowFormEdit(true), setShowForm(false) }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(item.cate_id)}
                    >
                      Delete
                    </button>
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

export default CategoryDas;