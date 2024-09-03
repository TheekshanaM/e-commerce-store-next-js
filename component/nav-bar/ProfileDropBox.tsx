"use client";

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileDropBox() {
  const [anchorElUser, setAnchorElUser] = useState<boolean>(false);
  const router = useRouter();

  const handleOpenUserMenu = () => {
    setAnchorElUser(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };

  const logout = async () => {
    const { url } = await signOut({ redirect: false, callbackUrl: "/sign-in" });
    setAnchorElUser(false);
    router.push(url);
    router.refresh();
  };

  const settings = ["Profile", "Orders", "Logout"];

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
        <Avatar alt="Remy Sharp" src="https://via.placeholder.com/400/00FF00" />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={anchorElUser}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem key={setting} onClick={logout}>
            <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
