"use client";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from "@mui/material";
import Review from "./Review";
import { useState } from "react";
import { IReview } from "@/lib/types/productsTypes";

const reviews: Array<IReview> = [
  {
    rating: 5,
    name: "John Doe",
    date: "2023-09-01",
    comment: "Great product! Very satisfied with the quality.",
    reply: {
      name: "Seller",
      date: "2023-09-02",
      comment: "Thank you for your feedback, John!",
    },
  },
  {
    rating: 4,
    name: "Jane Smith",
    date: "2023-09-05",
    comment: "Good product but delivery was late.",
    reply: {
      name: "Seller",
      date: "2023-09-06",
      comment: "Sorry for the delay, Jane. We will work on improving it.",
    },
  },
  {
    rating: 3,
    name: "David Brown",
    date: "2023-09-08",
    comment: "Average quality, not what I expected.",
    reply: null,
  },
  {
    rating: 1,
    name: "Alice Green",
    date: "2023-09-10",
    comment: "Terrible experience. Item arrived broken.",
    reply: {
      name: "Seller",
      date: "2023-09-11",
      comment:
        "We apologize for the inconvenience, Alice. Please contact us for a replacement.",
    },
  },
];

function ProductReview() {
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Filter reviews by selected star rating
  const filteredReviews =
    filter === "All"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(filter));

  return (
    <Box>
      {/* Filter */}
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Filter</InputLabel>
          <Select
            label="Filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="All">All</MenuItem>
            {[5, 4, 3, 2, 1].map((star) => (
              <MenuItem key={star} value={star}>
                {star} Star
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Render Reviews */}
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review, index) => (
          <Review key={index} {...review} />
        ))
      ) : (
        <Typography>No reviews.</Typography>
      )}

      <Box display={"flex"} justifyContent={"center"}>
        <Pagination
          count={10}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

export default ProductReview;
