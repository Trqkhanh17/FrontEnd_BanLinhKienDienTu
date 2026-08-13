import Layout from "../../components/Layout";
import MyCarousel from "../../components/Carousel";
import BoxProduct from "../../components/BoxProduct";
import { toast } from "react-toastify";
import { listNewProduct } from "../../api/productAPI";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/productInterfaces";
const Home = () => {

  const [data, setData] = useState<Product[]>([]);
  const getAllProduct = async () => {
    try {
      const res = await listNewProduct();
      setData(res.data.data);
    } catch (error) {
      toast.error(error + "");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <Layout>
      <div className="w-full">
        <MyCarousel
          data={[
                "https://th.bing.com/th/id/R.39b80d1fcfb7b5fe5f6e28cd4ecd84e4?rik=OLZuJTfV0qgcwg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fzqWlCS6.jpg&ehk=T%2bR4x079B%2fgMc%2bS3VVbir3pT9%2bImFz6g8xsvmuymd1E%3d&risl=&pid=ImgRaw&r=0",
                "https://th.bing.com/th/id/R.39b80d1fcfb7b5fe5f6e28cd4ecd84e4?rik=OLZuJTfV0qgcwg&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fzqWlCS6.jpg&ehk=T%2bR4x079B%2fgMc%2bS3VVbir3pT9%2bImFz6g8xsvmuymd1E%3d&risl=&pid=ImgRaw&r=0",
          ]}
        />
        <BoxProduct title="Sản phẩm mới" data={data} />
      </div>
    </Layout>
  );
};

export default Home;
