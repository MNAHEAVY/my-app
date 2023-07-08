import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getAllProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import Title from "./Title";

export default function LastProducts() {
  // Generate Order Data
  const prod = useSelector((state) => state.products);
  const dispatch = useDispatch(); // add this line to get the dispatch function

  useEffect(() => {
    dispatch(getAllProducts()); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  const lastfive = prod.slice(-5);

  return (
    <React.Fragment>
      <Title>Ultimos Productos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Disponible</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell align="right">Precio</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastfive.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <img
                  style={{ height: "80px", width: "auto" }}
                  src={row.imagenGeneral[0]}
                ></img>
              </TableCell>
              <TableCell>
                {row.nombre}
                {" | "}

                <Link to={"/edit/" + row._id}>
                  <EditIcon />
                </Link>
              </TableCell>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.disponible ? "Si" : "No"}</TableCell>
              <TableCell>{row.stockGeneral}</TableCell>
              <TableCell align="right">{`$${row.precioBase}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/admin/allprods">Ver Todos</Link>
    </React.Fragment>
  );
}
