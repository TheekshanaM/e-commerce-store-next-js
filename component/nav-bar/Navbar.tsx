import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchBox from "./SearchBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProfileDropBox from "./ProfileDropBox";
import { auth } from "@/auth";
import Link from "next/link";
import NavigationDrawer from "./NavigationDrawer";

export default async function Navbar() {
  const session = await auth();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <NavigationDrawer />

            <Button
              href="/"
              disableRipple
              component={Link}
              sx={{
                my: 2,
                color: "white",
                display: "block",
                textTransform: "none",
              }}
            >
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                MUI
              </Typography>
            </Button>

            <Box sx={{ flexGrow: 1 }} />

            <SearchBox />

            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <Badge badgeContent={4} color="error">
                <AddShoppingCartIcon />
              </Badge>
            </IconButton>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {!session && (
                <>
                  <Button
                    href="/sign-in"
                    component={Link}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textTransform: "none",
                    }}
                  >
                    Sign in
                  </Button>
                  <Button
                    href="/sign-up"
                    component={Link}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      textTransform: "none",
                    }}
                  >
                    Sign up
                  </Button>
                </>
              )}

              {session && <ProfileDropBox />}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
