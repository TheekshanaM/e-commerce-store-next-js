import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useField } from "formik";

type optionProps = {
  value: string | number;
  label: string;
};
type FormCheckbox = {
  name: string;
  label: string;
  options: Array<optionProps>;
  selectProps?: SelectProps;
  formControlProps?: FormControlProps;
};

export default function FormSelect({
  name,
  label,
  options,
  selectProps,
  formControlProps,
}: FormCheckbox) {
  const [field, meta] = useField({ name });
  const errorMessage = meta.touched && meta.error;

  return (
    <FormControl fullWidth {...formControlProps} error={!!errorMessage}>
      <InputLabel>{label}</InputLabel>

      <Select label={label} {...field} {...selectProps}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  );
}
