import { searchProduct } from "@/lib/actions/product-action";
import ProductCard from "./components/ProductCard";
import { Grid2, Stack, Typography } from "@mui/material";
import { productSortType } from "@/lib/types/productsTypes";
import ProductPagination from "./components/ProductPagination";
import SortBy from "./components/SortBy";
import { redirect } from "next/navigation";
import ProductFilter from "./components/ProductFilter";

export default async function ProductCatalog({
  searchParams: { pn, page, sort, minPrice, maxPrice, rating },
}: SearchParamProps) {
  const pageSize = 12;

  const productName = (pn as string) || "";
  const pageNo = Number(page as string) || 1;
  const sortingCriteria = (sort as productSortType) || "";
  const minimumPrice = (minPrice as string) || "";
  const maximumPrice = (maxPrice as string) || "";
  const ratingValue = Number(rating as string) || null;

  if (productName === "") {
    redirect("/");
  }
  const { data, success } = await searchProduct({
    productName,
    pageNo,
    pageSize,
    sort: sortingCriteria,
    minimumPrice,
    maximumPrice,
    ratingValue,
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

          <ProductFilter
            minimumPrice={minimumPrice}
            maximumPrice={maximumPrice}
            ratingValue={ratingValue}
          />
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
