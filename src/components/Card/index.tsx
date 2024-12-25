import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import style from "./style.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  image: string;
  name: string;
  price: number;
  proId: number;
}
const MyCard: React.FC<Props> = ({ image, name, price, proId }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate(`/product/${proId}`);
  };
  return (
    <Card className="mt-2 mb-2" style={{ width: "18rem" }}>
      <Card.Img className={`fluid ${style.image}`} variant="top" src={image} />
      <Card.Body>
        <Card.Title className={`${style.title}`}>{name}</Card.Title>
        <div className="d-flex justify-content-between align-items-center">
          <Card.Text>
            <strong style={{ fontSize: 20 }}>{price} vnd</strong>
          </Card.Text>
          <Button variant="primary" onClick={() => handleButtonClick()}>Chi tiết</Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
