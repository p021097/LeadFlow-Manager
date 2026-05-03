import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logoutUser } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    navigate("/auth");
  };

  return (
    <div className="navbar">
      <div className="navbar-brand">
        <h2>LeadFlow Manager</h2>
        <p>{currentUser?.email}</p>
      </div>
      <div className="navbar-menu">
        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => navigate("/add")}>Add new user</button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
