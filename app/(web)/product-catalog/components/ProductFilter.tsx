"use client";

import {
  Box,
  Grid2,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Form, Formik } from "formik";
import FormInput from "@/component/form/form-input/FormInput";
import { useRouter, useSearchParams } from "next/navigation";

interface IPriceFilter {
  minPrice: string;
  maxPrice: string;
}

function ProductFilter({
  minimumPrice,
  maximumPrice,
  ratingValue,
}: {
  minimumPrice: string;
  maximumPrice: string;
  ratingValue: number | null;
}) {
  const ratingArray = [5, 4, 3, 2, 1];
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialValues: IPriceFilter = {
    minPrice: minimumPrice,
    maxPrice: maximumPrice,
  };

  const handleFormSubmit = async ({ minPrice, maxPrice }: IPriceFilter) => {
    const params = new URLSearchParams(searchParams);

    minPrice
      ? params.set("minPrice", `${minPrice}`)
      : params.delete("minPrice");
    maxPrice
      ? params.set("maxPrice", `${maxPrice}`)
      : params.delete("maxPrice");

    params.set("page", "1");

    router.push(`/product-catalog?${params.toString()}`);
  };

  const setRatingFilter = (rating: number) => {
    const params = new URLSearchParams(searchParams);
    if (Number(params.get("rating")) === rating) {
      params.delete("rating");
    } else {
      params.set("rating", `${rating}`);
    }
    params.set("page", "1");

    router.push(`/product-catalog?${params.toString()}`);
  };

  return (
    <>
      {/* price rage filter */}
      <Typography variant="body1" sx={{ mt: 1 }}>
        Price
      </Typography>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <Grid2 container spacing={1}>
            <Grid2 size="grow">
              <FormInput name="minPrice" type="number" size="small" />
            </Grid2>
            <Grid2 size="grow">
              <FormInput name="maxPrice" type="number" size="small" />
            </Grid2>
            <Grid2>
              <IconButton
                type="submit"
                aria-label="go"
                sx={{ borderRadius: 1, backgroundColor: "green" }}
              >
                <PlayArrowRoundedIcon />
              </IconButton>
            </Grid2>
          </Grid2>
        </Form>
      </Formik>

      {/* Rating */}
      <Typography variant="body1" sx={{ mt: 1 }}>
        Rating
      </Typography>
      <Stack spacing={1}>
        {ratingArray.map((item) => (
          <Box
            key={item}
            sx={{ cursor: "pointer" }}
            onClick={() => setRatingFilter(item)}
          >
            <Rating
              size={ratingValue === item ? "medium" : "small"}
              name="read-only"
              value={item}
              readOnly
            />
          </Box>
        ))}
      </Stack>
    </>
  );
}

export default ProductFilter;
