import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";

interface Props {
  data: string[];
  slidesPerView: number;
  spaceBetween: number;
  loop: boolean;
}

const MySwiper: React.FC<Props> = ({ data, slidesPerView, spaceBetween, loop }) => (
  <Swiper
    modules={[Navigation, Pagination]}
    navigation
    pagination={{ clickable: true }}
    loop={loop}
    spaceBetween={spaceBetween}
    slidesPerView={Math.min(2, slidesPerView)}
    breakpoints={{ 480: { slidesPerView: Math.min(3, slidesPerView) }, 768: { slidesPerView } }}
    className="rounded-lg bg-slate-200"
  >
    {data?.map((item, index) => (
      <SwiperSlide key={index}>
        <img className="aspect-square w-full rounded-lg object-cover" src={item} alt={`Ảnh sản phẩm ${index + 1}`} loading="lazy" />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default MySwiper;
