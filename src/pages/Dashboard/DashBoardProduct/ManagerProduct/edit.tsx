import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { getProductByIDAPI, updateProductAPI } from "../../../../api/productAPI";
import { listCategoryAPI } from "../../../../api/categoryAPI";
import { toast } from "react-toastify";

function EditCustomize() {
  const { proId } = useParams();
  const navigate = useNavigate();
  const [dataCate, setDataCate] = useState([]);
  const [proName, setProName] = useState("");
  const [cateId, setCateId] = useState("");
  const [price, setPrice] = useState("");
  const [proBrand, setBrand] = useState("");
  const [proDescription, setDescription] = useState("");
  const [proOrigin, setOrigin] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!proId) {
      navigate("/404");
    } else {
      getData();
      getAllCate();
    }
  }, [proId]);

  const getAllCate = async () => {
    try {
      const res = await listCategoryAPI();
      setDataCate(res.data.data || []);
    } catch (error) {
      console.error("Error getting categories:", error);
    }
  };

  const getData = async () => {
    try {
      const res = await getProductByIDAPI(proId ? proId : "");
      const product = res.data.data[0];
      setProName(product.pro_name);
      setCateId(product.cate_id);
      setPrice(product.price);
      setBrand(product.pro_brand);
      setDescription(product.pro_description);
      setOrigin(product.pro_origin);
    } catch (error) {
      console.error("Error getting product:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const productData = {
      pro_id: proId,
      pro_name: proName,
      cate_id: cateId,
      price,
      pro_brand: proBrand,
      pro_description: proDescription,
      pro_origin: proOrigin,
    };
    try {
      await updateProductAPI(productData);
      toast.success("Product updated successfully");
      navigate("/dashboard/product/list-all");
    } catch (error: any) {
      setError("Error updating product: " + error.message);
    }
  };

  return (
    <Form style={{ width: "50%", margin: "auto", marginTop: "50px" }} onSubmit={handleSubmit}>
      <Form.Label>Loại Sản Phẩm</Form.Label>
      <Form.Select aria-label="Default select example" value={cateId} onChange={(e) => setCateId(e.target.value)}>
        {dataCate.map((item) => (
          <option key={item.cate_id} value={item.cate_id}>
            {item.cate_name}
          </option>
        ))}
      </Form.Select>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Tên Sản Phẩm</Form.Label>
        <Form.Control type="text" value={proName || ""} onChange={(e) => setProName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Hãng</Form.Label>
        <Form.Control type="text" value={proBrand || ""} onChange={(e) => setBrand(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Xuất Xứ</Form.Label>
        <Form.Control type="text" value={proOrigin || ""} onChange={(e) => setOrigin(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Giá</Form.Label>
        <Form.Control type="number" value={price || ""} onChange={(e) => setPrice(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          type="text"
          value={proDescription || ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Button variant="primary" type="submit">
        Cập nhật
      </Button>
    </Form>
  );
}

export default EditCustomize;