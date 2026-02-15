import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSingleCompany, getReviews, likeReview } from "../services/api";

export default function CompanyDetail() {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companyRes = await getSingleCompany(id);
        console.log("Company response:", companyRes.data);
        setCompany(companyRes.data);

        const reviewRes = await getReviews(id);
        setReviews(reviewRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleLike = async (reviewId) => {
    try {
      await likeReview(reviewId);
      const reviewRes = await getReviews(id);
      setReviews(reviewRes.data);
    } catch (err) {
      console.error("Error liking review:", err);
    }
  };

  if (loading) return <div className="p-10">Loading...</div>;
  if (!company) return <div className="p-10">Company not found</div>;

  const averageRating =
  reviews.length > 0
    ? (
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length
      ).toFixed(1)
    : "0.0";


  return (
    <div className="bg-gray-100 min-h-screen p-10">

      {/* Company Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{company.name}</h1>

        <p className="text-gray-600">Location: {company.location}</p>
        <p className="text-gray-600">City: {company.city}</p>

        {company.foundedOn && (
          <p className="text-gray-600">
            foundedOn: {new Date(company.foundedOn).toLocaleDateString()}
          </p>
        )}

        <p className="mt-4 text-lg font-semibold">
         ⭐ {averageRating} ({reviews.length} Reviews)
        </p>

        <Link
          to={`/company/${id}/review`}
          className="inline-block mt-4 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Review
        </Link>
      </div>

      {/* Reviews Section */}
      <h2 className="text-xl font-semibold mb-4">All Reviews</h2>

      {reviews.length === 0 && (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      )}

      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-white shadow-md p-4 rounded-lg mb-4"
        >
          <h3 className="font-semibold">{review.subject}</h3>

          {/* Show rating if exists */}
          {review.rating && (
            <p className="text-yellow-500">
              {"⭐".repeat(review.rating)}
            </p>
          )}

          <p className="text-gray-700 mt-2">{review.reviewText}</p>

          <p className="text-xs text-gray-400 mt-2">
            - {review.fullName}
          </p>

          <button
            onClick={() => handleLike(review._id)}
            className="text-sm text-blue-600 mt-2 hover:underline"
          >
            👍 {review.likes}
          </button>
        </div>
      ))}
    </div>
  );
}
