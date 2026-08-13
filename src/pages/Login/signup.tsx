import { useState } from "react";
import { toast } from "react-toastify";
import { Register, registerAPI } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

const fieldClass = "form-field";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      if (!email || !password || !confirmPass || !name || !phone || !birthday || !address) return toast.warning("Vui lòng nhập đầy đủ thông tin");
      if (password !== confirmPass) return toast.warning("Mật khẩu xác nhận không khớp");
      const data: Register = { acc_email: email, password, cus_name: name, cus_address: address, cus_phone: phone, cus_birthday: birthday };
      const res = await registerAPI(data);
      if ([400, 401, 402, 403, 404].includes(res.data.statusCode)) return toast.warning(res.data.message);
      toast.success(res.data.message || "Đăng ký thành công");
      return navigate("/");
    } catch (error) {
      return toast.error("Đăng ký thất bại: " + error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); handleOnSubmit(); }}>
      <div><span className="text-sm font-bold uppercase tracking-widest text-brand-600">Thành viên mới</span><h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">Tạo tài khoản</h2></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input className={`${fieldClass} sm:col-span-2`} type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className={fieldClass} type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mật khẩu" />
        <input className={fieldClass} type="password" autoComplete="new-password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="Xác nhận mật khẩu" />
        <input className={fieldClass} type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Họ tên" />
        <input className={fieldClass} type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Số điện thoại" />
        <input className={fieldClass} type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} aria-label="Ngày sinh" />
        <input className={fieldClass} type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Địa chỉ" />
      </div>
      <button className="primary-button w-full" type="submit">Đăng ký</button>
    </form>
  );
};

export default SignUpForm;
