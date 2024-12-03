import { useState } from "react";
import { toast } from "react-toastify";
import { loginAPI } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = async () => {
    try {
      if (email === "" || password === "") {
        return toast.warning("Missing field email or password");
      }
      const res = await loginAPI(email, password);
      if (res.data.statusCode === 404) {
        return toast.error(`${res.data.message}`);
      }

      if(res.data.statusCode === 403){
        return toast.error(`${res.data.message}`);
      }
      if (res.data.statusCode === 401) {
        return toast.error(`${res.data.message}`);
      }
      toast.success("Login successfully");
      return navigate("/");
    } catch (error) {
      return toast.error("Login Fails " + error);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <form>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <a href="#">Forgot your password?</a>
        <button type="button" onClick={() => handleOnSubmit()}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SignInForm;
