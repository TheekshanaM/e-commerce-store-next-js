"use client";
import FormSelect from "@/component/form/form-select/FormSelect";
import FormikWrapper from "@/component/form/formik-wrapper/FormikWrapper";
import { productSortOptionType } from "@/lib/types/productsTypes";
import { Box, SelectChangeEvent } from "@mui/material";
import { FormikErrors } from "formik";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortBy() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
      router.push(`/product-catalog?${params.toString()}`);
      return;
    } else {
      params.delete("sort");
      router.push(`/`);
      return;
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "end" }}>
      <Box sx={{ width: 200 }}>
        <FormikWrapper initialValues={{ sort: "best-match" }}>
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
