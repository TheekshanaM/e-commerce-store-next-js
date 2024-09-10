"use client";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import {
  Box,
  CardContent,
  Container,
  Divider,
  Grid2,
  Rating,
  Button,
  Typography,
} from "@mui/material";
import ImagePreview from "../components/ImagePreview";
import { productDetails } from "@/lib/types/productsTypes";

const product: productDetails = {
  id: 1,
  name: "Awesome Product",
  price: 999.99,
  description: "This is an awesome product that you will love!",
  images: [
    "https://via.placeholder.com/400", // Main image initially
    "https://via.placeholder.com/400/0000FF", // Additional images
    "https://via.placeholder.com/400/FF0000",
    "https://via.placeholder.com/400/FFFF00",
    "https://via.placeholder.com/400/00FF00",
    "https://via.placeholder.com/400/FF0000",
    "https://via.placeholder.com/400/FFFF00",
  ],
  rating: 4.5,
  reviews: 25,
  specifications: [
    { key: "Color", value: "Black" },
    { key: "Size", value: "Medium" },
    { key: "Material", value: "Cotton" },
  ],
};

export default function Products() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid2 container spacing={4}>
        {/* Product Image and Thumbnails */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <ImagePreview images={product.images} productName={product.name} />
        </Grid2>

        {/* Product Information */}
        <Grid2 size={{ xs: 12, md: 6 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {product.name}
            </Typography>
            <Rating
              value={product.rating}
              precision={0.1}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="textSecondary" gutterBottom>
              {product.reviews} reviews
            </Typography>
            <Typography variant="h5" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartIcon />}
              sx={{ marginTop: 2 }}
            >
              Add to Cart
            </Button>
          </CardContent>
        </Grid2>

        {/* Product Specifications */}
        <Grid2 size={{ xs: 12 }}>
          <Divider sx={{ marginY: 3 }} />
          <Typography variant="h5" gutterBottom>
            Specifications
          </Typography>
          {product.specifications.map((spec, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="subtitle1" component="span">
                {spec.key}:
              </Typography>
              <Typography
                variant="body1"
                component="span"
                sx={{ marginLeft: 1 }}
              >
                {spec.value}
              </Typography>
            </Box>
          ))}
        </Grid2>
      </Grid2>
    </Container>
  );
}
