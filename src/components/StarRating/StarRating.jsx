// StarRating.jsx (переиспользуемый компонент оценки)
import { useState } from 'react';
import './StarRating.css';

const StarRating = ({ rating = 0, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            className={starValue <= (hoverRating || rating) ? 'filled' : 'empty'}
            onClick={() => onRate(starValue)}
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;