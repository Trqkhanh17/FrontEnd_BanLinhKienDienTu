interface Props {
  size?: "sm" | "lg";
  color?: string;
  title?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
}

const ButtonCustomize: React.FC<Props> = ({ title, type = "button", className = "", onClick }) => (
  <button className={`primary-button ${className}`} type={type} onClick={onClick}>{title}</button>
);

export default ButtonCustomize;
