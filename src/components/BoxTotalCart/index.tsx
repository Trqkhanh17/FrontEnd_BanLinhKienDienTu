import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface Props {
  total: number;
  cart: unknown[] | undefined;
}

const BoxTotalCart: React.FC<Props> = ({ total, cart }) => {
  const navigate = useNavigate();
  const handleFormSubmit = () => {
    if (!cart || cart.length === 0) {
      toast.warning("Giỏ hàng của bạn đang trống");
      return;
    }
    navigate("/payment");
  };
  return (
    <aside className="panel sticky top-24 w-full">
      <h2 className="border-b border-slate-200 pb-4 text-lg font-bold">Thông tin đơn hàng</h2>
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 py-5">
        <strong>Tổng tiền:</strong>
        <span className="text-xl font-extrabold text-red-600 sm:text-2xl">{total.toLocaleString("vi-VN")} ₫</span>
      </div>
      <p className="py-4 text-sm text-slate-500">Phí vận chuyển sẽ được tính khi thanh toán.</p>
      <button onClick={handleFormSubmit} className="danger-button w-full">Mua hàng</button>
    </aside>
  );
};

export default BoxTotalCart;
