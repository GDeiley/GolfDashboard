"use client";

import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ totalStars = 5, onRate, initialRating = 0 }) {
    const [rating, setRating] = useState(initialRating);

    const handleClick = (starIndex) => {
        console.log("Star clicked with rating", starIndex)
        const newRating = starIndex;
        setRating(newRating);
        if (onRate) {
            onRate(newRating); // Calls the function to save the rating
        }
    };

    return (
        <div className="flex gap-1">
            {Array.from({ length: totalStars }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => handleClick(i + 1)}
                    className="p-0 m-0 bg-transparent border-none cursor-pointer"
                    type="button"
                >
                    <Star
                        size={28}
                        className={`transition-all ${i < rating ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-gray-400"
                            }`}
                    />
                </button>
            ))}
        </div>
    );
}
