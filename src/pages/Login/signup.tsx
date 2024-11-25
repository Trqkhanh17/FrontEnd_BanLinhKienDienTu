import React, { useState } from "react";
import { toast } from "react-toastify";
import { Register, registerAPI } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
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
      if (
        email === "" ||
        password === "" ||
        confirmPass === "" ||
        name === "" ||
        phone === "" ||
        birthday === "" ||
        address === ""
      ) {
        return toast.warning("Missing required field!!!");
      }

      if (password !== confirmPass) {
        return toast.warning("Password do not match confirm!!!");
      }

      const data: Register = {
        acc_email: email,
        password: password,
        cus_name: name,
        cus_address: address,
        cus_phone: phone,
        cus_birthday: birthday,
      };
      const res = await registerAPI(data);

      if (res.data.statusCode === 409) {
        return toast.warning(res.data.message);
      }

      toast.success(res.data.message);
      return navigate("/");
    } catch (error) {
      return toast.error("Register fails" + error);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Create Account</h1>
        <div className="social-container">
          <a href="#" className="social">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-google-plus-g" />
          </a>
          <a href="#" className="social">
            <i className="fab fa-linkedin-in" />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Confirm Password"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          placeholder="Birthday"
        />
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
