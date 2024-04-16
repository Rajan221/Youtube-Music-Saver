import { useNavigate, Link } from "react-router-dom";
import "../Styles/Dropdown.css";

function Dropdown() {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <ul id="dropMenu">
      <div>Account Settings</div>
      <div>Darkmode</div>
      <Link onClick={handleLogout()}>Logout</Link>
    </ul>
  );
}

export default Dropdown;
