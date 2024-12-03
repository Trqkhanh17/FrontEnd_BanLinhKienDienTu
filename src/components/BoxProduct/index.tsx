import { Col, Container, Row } from "react-bootstrap";
import MyCard from "../Card";
import style from "./style.module.css";
import { Product } from "../../interfaces/productInterfaces";

interface Props {
  data: Product[];
  title: string;
}

const BoxProduct: React.FC<Props> = ({ data, title }) => {
  return (
    <Container fluid>
      <Row>
        <Col className={style.title}>{title}</Col>
      </Row>
      <Row>
        {data &&
          data.length > 0 &&
          data.map((item, index) => (
            <Col key={index}>
              <MyCard
                image={item.pro_img}
                name={item.pro_name}
                price={item.price}
              />
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default BoxProduct;
