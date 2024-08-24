import {
  Checkbox,
  CheckboxProps,
  FormControl,
  FormControlLabel,
  FormControlProps,
  FormGroup,
  FormHelperText,
} from "@mui/material";
import { useField } from "formik";
import { ReactNode } from "react";

type FormCheckbox = {
  name: string;
  children: ReactNode;
  checkboxProps?: CheckboxProps;
  formControlProps?: FormControlProps;
};
export default function FormCheckbox({
  name,
  children,
  checkboxProps,
  formControlProps,
  ...props
}: FormCheckbox) {
  const [field, meta] = useField({ name, type: "checkbox" });
  const errorMessage = meta.touched && meta.error;

  return (
    <>
      <FormControl
        error={!!errorMessage}
        component="fieldset"
        // variant="standard"
        {...formControlProps}
      >
        <FormGroup>
          <FormControlLabel
            control={<Checkbox {...field} {...checkboxProps} />}
            label={children}
          />
          <FormHelperText>{errorMessage}</FormHelperText>
        </FormGroup>
      </FormControl>
    </>
  );
}
