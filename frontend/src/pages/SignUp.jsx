import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registered Successfully");
    navigate("/signin");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Create an Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={user.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/signin">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
