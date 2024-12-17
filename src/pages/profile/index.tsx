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

  useEffect(() => {
    if (User?.cus_birthday) {
      const date = new Date(User.cus_birthday);
      const formattedDate = date.toISOString().split("T")[0]; // Chuyển đổi định dạng ngày tháng
      setUser((prevUser) => ({ ...prevUser, birthday: formattedDate }));
    }
  }, [User]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      cus_email: user.email,
      cus_name: user.name,
      cus_address: user.address,
      cus_birthday: user.birthday,
      cus_phone: user.phone,
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
        <h2 className="profile-title">Profile</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="profile-form-group">
            <div className="profile-avatar">
              <img src={user.avatar? user.avatar:"src/assets/images/logo.jpg"} alt="avatar" />
            </div>
            {/* <input
              type="text"
              name="avatar"
              value={user.avatar}
              onChange={handleInputChange}
              placeholder="Avatar URL"
            /> */}
          </div>
          <div className="profile-form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
          </div>
          <div className="profile-form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              placeholder="Phone"
            />
          </div>
          <div className="profile-form-group">
            <label>Birthday</label>
            <input
              type="date"
              name="birthday"
              value={user.birthday}
              onChange={handleInputChange}
              placeholder="Birthday"
            />
          </div>
          <div className="profile-form-group">
            <label>Address</label>
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
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;