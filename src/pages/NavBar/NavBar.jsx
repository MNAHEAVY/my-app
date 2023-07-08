// import * as React from "react";
// import Box from "@mui/material/Box";
// import { Link } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import Drawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import { Typography } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import SearchBar from "../SearchBar/SearchBar";

// const rightLink = {
//   fontSize: 16,
//   color: "black",
//   ml: 1,
//   "&:hover": { color: "gray" },
// };

// const leftLink = {
//   fontSize: 24,
//   color: "black",
//   ml: 2,
//   "&:hover": { color: "gray" },
// };
// function NavBar() {
//   const [drawerOpen, setDrawerOpen] = React.useState(false);
//   const location = useLocation();
//   const excludePaths = ["/admin"];
//   const matches = useMediaQuery("(min-width:600px)");

//   if (excludePaths.includes(location.pathname)) {
//     return null;
//   }

//   const toggleDrawer = (open) => (event) => {
//     if (
//       event.type === "keydown" &&
//       (event.key === "Tab" || event.key === "Shift")
//     ) {
//       return;
//     }
//     setDrawerOpen(open);
//   };

//   const navItemsDesktop = (
//     <>
//       <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
//         <SearchBar />
//       </Box>
//       <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
//         <Link to="/accesorios">
//           <Typography variant="h6">Accesorios</Typography>
//         </Link>
//         <Link to="/accesorios">
//           <Typography variant="h6">Accesorios</Typography>
//         </Link>
//         <Link to="/accesorios">
//           <Typography variant="h6">Accesorios</Typography>
//         </Link>
//         <Link to="/accesorios">
//           <Typography variant="h6">Accesorios</Typography>
//         </Link>
//         <Link to="/accesorios">
//           <Typography variant="h6">Accesorios</Typography>
//         </Link>
//       </Box>
//       {/* Add other links for desktop view */}
//     </>
//   );

//   const navItemsMobile = (
//     <List>
//       <ListItem button component={Link} to="/accesorios">
//         Accesorios
//       </ListItem>
//       {/* Add other list items for mobile view */}
//     </List>
//   );
//   return (
//     <div>
//       <AppBar sx={{ top: "35px", display: "flex", bgcolor: "white" }}>
//         <Toolbar sx={{ justifyContent: "space-around" }}>
//           <Box sx={{ flexGrow: 1 }}>
//             <img
//               style={{ width: "45px" }}
//               id="logo"
//               src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
//               alt="Iphone"
//             />
//             <Link to="/">
//               <Typography color="inherit" variant="h6" sx={leftLink}>
//                 {"Iphone Case Oberá"}
//               </Typography>
//             </Link>
//           </Box>

//           {!matches && (
//             <IconButton
//               edge="end"
//               color="black"
//               aria-label="menu"
//               onClick={toggleDrawer(true)}
//             >
//               <MenuIcon />
//             </IconButton>
//           )}
//           {matches && navItemsDesktop}
//         </Toolbar>
//         <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
//           <Box
//             sx={{ width: 250 }}
//             role="presentation"
//             onClick={toggleDrawer(false)}
//             onKeyDown={toggleDrawer(false)}
//           >
//             {navItemsMobile}
//           </Box>
//         </Drawer>
//       </AppBar>
//       <Toolbar />
//     </div>
//   );
// }

// export default NavBar;

import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import AppBar from "../../pages/Components/AppBar";
import Toolbar from "../../pages/Components/Toolbar";
import "./NavBar.css";
import SearchBar from "../SearchBar/SearchBar";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const rightLink = {
  fontSize: 16,
  color: "black",
  ml: 1,
  "&:hover": { color: "gray" },
};

const leftLink = {
  fontSize: 24,
  color: "black",
  ml: 2,
  "&:hover": { color: "gray" },
};
function NavBar() {
  const location = useLocation();
  const excludePaths = ["/admin"];

  if (excludePaths.includes(location.pathname)) {
    return null;
  }
  return (
    <div>
      <AppBar sx={{ top: "35px", display: "flex", bgcolor: "white" }}>
        <Toolbar sx={{ justifyContent: "space-around" }}>
          <Box sx={{ flex: -3 }} />
          <Box component="a" href="/" sx={{ top: "2px" }}>
            <img
              id="logo"
              src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
              alt="Iphone"
            />
          </Box>
          <Link to="/">
            <Typography color="inherit" variant="h6" sx={leftLink}>
              {"Iphone Case Oberá"}
            </Typography>
          </Link>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <SearchBar />
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Link to="/accesorios">
              <Typography color="inherit" variant="h6" sx={rightLink}>
                {"Accesorios "}
              </Typography>
            </Link>
            <NavDropdown id="navbarScrollingDropdown">
              <NavDropdown.Item className="dropDown">
                <Link to="/fundas">Fundas</Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="dropDown">
                <Link to="/glass">Glass</Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="dropDown">
                <Link to="/charger">Energia/Cables </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <Divider orientation="vertical" flexItem />
            <Link to="/Iphone">
              <Typography color="gray" variant="h6" sx={rightLink}>
                {"Iphone "}
              </Typography>
            </Link>
            <Divider orientation="vertical" flexItem />

            <Link to="/airpods">
              <Typography color="inherit" variant="h6" sx={rightLink}>
                {"AirPods "}
              </Typography>
            </Link>

            <Divider orientation="vertical" flexItem />
            <Link to="/watch">
              <Typography color="inherit" variant="h6" sx={rightLink}>
                {"Watch"}
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default NavBar;
