import { useState } from "react";
import { toast } from "react-toastify";
import { loginAPI } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { fetchGetProfile } from "../../redux/features/profileSlice";
import { setCookie } from "../../utils";

function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnSubmit = async () => {
    try {
      if (!email || !password) return toast.warning("Vui lòng nhập email và mật khẩu");
      const res = await loginAPI(email, password);
      if (res.data.statusCode !== 200 || [400, 401, 403, 404].includes(res.data.statusCode)) return toast.error(`${res.data.message || "Thông tin đăng nhập không hợp lệ"}`);
      const token = res.data.token || res.data.accessToken || res.data.access_token || res.data.data?.token;
      if (token) setCookie("token", token, 7);
      await dispatch(fetchGetProfile());
      toast.success("Đăng nhập thành công");
      return navigate(res.data.role === 1 ? "/dashboard" : "/");
    } catch (error) {
      return toast.error("Đăng nhập thất bại: " + error);
    }
  };

  return (
    <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); handleOnSubmit(); }}>
      <div>
        <span className="text-sm font-bold uppercase tracking-widest text-brand-600">Tài khoản</span>
        <h2 className="mt-2 text-3xl font-extrabold text-slate-900">Đăng nhập</h2>
      </div>
      <label className="block text-sm font-semibold text-slate-700">Email
        <input className="form-field mt-2" type="email" autoComplete="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="block text-sm font-semibold text-slate-700">Mật khẩu
        <input className="form-field mt-2" type="password" autoComplete="current-password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="block w-full text-right text-sm font-semibold text-brand-700 hover:underline" type="button">Bạn đã quên mật khẩu?</button>
      <button className="primary-button w-full" type="submit">Đăng nhập</button>
    </form>
  );
}

export default SignInForm;
