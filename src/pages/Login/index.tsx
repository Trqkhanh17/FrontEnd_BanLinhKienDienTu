import { useState } from "react";
import { Link } from "react-router-dom";
import SignInForm from "./signin";
import SignUpForm from "./signup";
import Logo from "../../assets/images/logo.jpg";

export default function Login() {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-900 via-brand-700 to-slate-900 px-3 py-4 sm:flex sm:items-center sm:justify-center sm:px-6 sm:py-8">
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl lg:grid-cols-[0.8fr_1.2fr]">
        <section className="flex flex-col justify-between bg-brand-900 p-5 text-white sm:p-8 lg:p-10">
          <div>
            <Link to="/" className="inline-flex items-center gap-3 !no-underline">
              <img src={Logo} alt="Tech Shop" className="h-14 w-14 rounded-full object-cover" />
              <span className="text-xl font-extrabold">TECH SHOP</span>
            </Link>
            <h1 className="mt-6 text-2xl font-extrabold sm:mt-8 sm:text-4xl">Chào mừng bạn</h1>
            <p className="mt-3 hidden max-w-sm leading-7 text-brand-100 min-[420px]:block">Đăng nhập để mua linh kiện, theo dõi đơn hàng và quản lý thông tin cá nhân.</p>
          </div>
          <div className="mt-6 flex rounded-xl bg-white/10 p-1">
            <button type="button" onClick={() => setType("signIn")} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-bold transition ${type === "signIn" ? "bg-white text-brand-900" : "text-white hover:bg-white/10"}`}>Đăng nhập</button>
            <button type="button" onClick={() => setType("signUp")} className={`flex-1 rounded-lg px-3 py-2.5 text-sm font-bold transition ${type === "signUp" ? "bg-white text-brand-900" : "text-white hover:bg-white/10"}`}>Đăng ký</button>
          </div>
        </section>
        <section className="p-5 sm:p-10 lg:p-12">
          {type === "signIn" ? <SignInForm /> : <SignUpForm />}
        </section>
      </div>
    </main>
  );
}
