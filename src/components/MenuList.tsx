import {
  AppstoreOutlined,
  BarChartOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";

const menuItems = [
  { route: "/dashboard/product", icon: ShopOutlined, label: "Sản phẩm" },
  { route: "/dashboard/category", icon: AppstoreOutlined, label: "Loại sản phẩm" },
  { route: "/dashboard/customers", icon: UserOutlined, label: "Khách hàng" },
  { route: "/dashboard/staff", icon: UserOutlined, label: "Nhân viên" },
  { route: "/dashboard/order", icon: ShoppingCartOutlined, label: "Đơn hàng" },
  { route: "/dashboard/stock", icon: TruckOutlined, label: "Kho hàng" },
  { route: "/dashboard/analysis", icon: BarChartOutlined, label: "Thống kê" },
];

interface Props {
  collapsed?: boolean;
  onNavigate?: () => void;
}

const MenuList: React.FC<Props> = ({ collapsed = false, onNavigate }) => (
  <nav className="mt-5 flex flex-1 flex-col gap-1 px-3" aria-label="Điều hướng quản trị">
    {menuItems.map(({ route, icon: Icon, label }) => (
      <NavLink
        key={route}
        to={route}
        onClick={onNavigate}
        title={collapsed ? label : undefined}
        className={({ isActive }) =>
          `flex min-h-11 items-center rounded-xl px-3 text-sm font-semibold !no-underline transition ${
            collapsed ? "justify-center" : "gap-3"
          } ${isActive ? "bg-white text-brand-900 shadow-sm" : "text-slate-300 hover:bg-white/10 hover:text-white"}`
        }
      >
        <Icon className="shrink-0 text-lg" />
        {!collapsed && <span className="truncate">{label}</span>}
      </NavLink>
    ))}
  </nav>
);

export default MenuList;
