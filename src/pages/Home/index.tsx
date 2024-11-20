import { useEffect, useState } from "react";
import { getAllAccount } from "../../api/accountAPI";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchGetAllStaff } from "../../redux/features/staffSlice";

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

  ///////////////// su dung redux tookit thunk /////////////////////

  const staffList = useAppSelector((state) => state.staff);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGetAllStaff());
  }, [dispatch]);

  return (
    <div>
      <div>{JSON.stringify(data)}</div>
      <div>{JSON.stringify(staffList.dataStaff)}</div>
    </div>
  );
};

export default Home;
