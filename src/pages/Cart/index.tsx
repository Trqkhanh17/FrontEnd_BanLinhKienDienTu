import Layout from "../../components/Layout";
import BoxCard from "../../components/BoxCart";
import BoxTotalCart from "../../components/BoxTotalCart";
import { useAppSelector } from "../../hooks";
import { useMemo } from "react";

const Cart = () => {
  const cart = useAppSelector((state) => state.cart.dataCart?.listCart);
  const total = useMemo(() => cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0, [cart]);

  return (
    <Layout>
      <div className="page-shell">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Giỏ hàng</h1>
        <p className="mt-2 text-slate-500">Bạn có <strong>{cart?.length || 0} sản phẩm</strong> trong giỏ hàng.</p>
        <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
          <div className="space-y-4">
            {cart?.length ? cart.map((item) => (
              <BoxCard key={item.pro_id} proId={item.pro_id} decription={item.pro_description} quantity={item.quantity} name={item.pro_name} price={item.price} image={item.image} />
            )) : <div className="panel py-16 text-center text-slate-500">Giỏ hàng của bạn đang trống.</div>}
          </div>
          <BoxTotalCart total={total} cart={cart} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
