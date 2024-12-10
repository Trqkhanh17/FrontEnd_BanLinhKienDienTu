import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchGetProfile } from "./redux/features/profileSlice";
import { addCartToStore } from "./redux/features/cartSlice";
import { getSession } from "./utils";
import { toast } from "react-toastify";
import { YourCart } from "./interfaces/cartInterface";
const Loading = lazy(() => import("./components/Loading"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const App = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.profile.dataProfile?.cus_email);
  // const cart = useAppSelector((state) => state.cart.dataCart);
  // console.log("log Cart: ", cart);

  const getCart = () => {
    try {
      const dataCartSession: YourCart[] = getSession("yourCart");
      if (!dataCartSession) {
        return null;
      }
      const filter = dataCartSession.filter((x) => x.email === email);

      dispatch(addCartToStore(filter[0]));
    } catch (error) {
      toast.error(error + "");
    }
  };

  useEffect(() => {
    dispatch(fetchGetProfile());
    getCart();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:proId" element={<ProductDetail />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
