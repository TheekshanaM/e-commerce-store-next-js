"use client";
import FormSelect from "@/component/form/form-select/FormSelect";
import FormikWrapper from "@/component/form/formik-wrapper/FormikWrapper";
import { productSortOptionType } from "@/lib/types/productsTypes";
import { Box, SelectChangeEvent } from "@mui/material";
import { FormikErrors } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const [sortBy, setSortBy] = useState("best-match");

  const sortBy = searchParams.get("sort") || "best-match";

  const options: Array<productSortOptionType> = [
    { value: "best-match", label: "Best match" },
    { value: "price-low-to-high", label: "Price low to high" },
    { value: "price-high-to-low", label: "Price high to low" },
  ];

  const handleChange = (
    e: SelectChangeEvent<unknown>,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean
    ) => Promise<void | FormikErrors<{
      sort: string;
    }>>
  ) => {
    const value = e.target.value as string;
    setFieldValue(e.target.name, value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("sort", value);
      params.set("page", "1");
      router.push(`/product-catalog?${params.toString()}`);
    } else {
      params.delete("sort");
      router.push(`/`);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Box sx={{ width: 200 }}>
        <FormikWrapper
          // enableReinitialize={true}
          initialValues={{ sort: sortBy }}
        >
          {(formik) => (
            <FormSelect
              name="sort"
              label="Sort By"
              options={options}
              selectProps={{
                onChange: (e) => {
                  handleChange(e, formik.setFieldValue);
                },
              }}
            />
          )}
        </FormikWrapper>
      </Box>
    </Box>
  );
}
