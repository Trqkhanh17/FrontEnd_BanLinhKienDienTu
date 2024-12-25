import { useState } from "react";
import "./styles.css";
import SignInForm from "./signin";
import SignUpForm from "./signup";

export default function Login() {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text: any) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div className="App">
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Chào Mừng</h1>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Đăng Nhập
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Chào Mừng</h1>
              <p>Nhập vào thông tin để tạo tài khoản</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Đăng Kí
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
