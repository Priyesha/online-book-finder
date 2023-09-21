import React from "react";
import { Star, StarBorder, StarHalf } from "@mui/icons-material";
import { Typography } from "@mui/material";

interface StarRatingProps {
  averageRating: number;
  ratingsCount: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  averageRating,
  ratingsCount,
}) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <span>Rating : </span>

      {[...Array(5)].map((_, i) => {
        if (i < Math.floor(averageRating)) {
          return <Star data-testid="full-star" key={i} style={{ color: "gold" }} />;
        }
        if (i < averageRating) {
          return <StarHalf data-testid="half-star" key={i} style={{ color: "gold" }} />;
        }
        return <StarBorder data-testid="bordered-star" key={i} style={{ color: "gold" }} />;
      })}
      <Typography
        variant="body2"
        color="textSecondary"
        component="span"
        style={{ marginLeft: 8 }}
      >
        ({ratingsCount} ratings)
      </Typography>
    </div>
  );
};

export default StarRating;
