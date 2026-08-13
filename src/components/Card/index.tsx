import { useNavigate } from "react-router-dom";

interface Props {
  image: string;
  name: string;
  price: number;
  proId: number;
}

const MyCard: React.FC<Props> = ({ image, name, price, proId }) => {
  const navigate = useNavigate();
  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="aspect-square overflow-hidden bg-slate-100">
        <img className="h-full w-full object-cover transition duration-500 group-hover:scale-105" src={image} alt={name} loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-12 font-semibold text-slate-800">{name}</h3>
        <div className="mt-auto flex flex-col gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <strong className="text-lg text-red-600">{price.toLocaleString("vi-VN")} ₫</strong>
          <button className="primary-button !min-h-10 !px-4 !py-2 text-sm" onClick={() => navigate(`/product/${proId}`)}>
            Chi tiết
          </button>
        </div>
      </div>
    </article>
  );
};

export default MyCard;
