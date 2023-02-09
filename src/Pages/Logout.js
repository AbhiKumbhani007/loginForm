import { useNavigate } from "react-router-dom";
import useAuth from "../Context/AuthContext";

function Nav() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default Nav;
