import { lazy, Suspense, useCallback, useEffect } from "react";
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
const Cart = lazy(() => import("./pages/Cart"));

const App = () => {
  const dispatch = useAppDispatch();
  const email = useAppSelector((state) => state.profile.dataProfile?.cus_email);

  const getCart = useCallback(() => {
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
  }, [email, dispatch]);

  useEffect(() => {
    dispatch(fetchGetProfile());
  }, [dispatch]);

  useEffect(() => {
    getCart();
  }, [getCart]);
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:proId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
