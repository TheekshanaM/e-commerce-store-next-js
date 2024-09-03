import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Typography,
  Link as MUILink,
  Grid2,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignInForm from "./SignInForm";
import Link from "next/link";

export default function SignIn() {
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <SignInForm />

          <Grid2 container justifyContent="center">
            <Grid2>
              <MUILink href="/sign-up" component={Link} variant="body2">
                Don&apos;t have an account yet? Register now
              </MUILink>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </>
  );
}
