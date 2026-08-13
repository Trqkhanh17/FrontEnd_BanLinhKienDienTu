import { NavLink } from "react-router-dom";
import { FaArrowRightLong, FaLocationDot, FaPhone } from "react-icons/fa6";

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400">
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid gap-10 md:grid-cols-5 lg:gap-16">
        <section className="md:col-span-2">
          <h2 className="text-xl font-extrabold tracking-wide text-white">TECH SHOP</h2>
          <p className="mt-4 max-w-md text-sm leading-7">
            Tech Shop cung cấp linh kiện điện tử chất lượng cao dành cho kỹ sư, nhà phát triển sản phẩm, doanh nghiệp và cộng đồng yêu công nghệ.
          </p>
          <NavLink className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-400 !no-underline transition hover:text-amber-300" to="/about">
            Tìm hiểu về Tech Shop <FaArrowRightLong />
          </NavLink>
        </section>
        <section className="space-y-4 text-sm md:col-span-3">
          <h2 className="text-base font-bold uppercase tracking-wider text-white">Thông tin liên hệ</h2>
          <div className="flex items-start gap-3">
            <FaLocationDot className="mt-1 shrink-0 text-amber-400" />
            <div><strong className="block text-white">Địa chỉ cửa hàng</strong><span className="mt-1 block leading-6">600 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ</span></div>
          </div>
          <div className="flex items-start gap-3">
            <FaPhone className="mt-1 shrink-0 text-amber-400" />
            <div><strong className="block text-white">Hỗ trợ khách hàng</strong><a href="tel:0394551401" className="mt-1 block !no-underline transition hover:text-white">0394 551 401</a></div>
          </div>
          <p className="border-l-2 border-amber-400 pl-3 text-xs leading-6">Tech Shop được phát triển và vận hành bởi Quốc Khánh.</p>
        </section>
      </div>
      <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs sm:text-left sm:text-sm">
        <span>© {currentYear} Quốc Khánh. Bảo lưu mọi quyền.</span>
      </div>
    </div>
  </footer>
);

export default Footer;
