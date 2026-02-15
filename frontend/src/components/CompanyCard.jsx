import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";

export default function CompanyCard({ company }) {
  
  // Format date as DD-MM-YYYY
  const formattedDate = company.foundedOn
    ? (() => {
        const date = new Date(company.foundedOn);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      })()
    : "";

  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl
                 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]
                 hover:shadow-[0px_6px_25px_rgba(0,0,0,0.08)]
                 transition-all duration-200
                 px-8 py-6 mb-6"
    >
      <div className="flex justify-between items-center">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-6">

          {/* Logo Box */}
          <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center">
            <img
              src={
                company.logo
                  ? `http://localhost:5000/uploads/${company.logo}`
                  : "/media/goldenpiLogo.png"
              }
              alt={company.name}
              className="w-12 h-12 object-contain"
            />
          </div>

          {/* Company Info */}
          <div>
            <h2 className="text-[18px] font-semibold text-gray-900">
              {company.name}
            </h2>

            <p className="text-[13px] text-gray-500 mt-1">
              {company.location}
            </p>

            {/* Rating Section */}
            <div className="flex items-center gap-3 mt-3">

              <span className="text-[14px] font-semibold text-gray-800">
                {company.averageRating?.toFixed(1) || "0.0"}
              </span>

              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(company.averageRating || 0)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <span className="text-[13px] text-gray-500">
                {company.reviewCount || 0} Reviews
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="text-right">
          {formattedDate && (
            <p className="text-[12px] text-gray-400 mb-4">
              Founded on {formattedDate}
            </p>
          )}

          <Link
            to={`/company/${company._id}`}
            className="bg-gray-800 text-white px-5 py-2 rounded-lg
                       text-[14px] font-medium
                       hover:bg-gray-900 transition duration-200"
          >
            Detail Review
          </Link>
        </div>

      </div>
    </div>
  );
}
