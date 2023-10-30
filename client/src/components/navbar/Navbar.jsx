import "./navbar.css";
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Voyage Vault</span>
        </Link>
        {user ? (
          <div className="navItems">
            <span>{user.username}</span>
            <a href="http://localhost:3000/login" target="_blank" rel="noopener noreferrer">
              <button className="navButton">Login As Admin</button>
            </a>
            <button
              onClick={() => {
                dispatch({ type: "LOGOUT" });
                navigate("/");
              }}
              className="navButton"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <a href="http://localhost:3000/login" target="_blank" rel="noopener noreferrer">
              <button className="navButton" >Login As Admin</button>
            </a>
            <button
              onClick={() => {
                navigate("/register");
              }}
              className="navButton"
            >
              Register
            </button>
            <button
              onClick={() => {
                navigate("/login");
              }}
              className="navButton"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
