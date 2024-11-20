import { useEffect, useState } from "react";
import { getAllAccount } from "../../api/accountAPI";

const Home = () => {
  const [data, setData] = useState([]);
  const getAll = async () => {
    try {
      const res = await getAllAccount();
      if (res.data.statusCode === 200) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return <div>{JSON.stringify(data)}</div>;
};

export default Home;
