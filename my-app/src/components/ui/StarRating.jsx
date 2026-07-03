import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const StarRating = ({ rating, reviews }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-accent" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-accent" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-gray-300" />);
    }
  }

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex text-xs">{stars}</div>
      {reviews !== undefined && (
        <span className="text-xs text-gray-500">({reviews})</span>
      )}
    </div>
  );
};

export default StarRating;
