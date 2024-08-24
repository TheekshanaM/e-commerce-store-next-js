import { TextField, TextFieldProps } from "@mui/material";
import { FieldHookConfig, useField } from "formik";

export default function FormInput(
  props: FieldHookConfig<string> & TextFieldProps
) {
  const [field, meta] = useField(props);
  const errorMessage = meta.touched && meta.error;

  return (
    <>
      <TextField
        fullWidth
        // label={label}
        {...field}
        {...props}
        helperText={errorMessage}
        error={!!errorMessage}
      />
    </>
  );
}
