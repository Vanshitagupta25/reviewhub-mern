import React, { useState } from "react";
import "./AddCompany.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddCompany() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    location: "",
    foundedOn: "",
    logo: null,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "logo") {
      setFormData({
        ...formData,
        logo: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("city", formData.city);
      data.append("location", formData.location);
      data.append("foundedOn", formData.foundedOn);
      data.append("logo", formData.logo);

      await axios.post("http://localhost:5000/api/companies", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/");
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to add company");
    }
  };

  return (
    <div className="add-company-container">
      <div className="add-company-box">
        <h2>Add Company</h2>

        {error && <p className="error-text">{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Company Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option value="Indore">Indore</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Mumbai">Mumbai</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
          />

          <input
            type="date"
            name="foundedOn"
            value={formData.foundedOn}
            onChange={handleChange}
            required
          />

          {/* 🔥 Logo Upload */}
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>

        </form>
      </div>
    </div>
  );
}
