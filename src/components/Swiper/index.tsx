import { Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import style from "./style.module.css";
interface Props {
  spaceBetween?: number;
  slidesPerView?: number;
  loop?: boolean;
  data: string[];
}
const MySwiper: React.FC<Props> = ({
  loop,
  slidesPerView,
  spaceBetween,
  data,
}) => (
  <Swiper
    className={style.container}
    spaceBetween={spaceBetween}
    slidesPerView={slidesPerView} // Hiển thị 3 hình
    loop={loop}
    autoplay={{ delay: 3000 }}
  >
    {data &&
      data.length > 0 &&
      data.map((item, index) => (
        <SwiperSlide key={index}>
          <Image className={style.image} fluid src={item} />
        </SwiperSlide>
      ))}
  </Swiper>
);

export default MySwiper;
