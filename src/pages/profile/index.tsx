import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import { useAppSelector } from "../../hooks";
import { updateProfileAPI } from "../../api/customerAPI";
import "./Profile.css"; // Import file CSS

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
        const response = await fetch("http://localhost:8000/api/v1/uploadfile", {
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
      <div className="profile-container">
        <h2 className="profile-title">Thông tin</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="profile-form-group">
            <label>Avatar</label>
            <div className="profile-avatar">
              <img src={user.avatar || "src/assets/images/logo.jpg"} alt="avatar" />
            </div>
            <label className="custom-file-upload">
              <input
                type="file"
                name="avatar"
                onChange={handleInputChange}
                accept="image/*"
              />
              Chọn ảnh
            </label>
          </div>
          <div className="profile-form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>
          <div className="profile-form-group">
            <label>Tên khách hàng</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
          </div>
          <div className="profile-form-group">
            <label>Số điện thoại</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
          </div>
          <div className="profile-form-group">
            <label>Ngày tháng năm sinh</label>
            <input
              type="date"
              name="birthday"
              value={user.birthday}
              onChange={handleInputChange}
              placeholder="Birthday"
            />
          </div>
          <div className="profile-form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleInputChange}
              placeholder="Address"
            />
          </div>
          <div className="profile-form-group">
            <button type="submit">
              Cập nhật thông tin
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;