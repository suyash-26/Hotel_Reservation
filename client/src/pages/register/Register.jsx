import { useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    country:undefined,
    city: undefined,
    phone:undefined,
    password: undefined
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (credentials.username && credentials.email && credentials.password) {
      try {
        const res = await axios.post("/auth/register", credentials);
        navigate("/login");
      } catch (err) {
        setError("username or email already exist");
      }
    } else {
      setError("please Fill all the information");
    }
  };
  return (
    <div className="register">
      <div className="rContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        {/* ================================= */}
        <input
          type="text"
          placeholder="country"
          id="country"
          onChange={handleChange}
          className="rInput"
        /><input
        type="text"
        placeholder="city"
        id="city"
        onChange={handleChange}
        className="rInput"
      /><input
      type="text"
      placeholder="phone"
      id="phone"
      onChange={handleChange}
      className="rInput"
    />
    {/* ========================================= */}
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <div className="rButtons">
          <button onClick={handleClick} className="rButton">
            Register
          </button>
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="rButton"
          >
            Login
          </button>
        </div>
        {error}
      </div>
    </div>
  );
};
export default Register;
