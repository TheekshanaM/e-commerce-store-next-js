import {
  Grid2,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import SortBy from "./components/SortBy";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProductCatalogLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const session = await auth();

  if (!session) {
    redirect(`/sign-in?callbackUrl=/product-catalog`);
  }

  return (
    <Grid2 container spacing={2} sx={{ mt: 2 }}>
      {/* side filter */}
      <Grid2
        spacing={2}
        size={{ md: 3, lg: 3, xl: 3 }}
        sx={{ justifyContent: "center" }}
      >
        <Typography variant="h6" component="h2">
          Filters
        </Typography>
        {/* price rage filter */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          Price
        </Typography>
        <Grid2 container spacing={1}>
          <Grid2 size="grow">
            <TextField size="small" />
          </Grid2>
          <Grid2 size="grow">
            <TextField size="small" />
          </Grid2>
          <Grid2>
            <IconButton
              aria-label="go"
              sx={{ borderRadius: 1, backgroundColor: "green" }}
            >
              <PlayArrowRoundedIcon />
            </IconButton>
          </Grid2>
        </Grid2>
        {/* Rating */}
        <Typography variant="body1" sx={{ mt: 1 }}>
          Rating
        </Typography>
        <Stack spacing={1}>
          <Rating size="small" name="read-only" value={5} readOnly />
          <Rating size="small" name="read-only" value={4} readOnly />
          <Rating size="small" name="read-only" value={3} readOnly />
          <Rating size="small" name="read-only" value={2} readOnly />
          <Rating size="small" name="read-only" value={1} readOnly />
        </Stack>
      </Grid2>

      <Grid2 size={{ md: 9, lg: 9, xl: 9 }}>
        <SortBy />
        {children}
      </Grid2>
    </Grid2>
  );
}
