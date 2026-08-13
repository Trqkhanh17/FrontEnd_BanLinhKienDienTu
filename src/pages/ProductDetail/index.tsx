import Layout from "../../components/Layout";
import MySwiper from "../../components/Swiper";
import ButtonCustomize from "../../components/Button";
import { getProductByIDAPI } from "../../api/productAPI";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Product } from "../../interfaces/productInterfaces";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getSession, setSession } from "../../utils";
import { YourCart } from "../../interfaces/cartInterface";
import { addCartToStore } from "../../redux/features/cartSlice";

const ProductDetail = () => {
  const user = useAppSelector((state) => state.profile.dataProfile);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState<Product | null>(null);

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };
  console.log("Check data", data);

  const getProductDetails = useCallback(async () => {
    try {
      const res = await getProductByIDAPI(params.proId + "");

      if (res.data.statusCode === 404) {
        return toast.warning(res.data.message);
      }
      return setData(res.data.data[0]);
    } catch (error) {
      console.log(error);
      return toast.warning("Not found!!!");
    }
  }, [params]);

  const handleOnClick = async () => {
    if (!user) {
      return navigate("/login");
    }

    // Lấy danh sách giỏ hàng từ session
    const getCartItem: YourCart[] = getSession("yourCart") || [];
    console.log("Check getCartItem ", getCartItem);

    // Tìm giỏ hàng của người dùng hiện tại dựa trên email
    const userCart = getCartItem.find((cart) => cart.email === user.cus_email);

    if (!userCart) {
      // Nếu không có giỏ hàng của user, tạo mới
      if (!data) {
        return;
      }
      const newCart = {
        email: user.cus_email,
        listCart: [{ ...data, quantity }],
      };
      getCartItem.push(newCart);
      setSession("yourCart", getCartItem);
      dispatch(addCartToStore(getCartItem[0]));
      toast.success("Add to cart successfull");
      return;
    }

    // Giỏ hàng đã tồn tại, kiểm tra sản phẩm trong giỏ
    const existingProductIndex = userCart.listCart.findIndex(
      (item) => item.pro_id === data?.pro_id
    );

    if (existingProductIndex !== -1) {
      // Sản phẩm đã tồn tại trong giỏ, cập nhật số lượng
      userCart.listCart[existingProductIndex].quantity += quantity;
    } else {
      // Sản phẩm chưa tồn tại, thêm mới
      if (data) {
        userCart.listCart.push({ ...data, quantity });
      }
    }

    // Cập nhật giỏ hàng vào session
    setSession("yourCart", getCartItem);
    const filter = getCartItem.filter((x) => x.email === user.cus_email);
    dispatch(addCartToStore(filter[0]));
    toast.success("Add to cart successfull");
  };

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  return (
    <Layout>
      {data ? (
        <div className="page-shell">
          <div className="grid gap-8 rounded-2xl bg-white p-4 shadow-soft sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-10">
            <section className="min-w-0">
              <div className="aspect-square overflow-hidden rounded-2xl bg-slate-100">
                <img className="h-full w-full object-contain p-4" src={data.image || data.pro_img} alt={data.pro_name} />
              </div>
              {!!data.gallery?.length && (
                <div className="relative mt-4 overflow-hidden rounded-xl bg-slate-200 p-2 sm:mt-6 sm:p-4">
                  <MySwiper data={data.gallery} loop slidesPerView={4} spaceBetween={10} />
                </div>
              )}
            </section>
            <section className="flex min-w-0 flex-col justify-center">
              <span className="text-sm font-bold uppercase tracking-widest text-brand-600">Chi tiết sản phẩm</span>
              <h1 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-4xl">{data.pro_name}</h1>
              <strong className="mt-4 text-2xl text-red-600 sm:text-3xl">{data.price.toLocaleString("vi-VN")} ₫</strong>
              <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 border-y border-slate-200 py-5 text-sm sm:text-base">
                <dt className="font-semibold text-slate-500">Tồn kho</dt><dd>{data.quantity}</dd>
                <dt className="font-semibold text-slate-500">Hãng</dt><dd>{data.pro_brand}</dd>
                <dt className="font-semibold text-slate-500">Xuất xứ</dt><dd>{data.pro_origin}</dd>
                <dt className="font-semibold text-slate-500">Mô tả</dt><dd className="min-w-0 break-words">{data.pro_description}</dd>
              </dl>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="inline-flex h-11 w-fit overflow-hidden rounded-lg border border-slate-300">
                  <button type="button" className="w-11 bg-slate-100 text-xl hover:bg-slate-200" onClick={() => setQuantity((state) => Math.max(1, state - 1))}>−</button>
                  <input className="w-14 border-x border-slate-300 text-center outline-none" type="number" min="1" onChange={handleSetValue} value={quantity} aria-label="Số lượng" />
                  <button type="button" className="w-11 bg-slate-100 text-xl hover:bg-slate-200" onClick={() => setQuantity((state) => state + 1)}>+</button>
                </div>
                <ButtonCustomize className="w-full sm:w-auto" size="lg" title="Thêm vào giỏ hàng" onClick={handleOnClick} />
              </div>
            </section>
          </div>
        </div>
      ) : <div className="page-shell text-center text-slate-500">Đang tải sản phẩm...</div>}
    </Layout>
  );
};

export default ProductDetail;
