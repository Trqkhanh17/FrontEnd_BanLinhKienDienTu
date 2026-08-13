import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined, CloseOutlined, HomeOutlined } from "@ant-design/icons";
import MenuList from "../../../components/MenuList";
import logo from "../../../assets/images/logo.jpg";

const LayoutDash = ({ children }: { children: ReactNode }) => {
  const [desktopCollapsed, setDesktopCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebar = (mobile: boolean) => (
    <aside
      className={`${mobile ? "flex w-[280px]" : `hidden ${desktopCollapsed ? "w-20" : "w-64"} lg:flex`} h-full shrink-0 flex-col overflow-y-auto bg-slate-950 text-white transition-[width] duration-300`}
    >
      <div className={`flex h-20 shrink-0 items-center border-b border-white/10 px-4 ${desktopCollapsed && !mobile ? "justify-center" : "gap-3"}`}>
        <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="flex min-w-0 items-center gap-3 !no-underline">
          <img src={logo} alt="Tech Shop" className="h-11 w-11 shrink-0 rounded-xl object-cover" />
          {(!desktopCollapsed || mobile) && <span className="truncate text-lg font-extrabold">TECH SHOP</span>}
        </Link>
        {mobile && <button type="button" onClick={() => setMobileOpen(false)} className="ml-auto flex h-10 w-10 items-center justify-center rounded-lg hover:bg-white/10" aria-label="Đóng menu"><CloseOutlined /></button>}
      </div>
      <MenuList collapsed={desktopCollapsed && !mobile} onNavigate={() => setMobileOpen(false)} />
      <Link to="/" className={`m-3 flex min-h-11 items-center rounded-xl bg-white/10 px-3 text-sm font-semibold text-slate-200 !no-underline hover:bg-white/20 hover:text-white ${desktopCollapsed && !mobile ? "justify-center" : "gap-3"}`}>
        <HomeOutlined />{(!desktopCollapsed || mobile) && <span>Về cửa hàng</span>}
      </Link>
    </aside>
  );

  return (
    <div className="dashboard-shell flex h-screen min-h-[600px] w-full overflow-hidden bg-slate-100">
      {sidebar(false)}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {sidebar(true)}
          <button type="button" className="flex-1 bg-slate-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-label="Đóng menu" />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-3 shadow-sm sm:px-5">
          <button type="button" className="flex h-10 w-10 items-center justify-center rounded-lg text-lg text-slate-700 hover:bg-slate-100" onClick={() => window.innerWidth < 1024 ? setMobileOpen(true) : setDesktopCollapsed((value) => !value)} aria-label="Mở hoặc thu gọn menu">
            {desktopCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
          <div className="text-right"><p className="m-0 text-sm font-bold text-slate-800">Trang quản trị</p><p className="m-0 hidden text-xs text-slate-500 sm:block">Quản lý Tech Shop</p></div>
        </header>
        <main className="min-w-0 flex-1 overflow-auto p-3 sm:p-5 lg:p-6">
          <div className="mx-auto min-w-0 max-w-[1600px]">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutDash;
