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
          return <Star key={i} style={{ color: "gold" }} />;
        }
        if (i < averageRating) {
          return <StarHalf key={i} style={{ color: "gold" }} />;
        }
        return <StarBorder key={i} style={{ color: "gold" }} />;
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
