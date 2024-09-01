import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchBox from "./SearchBox";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProfileDropBox from "./ProfileDropBox";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            MUI
          </Typography>

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

          <ProfileDropBox />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
