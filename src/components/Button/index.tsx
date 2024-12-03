import { Button } from "react-bootstrap";
import style from "./style.module.css";
interface Props {
  size?: "sm" | "lg" | undefined;
  color?: string;
  title?: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
}
const ButtonCustomize: React.FC<Props> = ({
  color,
  size,
  title,
  type,
  className,
}) => {
  return (
    <Button
      className={`${className} ${style.button}`}
      color={color}
      type={type}
      size={size}
    >
      {title}
    </Button>
  );
};
export default ButtonCustomize;
