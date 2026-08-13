import MyCard from "../Card";
import { Product } from "../../interfaces/productInterfaces";

interface Props {
  data: Product[];
  title: string;
}

const BoxProduct: React.FC<Props> = ({ data, title }) => (
  <section className="page-shell">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <span className="text-sm font-bold uppercase tracking-widest text-brand-600">Tech Shop</span>
        <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl">{title}</h2>
      </div>
      <span className="hidden text-sm text-slate-500 sm:block">{data?.length || 0} sản phẩm</span>
    </div>
    {data?.length ? (
      <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-6">
        {data.map((item) => (
          <MyCard key={item.pro_id} image={item.pro_img} name={item.pro_name} price={item.price} proId={item.pro_id} />
        ))}
      </div>
    ) : (
      <div className="panel py-14 text-center text-slate-500">Chưa có sản phẩm để hiển thị.</div>
    )}
  </section>
);

export default BoxProduct;
