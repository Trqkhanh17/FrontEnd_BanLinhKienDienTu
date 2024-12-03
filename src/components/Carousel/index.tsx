import { Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import style from "./style.module.css";
interface Props {
  data: string[];
}
const MyCarousel: React.FC<Props> = ({ data }) => {
  return (
    <Carousel>
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <Carousel.Item key={index}>
            <Image
              width="100%"
              height="auto"
              className={style.image}
              fluid
              src={item}
              alt={`Slide ${index}`}
            />
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default MyCarousel;
