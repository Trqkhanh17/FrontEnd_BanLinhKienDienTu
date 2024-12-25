import { Button, Layout, theme } from "antd";
import Logo from "../../../components/Logo";
import MenuList from "../../../components/MenuList";
import { useState } from "react";
import ToggleTheme from "../../../components/ToggleTheme";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";



const LayoutDash = ({ children }: any) => {
  const { Header, Sider, Content } = Layout;
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  const [conllapsed, setConllapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        collapsed={conllapsed}
        theme={darkTheme ? "dark" : "light"}
        className="sidebar"
        trigger={null}
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleTheme toggleTheme={toggleTheme} darTheme={darkTheme} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            className="toggle"
            onClick={() => setConllapsed(!conllapsed)}
            type="text"
            icon={
              conllapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
            }
          />
        </Header>
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutDash;
