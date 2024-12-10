import { lazy, Suspense, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchGetProfile } from "./redux/features/profileSlice";
import { addCartToStore } from "./redux/features/cartSlice";
import { getSession } from "./utils";
const Loading = lazy(() => import("./components/Loading"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const App = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.dataCart);
  console.log("log Cart: ", cart);

  useEffect(() => {
    dispatch(fetchGetProfile());
    dispatch(addCartToStore(getSession("yourCart")));
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
