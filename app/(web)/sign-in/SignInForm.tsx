"use client";
import FormInput from "@/component/form/form-input/FormInput";
import { Box, Button, Grid2 } from "@mui/material";
import { Formik } from "formik";
import * as Yup from "yup";
import { useToastContext } from "@/hooks/useToastContext";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInForm() {
  const toast = useToastContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("Required")
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            ),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          const response = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
            callbackUrl: callbackUrl,
          });
          const error = response?.error;
          const url = response?.url;

          if (error) {
            toast.error({ message: error });
          } else {
            url && router.push(url);
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
              <Grid2 container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                  <FormInput
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                  />
                </Grid2>
              </Grid2>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isValid || isSubmitting}
              >
                Sign In
              </Button>
            </Box>
          </>
        )}
      </Formik>
    </>
  );
}
