import Carousel from "react-bootstrap/Carousel";

interface Props { data: string[] }

const MyCarousel: React.FC<Props> = ({ data }) => (
  <Carousel className="overflow-hidden bg-slate-900">
    {data?.map((item, index) => (
      <Carousel.Item key={index}>
        <img className="h-[240px] w-full object-cover sm:h-[360px] lg:h-[500px]" src={item} alt={`Banner Tech Shop ${index + 1}`} />
      </Carousel.Item>
    ))}
  </Carousel>
);

export default MyCarousel;
