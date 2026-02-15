import { StarIcon } from "@heroicons/react/24/solid";

export default function RatingStars({ rating = 0 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <StarIcon
          key={star}
          className={`w-4 h-4 ${
            star <= Math.round(rating)
              ? "text-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
