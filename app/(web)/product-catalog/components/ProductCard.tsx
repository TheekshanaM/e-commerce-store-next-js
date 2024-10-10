import { IProductCard } from "@/lib/types/productsTypes";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ProductCard({
  imageUrl,
  name,
  price,
  sellingPrice,
  soldCount,
  rating,
  ratingCount,
}: Omit<IProductCard, "_id">) {
  const discount = Math.ceil(((price - sellingPrice) / price) * 100);

  return (
    <Card>
      {/* Product Image */}
      <CardMedia component="img" height="200" image={imageUrl} alt={name} />

      {/* Product Details */}
      <CardContent>
        {/* Product Name */}
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          sx={{
            display: "-webkit-box",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            lineHeight: "1.2em",
            height: "2.4em", // Exactly two lines
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {name}
        </Typography>

        {/* Product Price */}
        <Typography variant="body1" color="text.primary">
          ${sellingPrice.toFixed(2)}
        </Typography>

        {/* Discount Percentage */}
        {discount > 0 && (
          <Typography variant="body2" color="error">
            {discount}% OFF
          </Typography>
        )}

        {/* Sold Items Count and Rating */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 1,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Sold: {soldCount || 0}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="body2" color="text.secondary">
              {/* Rating: */}
              {rating || 0}({ratingCount})
            </Typography>
            <StarIcon fontSize="small" color="primary" />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
