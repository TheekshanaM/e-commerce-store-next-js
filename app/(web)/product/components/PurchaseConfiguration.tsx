"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

function PurchaseConfiguration() {
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ff00ff"];
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  // Decrease quantity but not below 1
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Increase quantity
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // change Color
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <>
      <Box display="flex" alignItems="center" gap={2} my={2}>
        {/* Label for quantity */}
        <Typography variant="body1" sx={{ minWidth: "80px" }}>
          Quantity:
        </Typography>

        {/* Decrease button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleDecrease}
          sx={{ minWidth: "40px", padding: 1 }}
          disabled={quantity <= 1}
        >
          <RemoveIcon />
        </Button>

        {/* Quantity display */}
        <Typography
          variant="body1"
          sx={{ minWidth: "40px", textAlign: "center" }}
        >
          {quantity}
        </Typography>

        {/* Increase button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleIncrease}
          sx={{ minWidth: "40px", padding: 1 }}
        >
          <AddIcon />
        </Button>
      </Box>

      {/* Color options container */}
      <Box display="flex" gap={2} my={2}>
        {/* Label for color */}
        <Typography variant="body1" sx={{ marginBottom: 1 }}>
          Color:
        </Typography>

        {colors.map((color, index) => (
          <Box
            key={color}
            onClick={() => handleColorSelect(color)}
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: color,
              borderRadius: "4px",
              border:
                selectedColor === color ? "2px solid #000" : "1px solid #ccc",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        startIcon={<ShoppingCartIcon />}
        sx={{ marginTop: 2 }}
      >
        Add to Cart
      </Button>
    </>
  );
}

export default PurchaseConfiguration;
