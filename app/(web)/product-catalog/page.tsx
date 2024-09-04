// "use client";

import ProductCard from "./components/ProductCard";
import { Grid2 } from "@mui/material";

const productList = [
  {
    _id: 1,
    imageUrl: "https://via.placeholder.com/150",
    name: "Wireless Headphones",
    price: 59.99,
    discount: 15,
    soldCount: 1200,
    rating: 4.5,
  },
  {
    _id: 2,
    imageUrl: "https://via.placeholder.com/150",
    name: "Smartphone Case",
    price: 12.99,
    discount: 10,
    soldCount: 500,
    rating: 4.2,
  },
  {
    _id: 3,
    imageUrl: "https://via.placeholder.com/150",
    name: "Fitness Tracker",
    price: 39.99,
    discount: 20,
    soldCount: 750,
    rating: 4.7,
  },
  {
    _id: 4,
    imageUrl: "https://via.placeholder.com/150",
    name: "Bluetooth Speaker",
    price: 24.99,
    discount: 5,
    soldCount: 300,
    rating: 4.3,
  },
  {
    _id: 5,
    imageUrl: "https://via.placeholder.com/150",
    name: "Gaming Mouse",
    price: 29.99,
    discount: 25,
    soldCount: 950,
    rating: 4.8,
  },
];

export default function ProductCatalog() {
  return (
    <>
      <Grid2 container spacing={2}>
        {productList.map(({ _id, ...product }) => (
          <Grid2 key={_id} size={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 3 }}>
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>
    </>
  );
}
