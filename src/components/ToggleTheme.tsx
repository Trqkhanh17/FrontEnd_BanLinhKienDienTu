import { Button } from "antd";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
interface Props {
  darTheme: boolean;
  toggleTheme: () => void;
}
const ToggleTheme: React.FC<Props> = ({ darTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
      <Button onClick={toggleTheme}>
        {darTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
      </Button>
    </div>
  );
};

export default ToggleTheme;
