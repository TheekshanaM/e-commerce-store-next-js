"use client";
import { Box, Pagination, Stack } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function ProductPagination({
  noOfPages,
  pageNo,
}: {
  noOfPages: number;
  pageNo: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("page", `${value}`);
    } else {
      params.delete("page");
    }
    router.push(`/product-catalog?${params.toString()}`);
  };

  return (
    <Box mt={2}>
      <Stack alignItems="center">
        <Pagination
          count={noOfPages}
          page={pageNo}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </Box>
  );
}
