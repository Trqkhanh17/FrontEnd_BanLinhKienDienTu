import { Button } from "react-bootstrap";
import style from "./style.module.css";
interface Props {
  size?: "sm" | "lg" | undefined;
  color?: string;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  onClick?: () => void;
}
const ButtonCustomize: React.FC<Props> = ({
  color,
  size,
  title,
  type,
  className,
  onClick,
}) => {
  return (
    <Button
      className={`${className} ${style.button}`}
      color={color}
      type={type}
      size={size}
      onClick={() => onClick && onClick()}
    >
      {title}
    </Button>
  );
};
export default ButtonCustomize;
