import {
  Box,
  CardContent,
  Container,
  Divider,
  Grid2,
  Rating,
  Typography,
} from "@mui/material";
import ImagePreview from "../components/ImagePreview";
import { IProductDetails } from "@/lib/types/productsTypes";
import PurchaseConfiguration from "../components/PurchaseConfiguration";
import RatingView from "../components/RatingView";
import ProductReview from "../components/ProductReview";

const product: IProductDetails = {
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
    "https://via.placeholder.com/400/FF0050",
    "https://via.placeholder.com/400/F7FF00",
  ],
  colors: {
    "#FFFF00": "https://via.placeholder.com/400/FFFF00",
    "#0000FF": "https://via.placeholder.com/400/0000FF",
  },
  averageRating: 4.3,
  reviews: 25,
  specifications: [
    { key: "Color", value: "Black" },
    { key: "Size", value: "Medium" },
    { key: "Material", value: "Cotton" },
  ],
  totalRatings: 150,
  ratingData: {
    5: 90,
    4: 40,
    3: 10,
    2: 5,
    1: 5,
  },
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
              value={product.averageRating}
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

            <PurchaseConfiguration />
          </CardContent>
        </Grid2>
      </Grid2>

      {/* Product Specifications */}

      <Divider sx={{ marginY: 8 }} />
      <Typography variant="h5" gutterBottom>
        Specifications
      </Typography>
      {product.specifications.map((spec, index) => (
        <Box key={index} sx={{ marginBottom: 2 }}>
          <Typography variant="subtitle1" component="span">
            {spec.key}:
          </Typography>
          <Typography variant="body1" component="span" sx={{ marginLeft: 1 }}>
            {spec.value}
          </Typography>
        </Box>
      ))}

      <Divider sx={{ marginY: 8 }} />

      <RatingView
        averageRating={product.averageRating}
        totalRatings={product.totalRatings}
        ratingData={product.ratingData}
      />

      <ProductReview />
    </Container>
  );
}
