"use client";
import FormSelect from "@/component/form/form-select/FormSelect";
import FormikWrapper from "@/component/form/formik-wrapper/FormikWrapper";
import { Box, SelectChangeEvent } from "@mui/material";
import { FormikErrors } from "formik";

export default function SortBy() {
  const options = [
    { value: "best-match", label: "Best match" },
    { value: "price-low-to-high", label: "Price low to high" },
    { value: "price-heigh-to-low", label: "Price high to low" },
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
    setFieldValue(e.target.name, e.target.value);
    console.log(e.target);
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
