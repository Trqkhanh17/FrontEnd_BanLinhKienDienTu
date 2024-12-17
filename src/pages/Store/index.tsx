import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Product } from "../../interfaces/productInterfaces";
import { listProductAPI } from "../../api/productAPI";
import Layout from "../../components/Layout";
import BoxProduct from "../../components/BoxProduct";

const Store = () => {
    const [data, setData] = useState<Product[]>([]);
    const getAllProduct = async () => {
      try {
        const res = await listProductAPI();
        setData(res.data.data);
      } catch (error) {
        toast.error(error + "");
      }
    };
    useEffect(() => {
      getAllProduct();
    }, []);
    return(
      <Layout>
        <BoxProduct title="All Product" data={data} />
      </Layout>
    );
  };
export default Store;