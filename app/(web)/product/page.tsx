"use Client";
// import * as React from "react";
import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Rating,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const product = {
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
  // State to track the main image
  const [mainImage, setMainImage] = useState<string>(product.images[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const boxRef = useRef(null);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 2 + product.images.length) % product.images.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % product.images.length);
  };
  console.log(boxRef.current?.offsetWidth);
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        {/* Product Image and Thumbnails */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              alt={product.name}
              height="400"
              image={mainImage}
            />
          </Card>
          <Box display="flex" justifyContent="center" mt={2}>
            <>
              {/* Previous Button */}
              <IconButton
                onClick={handlePrevClick}
                // sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",zIndex:10 }}
                // xs={2}
                disabled={currentIndex === 0}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <Box
                // xs={8}
                // width={{sx:2}}
                display="flex"
                overflow="hidden"
                justifyContent="start"
                ref={boxRef}
              >
                <Box
                  sx={{
                    display: "flex",
                    transition: "transform 0.3s ease-in-out",
                    transform: `translateX(-${currentIndex * 70}px)`,
                  }}
                >
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      onClick={() => setMainImage(image)}
                      sx={{
                        cursor: "pointer",
                        border:
                          mainImage === image ? "2px solid #1976d2" : "none",
                        marginX: 1,
                      }}
                    >
                      <CardMedia
                        component="img"
                        alt={`thumbnail-${index}`}
                        image={image}
                        sx={{ width: 70, height: 70 }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
              {/* Next Button */}
              <IconButton
                //  xs={2}
                onClick={handleNextClick}
                // sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}
                // disabled={(currentIndex + 1) % product.images.length == 0}
              >
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          </Box>
        </Grid>

        {/* Product Information */}
        <Grid item xs={12} md={6}>
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
        </Grid>

        {/* Product Specifications */}
        <Grid item xs={12}>
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
        </Grid>
      </Grid>
    </Container>
  );
}
