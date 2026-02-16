import React from "react";
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";

export default function CompanyCard({ company }) {
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
               px-5 sm:px-8 py-6 mb-6"
  >
    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

      {/* LEFT SECTION */}
      <div className="flex items-start sm:items-center gap-4 sm:gap-6">

        {/* Logo Box */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <img
            src={
              company.logo
                ? `http://localhost:5000/uploads/${company.logo}`
                : "/media/goldenpiLogo.png"
            }
            alt={company.name}
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
          />
        </div>

        {/* Company Info */}
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            {company.name}
          </h2>

          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {company.location}
          </p>

          {/* Rating Section */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3">

            <span className="text-sm font-semibold text-gray-800">
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

            <span className="text-xs sm:text-sm text-gray-500">
              {company.reviewCount || 0} Reviews
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="text-left md:text-right w-full md:w-auto">
        {formattedDate && (
          <p className="text-xs text-gray-400 mb-3 md:mb-4">
            Founded on {formattedDate}
          </p>
        )}

        <Link
          to={`/company/${company._id}`}
          className="block w-full md:w-auto text-center
                     bg-gray-800 text-white px-5 py-2 rounded-lg
                     text-sm font-medium
                     hover:bg-gray-900 transition duration-200"
        >
          Detail Review
        </Link>
      </div>

    </div>
   </div>     
 );
}
