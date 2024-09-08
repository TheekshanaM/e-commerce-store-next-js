// "use client";

import { searchProduct } from "@/lib/actions/product-action";
import ProductCard from "./components/ProductCard";
import { Grid2, Pagination } from "@mui/material";
import { IProductCard } from "@/lib/types/productsTypes";
import ProductPagination from "./components/ProductPagination";

export default async function ProductCatalog({
  searchParams: { pn, page },
}: SearchParamProps) {
  const pageSize = 3;
  const productName = (pn as string) || "";
  const pageNo = Number(page as string) || 1;

  const { data, error, success } = await searchProduct({
    productName,
    pageNo,
    pageSize,
  });

  if (!success && error) {
    return <>No data</>;
  }

  return (
    <>
      <Grid2 container spacing={2}>
        {data?.products.map(({ _id, ...product }) => (
          <Grid2 key={_id} size={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 3 }}>
            <ProductCard {...product} />
          </Grid2>
        ))}
      </Grid2>
      <ProductPagination noOfPages={data?.totalPages || 0} pageNo={pageNo} />
    </>
  );
}
