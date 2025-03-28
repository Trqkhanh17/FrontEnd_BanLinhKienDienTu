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
import Statistics from "./pages/DashBoard/DashboardAnalytics";
const Dashboard = lazy(() => import("./pages/DashBoard"));
const ListAllProductDas = lazy(() => import("./pages/DashBoard/DashBoardProduct"));
const EditCustomize = lazy(() => import("./pages/DashBoard/DashBoardProduct/ManagerProduct/edit"));
const CategoryDas = lazy(() => import("./pages/DashBoard/DashboardCategory"));
const CustomersDas = lazy(() => import("./pages/DashBoard/DashboardCustomers"));
const StaffDashboard = lazy(() => import("./pages/DashBoard/DashboardStaff"));
const OrderDas = lazy(() => import("./pages/DashBoard/DashboardOrder"));
const UpdateStatusDas = lazy(() => import("./pages/DashBoard/DashboardOrder/ManagerOrder/updateOrderDas"));
const StockDas = lazy(() => import("./pages/DashBoard/DashboardStock"));
const Loading = lazy(() => import("./components/Loading"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Payment = lazy(() => import("./pages/Payment"));
const OrderHistory = lazy(() => import("./pages/Order"));
const Profile = lazy(() => import("./pages/profile"));
const Store = lazy(() => import("./pages/Store"));
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
          <Route path="/product" element={<Store />} />
          <Route path="/product/:proId" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order" element={<OrderHistory />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/product" element={<ListAllProductDas />} />
          <Route path="/dashboard/category" element={<CategoryDas />} />
          <Route path="/dashboard/customers" element={<CustomersDas />} />
          <Route path="/dashboard/staff" element={<StaffDashboard />} />
          <Route path="/edit-order/:orderId" element={<UpdateStatusDas />} />
          <Route path="/dashboard/order" element={<OrderDas />} />
          <Route path="/edit-product/:proId" element={<EditCustomize />} />
          <Route path="/dashboard/stock" element={<StockDas />} />
          <Route path="/dashboard/analysis" element={<Statistics />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
