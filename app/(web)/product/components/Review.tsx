import { IReview } from "@/lib/types/productsTypes";
import { Box, Rating, Typography } from "@mui/material";

function Review({ rating, name, date, comment, reply }: IReview) {
  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: 2,
        marginBottom: 2,
      }}
    >
      {/* Review Header: Rating, Name, Date */}
      <Box display="flex" justifyContent="space-between" mb={1}>
        <Box display="flex" alignItems="center">
          <Rating value={rating} readOnly sx={{ color: "primary.main" }} />
          <Typography sx={{ marginLeft: 1 }}>{name}</Typography>
        </Box>
        <Typography variant="body2" color="textSecondary">
          {new Date(date).toLocaleDateString()}
        </Typography>
      </Box>

      {/* Comment */}
      <Typography sx={{ marginBottom: 2 }}>{comment}</Typography>

      {/* Reply (if exists) */}
      {reply && (
        <Box
          sx={{ backgroundColor: "#f5f5f5", padding: 2, borderRadius: "4px" }}
        >
          <Typography variant="body2" color="textSecondary">
            Reply from {reply.name} on{" "}
            {new Date(reply.date).toLocaleDateString()}
          </Typography>
          <Typography>{reply.comment}</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Review;
