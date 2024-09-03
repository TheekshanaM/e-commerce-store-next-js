"use client";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const drawerWidth = 240;

export default function NavigationDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const navItems = [
    { item: "Profile", link: "/profile", authorized: true },
    { item: "Orders", link: "/orders", authorized: true },
    { item: "Sign in", link: "/sign-in" },
    { item: "Sign up", link: "/sign-up" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const logout = async () => {
    const { url } = await signOut({ redirect: false, callbackUrl: "/sign-in" });

    router.push(url);
    router.refresh();
  };

  return (
    <>
      {/* Icon for open drawer */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ my: 2 }}>
            MUI
          </Typography>
          <Divider />
          <List>
            {navItems.map(
              ({ item, link, authorized }) =>
                (!authorized || session) && (
                  <ListItem key={item} disablePadding>
                    <ListItemButton
                      href={link}
                      component={Link}
                      sx={{ textAlign: "center" }}
                    >
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                )
            )}
          </List>

          {session && (
            <ListItem>
              <ListItemButton sx={{ textAlign: "center" }} onClick={logout}>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </Box>
      </Drawer>
    </>
  );
}
