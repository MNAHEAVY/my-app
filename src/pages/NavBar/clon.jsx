import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const location = useLocation();
  const excludePaths = ["/admin"];
  const matches = useMediaQuery("(min-width:600px)");

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItemsDesktop = (
    <>
      <Link to="/accesorios">
        <Typography variant="h6">Accesorios</Typography>
      </Link>
      {/* Add other links for desktop view */}
    </>
  );

  const navItemsMobile = (
    <List>
      <ListItem button component={Link} to="/accesorios">
        Accesorios
      </ListItem>
      {/* Add other list items for mobile view */}
    </List>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Typography variant="h6" component="div">
              Iphone Case Oberá
            </Typography>
          </Link>
        </Box>
        {!matches && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        )}
        {matches && navItemsDesktop}
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          {navItemsMobile}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;
