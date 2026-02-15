import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addReview } from "../services/api";

export default function AddReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    subject: "",
    reviewText: "",
    rating: 1,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.subject || !formData.reviewText) {
      setError("All fields are required");
      return;
    }

    try {
      await addReview(id, formData);
      navigate(`/company/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add review");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Review
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Your Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="subject"
            placeholder="Review Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />

          <textarea
            name="reviewText"
            placeholder="Write your review..."
            value={formData.reviewText}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
          />

          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="1">1 ⭐</option>
            <option value="2">2 ⭐⭐</option>
            <option value="3">3 ⭐⭐⭐</option>
            <option value="4">4 ⭐⭐⭐⭐</option>
            <option value="5">5 ⭐⭐⭐⭐⭐</option>
          </select>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
