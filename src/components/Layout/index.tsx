import Header from "./Header";
import Footer from "./Footer";
import { useAppDispatch } from "../../hooks";
import { handleMenuBar } from "../../redux/features/menuBarSlice";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex min-h-screen min-w-[320px] flex-col bg-slate-50">
      <Header />
      <main className="min-w-0 flex-1" onClick={() => dispatch(handleMenuBar(false))}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
