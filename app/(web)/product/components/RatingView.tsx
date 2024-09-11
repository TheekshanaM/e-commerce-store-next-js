import { TRatingView } from "@/lib/types/productsTypes";
import StarIcon from "@mui/icons-material/Star";

import { Box, LinearProgress, Rating, Typography } from "@mui/material";

function RatingView({ averageRating, totalRatings, ratingData }: TRatingView) {
  // Helper function to calculate percentage for each star
  const calculatePercentage = (count: number) => {
    return totalRatings === 0 ? 0 : (count / totalRatings) * 100;
  };

  return (
    <Box display="flex" gap={4} width={"80%"}>
      {/* Left Side: Average Rating and Total Ratings */}
      <Box>
        <Typography variant="h4" component="div">
          {averageRating.toFixed(1)}
        </Typography>
        <Box display="flex" alignItems="center">
          <StarIcon color="primary" />
          <Typography variant="body1" component="span">
            {averageRating} out of 5
          </Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {totalRatings} ratings
        </Typography>
      </Box>

      {/* Right Side: Individual Star Ratings */}
      <Box flex="1">
        {Object.keys(ratingData)
          .reverse()
          .map((star) => (
            <Box key={star} display="flex" alignItems="center" mb={1}>
              <Rating
                size="small"
                name="read-only"
                value={Number(star)}
                readOnly
              />

              {/* Progress Bar */}
              <Box flexGrow={1} mx={2}>
                <LinearProgress
                  variant="determinate"
                  value={calculatePercentage(ratingData[star])}
                  sx={{ height: "10px", borderRadius: "5px" }}
                />
              </Box>

              {/* Rating Count */}
              <Typography sx={{ width: "40px", textAlign: "right" }}>
                {ratingData[star]}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
}

export default RatingView;
