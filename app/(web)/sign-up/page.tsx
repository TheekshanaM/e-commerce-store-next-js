import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Typography,
  Link,
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import SignUpForm from "./SignUpForm";

export default function SignUP() {
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
            Sign up
          </Typography>

          <SignUpForm />

          <Grid container justifyContent="center">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
