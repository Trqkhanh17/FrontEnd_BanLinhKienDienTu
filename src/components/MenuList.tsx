import { Menu } from "antd";
import {
  AppstoreOutlined,
  AreaChartOutlined,
  BarsOutlined,
  HomeOutlined,
  PayCircleOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  TruckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { MenuInfo } from "rc-menu/lib/interface";
const menuItems = [
  {
    key: "dashboard/product",
    icon: <ShopOutlined />,
    label: "Sản phẩm",
  },
  {
    key: "dashboard/category",
    icon: <AppstoreOutlined />,
    label: "Loại sản phẩm",
  },
  {
    key: "subasks",
    icon: <TeamOutlined />,
    label: "Khách Hàng và nhân viên",
    children: [
      {
        key: "dashboard/customers",
        icon: <UserOutlined />,
        label: "Khách Hàng",
      },
      {
        key: "dashboard/staff",
        icon: <UserOutlined />,
        label: "Nhân Viên",
      },
    ],
  },
  {
    key: "dashboard/order",
    icon: <ShoppingCartOutlined />,
    label: "Đơn Hàng",
  },
  {
    key: "dashboard/stock",
    icon: <TruckOutlined />,
    label: "Kho Hàng",
  },
  {
    key: "setting",
    icon: <SettingOutlined />,
    label: "Setting",
  },
];
interface Props {
  darkTheme: boolean;
}
const MenuList: React.FC<Props> = ({ darkTheme }) => {
  const navigate = useNavigate();

  const handleClick = (e: MenuInfo) => {
    navigate(`/${e.key}`);
  };
  return (
    <Menu
      theme={darkTheme ? "dark" : "light"}
      mode="inline"
      className="menu-bar"
      items={menuItems}
      onClick={(e) => handleClick(e)}
    />
  );
};

export default MenuList;
