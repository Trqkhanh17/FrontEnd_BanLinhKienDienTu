import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { YourCart } from "../../interfaces/cartInterface";
import { getSession, setSession } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { addCartToStore } from "../../redux/features/cartSlice";

interface Props {
  onChange: (value: number) => void;
  width?: number;
  proId?: number;
  valueP?: number;
}

const MyCount: React.FC<Props> = ({ onChange, proId, valueP }) => {
  const [value, setValue] = useState(valueP || 1);
  const user = useAppSelector((state) => state.profile.dataProfile);
  const dispatch = useAppDispatch();

  const updateCartQuantity = (change: number) => {
    const carts: YourCart[] = getSession("yourCart") || [];
    const userCart = carts.find((cart) => cart.email === user?.cus_email);
    const product = userCart?.listCart.find((item) => item.pro_id === proId);
    if (!userCart || !product) return;
    product.quantity = Math.max(1, product.quantity + change);
    setSession("yourCart", carts);
    dispatch(addCartToStore(userCart));
  };

  const changeValue = (next: number) => {
    if (next < 1) {
      toast.warning("Số lượng phải lớn hơn 0");
      return;
    }
    updateCartQuantity(next - value);
    setValue(next);
  };

  const handleSetValue = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number.parseInt(event.target.value, 10);
    if (!Number.isNaN(next)) changeValue(next);
  };

  useEffect(() => {
    onChange(value);
  }, [value, onChange]);

  return (
    <div className="inline-flex h-10 items-stretch overflow-hidden rounded-lg border border-slate-300 bg-white">
      <button type="button" className="w-10 bg-slate-100 text-lg font-bold hover:bg-slate-200" onClick={() => changeValue(value - 1)} aria-label="Giảm số lượng">−</button>
      <input className="w-12 border-x border-slate-300 bg-white text-center outline-none [appearance:textfield]" type="number" min="1" onChange={handleSetValue} value={value} aria-label="Số lượng" />
      <button type="button" className="w-10 bg-slate-100 text-lg font-bold hover:bg-slate-200" onClick={() => changeValue(value + 1)} aria-label="Tăng số lượng">+</button>
    </div>
  );
};

export default MyCount;
