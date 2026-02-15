import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === login.email &&
      savedUser.password === login.password
    ) {
      localStorage.setItem("isLoggedIn", "true");

      alert("Login successful");
      navigate("/");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={login.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={login.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign In</button>
        </form>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
