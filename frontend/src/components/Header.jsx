import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    alert("Logged out successfully");
    navigate("/signin");
  };

  return (
    <div className="bg-white shadow-md px-10 py-4 flex justify-between items-center">
      
      <Link to="/" className="flex items-center gap-2">
        <div className="bg-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold">
          ★
        </div>

        <h1 className="text-xl font-semibold">
          Review<span className="text-black">&</span>
          <span className="font-bold">RATE</span>
        </h1>
      </Link>

      <div className="flex gap-6 items-center">

        {!isLoggedIn ? (
          <>
            <Link
              to="/signin"
              className="text-gray-600 hover:text-black"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="text-gray-600 hover:text-black"
            >
              SignUp
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
}
