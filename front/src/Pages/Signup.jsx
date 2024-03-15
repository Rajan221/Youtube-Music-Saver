import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Styles/SignUp.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "rajansuper221@gmail.com" && password === "Pet14master@") {
      navigate("/home");
    } else {
      alert("Email or Password dont match");
    }
  };

  document.title = "Sign Up";
  return (
    <div id="loginBody">
      <h1>Sign Up Form</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Full Name"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
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
        <button type="submit">Sign up</button>
      </form>
      <Link id="toLogin" to={"/login"}>
        Already Have Account?
      </Link>
    </div>
  );
}

export default Signup;
