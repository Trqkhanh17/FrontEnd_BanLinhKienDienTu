import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../hooks";
import { updateProfileAPI } from "../../api/customerAPI";
import fallbackAvatar from "../../assets/images/logo.jpg";
import { API_BASE_URL } from "../../hooks/apiClient";

const Profile = () => {
  const User = useAppSelector((state) => state.profile.dataProfile);

  const [user, setUser] = useState({
    name: User?.cus_name || "",
    email: User?.cus_email || "",
    phone: User?.cus_phone || "",
    address: User?.cus_address || "",
    avatar: User?.cus_avatar || "",
    birthday: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (User?.cus_birthday) {
      const date = new Date(User.cus_birthday);
      const formattedDate = date.toISOString().split("T")[0]; // Chuyển đổi định dạng ngày tháng
      setUser((prevUser) => ({ ...prevUser, birthday: formattedDate }));
    }
  }, [User]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files) {
      const file = files[0];
      setSelectedFile(file); // Lưu file tạm thời
      setUser({ ...user, avatar: URL.createObjectURL(file) });
    } else {
      setUser({ ...user, [name]: value });
    }
  };


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let avatarURL = user.avatar; // Avatar mặc định từ state

    // Nếu có file mới được chọn, upload lên server
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch(`${API_BASE_URL}/uploadfile`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          avatarURL = data.downloadURL; // Lấy URL của file đã upload
        } else {
          toast.error("Failed to upload avatar");
          return; // Dừng lại nếu upload thất bại
        }
      } catch (error) {
        console.error("Error uploading avatar:", error);
        toast.error("Error uploading avatar");
        return; // Dừng lại nếu có lỗi
      }
    }

    // Chuẩn bị dữ liệu cập nhật
    const data = {
      cus_email: user.email,
      cus_name: user.name,
      cus_address: user.address,
      cus_birthday: user.birthday,
      cus_phone: user.phone,
      cus_avatar: avatarURL, // URL avatar mới (nếu có)
    };

    try {
      const res = await updateProfileAPI(data);
      if (res.status === 200) {
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("Failed to update profile: " + error);
    }
  };

  return (
    <Layout>
      <div className="page-shell">
        <form className="panel mx-auto max-w-2xl space-y-5" onSubmit={handleFormSubmit}>
          <div className="text-center"><span className="text-sm font-bold uppercase tracking-widest text-brand-600">Tài khoản</span><h1 className="mt-2 text-2xl font-extrabold sm:text-3xl">Thông tin cá nhân</h1></div>
          <div className="flex flex-col items-center">
            <img className="h-28 w-28 rounded-full border-4 border-brand-100 object-cover shadow-sm" src={user.avatar || fallbackAvatar} alt="Ảnh đại diện" />
            <label className="mt-4 cursor-pointer rounded-lg bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 hover:bg-brand-100">
              <input
                className="sr-only"
                type="file"
                name="avatar"
                onChange={handleInputChange}
                accept="image/*"
              />
              Chọn ảnh đại diện
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Email
            <input
              className="form-field mt-2"
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Email"
            /></label>
          <label className="text-sm font-semibold text-slate-700">Tên khách hàng
            <input
              className="form-field mt-2"
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Name"
            /></label>
          <label className="text-sm font-semibold text-slate-700">Số điện thoại
            <input
              className="form-field mt-2"
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            /></label>
          <label className="text-sm font-semibold text-slate-700">Ngày sinh
            <input
              className="form-field mt-2"
              type="date"
              name="birthday"
              value={user.birthday}
              onChange={handleInputChange}
              placeholder="Birthday"
            /></label>
          <label className="text-sm font-semibold text-slate-700 sm:col-span-2">Địa chỉ
            <input
              className="form-field mt-2"
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              placeholder="Address"
            /></label>
          </div>
          <div>
            <button className="primary-button w-full" type="submit">
              Cập nhật thông tin
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
