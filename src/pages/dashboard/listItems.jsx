import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import HandymanIcon from "@mui/icons-material/Handyman";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

export const mainListItems = (
  <React.Fragment>
    <Link to="/admin">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Administrador" />
      </ListItemButton>
    </Link>

    <Link to="/admin/allprods">
      <ListItemButton>
        <ListItemIcon>
          <SmartphoneIcon />
        </ListItemIcon>
        <ListItemText primary="Productos" />
      </ListItemButton>
    </Link>

    <Link to="/admin/allusers">
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItemButton>
    </Link>

    <Link to="/admin/values">
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Valores" />
      </ListItemButton>
    </Link>

    <Link to="/peticiones">
      <ListItemButton>
        <ListItemIcon>
          <HandymanIcon />
        </ListItemIcon>
        <ListItemText primary="Servicio tecnico" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Productos
    </ListSubheader>
    <Link to="/admin/create">
      <ListItemButton>
        <ListItemIcon>
          <CloudUploadIcon />
        </ListItemIcon>
        <ListItemText primary="Cargar productos" />
      </ListItemButton>
    </Link>

    <Link to="/delete">
      <ListItemButton>
        <ListItemIcon>
          <DeleteIcon />
        </ListItemIcon>
        <ListItemText primary="Borrar productos" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
