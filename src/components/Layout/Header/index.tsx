import { Button, Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { TbShoppingBagHeart } from "react-icons/tb";
import { useEffect, useState } from "react";
import { FaBars, FaXmark } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { handleMenuBar } from "../../../redux/features/menuBarSlice";
import Logo from "../../../assets/images/logo.jpg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { clearProfile, fetchGetProfile } from "../../../redux/features/profileSlice";
import { deleteCookie, getCookie } from "../../../utils";

const navigateRoute = [
  { name: "Trang chủ", route: "/" },
  { name: "Sản phẩm", route: "/product" },
  { name: "Giới thiệu", route: "/about" },
  { name: "Liên hệ", route: "/contact" },
];

const Header = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.dataCart);
  const statusBar = useAppSelector((state) => state.menuStatus.value);
  const user = useAppSelector((state) => state.profile);
  const navigate = useNavigate();
  const [checkLogin, setCheckLogin] = useState(false);
  const token = getCookie("token");

  useEffect(() => {
    if (token && !user.dataProfile) {
      dispatch(fetchGetProfile());
    }
    setCheckLogin(Boolean(token || user.dataProfile));
  }, [token, user.dataProfile, dispatch]);

  const closeMenu = () => dispatch(handleMenuBar(false));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6 lg:px-8">
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-slate-700 hover:bg-slate-100 xl:hidden"
          onClick={() => dispatch(handleMenuBar(!statusBar))}
          aria-label={statusBar ? "Đóng menu" : "Mở menu"}
          aria-expanded={statusBar}
        >
          {statusBar ? <FaXmark /> : <FaBars />}
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex shrink-0 items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          aria-label="Về trang chủ Tech Shop"
        >
          <img className="h-11 w-11 rounded-full object-cover sm:h-14 sm:w-14" src={Logo} alt="Tech Shop" />
          <span className="hidden text-lg font-extrabold text-brand-700 sm:block">TECH SHOP</span>
        </button>

        {statusBar && (
          <button className="fixed inset-0 top-16 z-40 bg-slate-950/40 xl:hidden" onClick={closeMenu} aria-label="Đóng menu" />
        )}

        <nav
          className={`${statusBar ? "translate-x-0" : "-translate-x-full"} fixed bottom-0 left-0 top-16 z-50 flex w-[min(82vw,320px)] flex-col gap-1 bg-white p-5 shadow-2xl transition-transform duration-300 xl:static xl:z-auto xl:w-auto xl:translate-x-0 xl:flex-row xl:items-center xl:bg-transparent xl:p-0 xl:shadow-none`}
          aria-label="Điều hướng chính"
        >
          {navigateRoute.map((item) => (
            <NavLink
              key={item.route}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 text-sm font-semibold transition xl:py-2 ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-brand-700"
                }`
              }
              to={item.route}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full text-3xl text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
            aria-label="Giỏ hàng"
          >
            <TbShoppingBagHeart />
            {!!cart?.listCart.length && (
              <span className="absolute right-0 top-0 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white">
                {cart.listCart.length}
              </span>
            )}
          </button>

          <Dropdown align="end">
            <Dropdown.Toggle className="!flex !items-center !gap-1 !border-0 !bg-transparent !p-1 !text-slate-700 after:!hidden">
              <IoPersonCircleOutline className="text-3xl" />
              <span className="hidden max-w-28 truncate text-sm font-medium lg:block">
                {user.dataProfile?.cus_name || (checkLogin ? "Tài khoản" : "Đăng nhập")}
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu className="shadow-lg">
              {!checkLogin ? (
                <Dropdown.Item as={NavLink} to="/login">Đăng nhập</Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item as={NavLink} to="/profile">Thông tin cá nhân</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/order">Lịch sử đặt hàng</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Button}
                    onClick={() => {
                      deleteCookie("token");
                      dispatch(clearProfile());
                      navigate("/login");
                    }}
                  >
                    Đăng xuất
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
