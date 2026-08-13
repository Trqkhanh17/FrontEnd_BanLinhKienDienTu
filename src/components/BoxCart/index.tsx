import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import MyCount from "../Count";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSession, setSession } from "../../utils";
import { addCartToStore } from "../../redux/features/cartSlice";
import { YourCart } from "../../interfaces/cartInterface";
interface Props {
  image: string;
  price: number;
  quantity: number;
  name: string;
  decription: string;
  proId: number;
}
const BoxCard: React.FC<Props> = ({
  image,
  name,
  price,
  quantity,
  decription,
  proId,
}) => {
  const [quant, setQuant] = useState<number>(quantity);
  const user = useAppSelector((state) => state.profile.dataProfile);
  const dispatch = useAppDispatch();

  const deleteCart = () => {
    // Lấy danh sách giỏ hàng từ session
    const getCartItem: YourCart[] = getSession("yourCart") || [];

    // Tìm giỏ hàng của người dùng hiện tại dựa trên email
    const userCart = getCartItem.find((cart) => cart.email === user?.cus_email);
    console.log("check userCart ", userCart);

    if (userCart) {
      // Sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
      userCart.listCart = userCart?.listCart.filter((x) => x.pro_id !== proId);
      console.log("check getCartItem ", getCartItem);

      // Cập nhật giỏ hàng vào session
      setSession("yourCart", getCartItem);
      const filter = getCartItem.filter((x) => x.email === user?.cus_email);
      dispatch(addCartToStore(filter[0]));
    }
  };

  return (
    <article className="relative grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr_auto] sm:items-center">
      <button type="button" onClick={deleteCart} className="absolute right-2 top-2 rounded-full p-2 text-xl text-red-500 hover:bg-red-50" aria-label={`Xóa ${name}`}>
        <MdDeleteForever />
      </button>
      <img className="aspect-square w-full rounded-xl object-cover sm:w-[120px]" src={image} alt={name} loading="lazy" />
      <div className="min-w-0 pr-8 sm:pr-0">
        <h3 className="font-bold text-slate-900">{name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-slate-500">{decription}</p>
        <div className="mt-2 font-semibold text-slate-700">{price.toLocaleString("vi-VN")} ₫</div>
      </div>
      <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
        <strong className="whitespace-nowrap text-red-600">{(price * quant).toLocaleString("vi-VN")} ₫</strong>
          <MyCount
            proId={proId}
            valueP={quant}
            width={25}
            onChange={setQuant}
          />
      </div>
    </article>
  );
};

export default BoxCard;
