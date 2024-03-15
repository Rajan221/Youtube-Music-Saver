import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "rajansuper221@gmail.com" && password === "Pet14master@") {
    } else {
      alert("Email or Password dont match");
    }

    navigate("/home");
  };

  document.title = "Login";
  return (
    <div id="loginBody">
      <h1>Login Form</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button type="submit">Login</button>
      </form>

      <Link id="toSignUp" to={"/signup"}>
        Dont Have Account?
      </Link>
    </div>
  );
}

export default Login;
