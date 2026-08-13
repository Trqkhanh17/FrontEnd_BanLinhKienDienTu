import LayoutDash from "./Layout";


const Dashboard = () => {

  return (
    <LayoutDash>
      <div className="panel">
        <span className="text-sm font-bold uppercase tracking-widest text-brand-600">Quản trị</span>
        <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Dashboard</h1>
        <p className="mt-3 text-slate-500">Chọn một mục trong thanh điều hướng để quản lý cửa hàng.</p>
      </div>
    </LayoutDash>
  );
};

export default Dashboard;
