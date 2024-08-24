"use client";
import FormCheckbox from "@/component/form/form-checkbox/FormCheckbox";
import FormInput from "@/component/form/form-input/FormInput";
import { signUpAction } from "@/lib/actions/user-action";
import { Box, Button, Grid } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useToastContext } from "@/hooks/useToastContext";

export default function SignUpForm() {
  const toast = useToastContext();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("Required")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), ""], "Passwords must match")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const { success, error } = await signUpAction({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
          });

          if (!success && error) {
            toast.error({ message: error });
          } else {
            resetForm();
          }
          setSubmitting(false);
        }}
      >
        {({ isValid, isSubmitting, handleSubmit }) => (
          <>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    autoComplete="given-name"
                    name="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormInput
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormCheckbox name="acceptedTerms">
                    I want to receive inspiration, marketing promotions and
                    updates via email.
                  </FormCheckbox>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid || isSubmitting}
              >
                Sign Up
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </>
  );
}
