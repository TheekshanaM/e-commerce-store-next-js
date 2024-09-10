import { searchProduct } from "@/lib/actions/product-action";
import ProductCard from "./components/ProductCard";
import {
  Grid2,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { productSortType } from "@/lib/types/productsTypes";
import ProductPagination from "./components/ProductPagination";
import SortBy from "./components/SortBy";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { redirect } from "next/navigation";

export default async function ProductCatalog({
  searchParams: { pn, page, sort },
}: SearchParamProps) {
  const pageSize = 12;

  const productName = (pn as string) || "";
  const pageNo = Number(page as string) || 1;
  const sortingCriteria = (sort as productSortType) || "";

  if (productName === "") {
    redirect("/");
  }
  const { data, success } = await searchProduct({
    productName,
    pageNo,
    pageSize,
    sort: sortingCriteria,
  });

  return (
    <>
      <Grid2 container spacing={2} sx={{ mt: 2 }}>
        {/* side filter */}
        <Grid2
          spacing={2}
          size={{ md: 3, lg: 3, xl: 3 }}
          sx={{ justifyContent: "center" }}
        >
          <Typography variant="h6" component="h2">
            Filters
          </Typography>
          {/* price rage filter */}
          <Typography variant="body1" sx={{ mt: 1 }}>
            Price
          </Typography>
          <Grid2 container spacing={1}>
            <Grid2 size="grow">
              <TextField size="small" />
            </Grid2>
            <Grid2 size="grow">
              <TextField size="small" />
            </Grid2>
            <Grid2>
              <IconButton
                aria-label="go"
                sx={{ borderRadius: 1, backgroundColor: "green" }}
              >
                <PlayArrowRoundedIcon />
              </IconButton>
            </Grid2>
          </Grid2>
          {/* Rating */}
          <Typography variant="body1" sx={{ mt: 1 }}>
            Rating
          </Typography>
          <Stack spacing={1}>
            <Rating size="small" name="read-only" value={5} readOnly />
            <Rating size="small" name="read-only" value={4} readOnly />
            <Rating size="small" name="read-only" value={3} readOnly />
            <Rating size="small" name="read-only" value={2} readOnly />
            <Rating size="small" name="read-only" value={1} readOnly />
          </Stack>
        </Grid2>

        <Grid2 size={{ md: 9, lg: 9, xl: 9 }}>
          <Stack>
            <SortBy />

            {success ? (
              <Grid2 container spacing={2}>
                {data?.products.map(({ _id, ...product }) => (
                  <Grid2 key={_id} size={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 3 }}>
                    <ProductCard {...product} />
                  </Grid2>
                ))}
              </Grid2>
            ) : (
              <Typography>No Data</Typography>
            )}

            <ProductPagination
              noOfPages={data?.totalPages || 0}
              pageNo={pageNo}
            />
          </Stack>
        </Grid2>
      </Grid2>
    </>
  );
}
