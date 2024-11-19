import Footer from "./Footer";
import Header from "./Header";
import styles from "./styles.module.css";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.container}>
      <div>
        <Header />
      </div>
      <div>{children}</div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
