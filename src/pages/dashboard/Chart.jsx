import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllUsers } from "../../redux/actions";
import Title from "./Title";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
// Generate Sales Data

export default function Chart() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch(); // add this line to get the dispatch function

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const lastFiveUser = users.slice(-2);
  return (
    <React.Fragment>
      <Title>Ultimos Usuarios</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Imagen</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Baneado</TableCell>
            <TableCell>Nickname</TableCell>
            <TableCell align="right">Compras</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lastFiveUser.map((row) => (
            <TableRow key={row._id}>
              <TableCell>
                <img
                  style={{ height: "45px", width: "auto" }}
                  src={row.picture}
                ></img>
              </TableCell>
              <TableCell>
                {row.name}
                {" | "}

                <Link to="./edituser">
                  <EditIcon />
                </Link>
              </TableCell>
              <TableCell>{row._id}</TableCell>
              <TableCell>{row.isBanned ? "Si" : "No"}</TableCell>
              <TableCell>{row.nickname}</TableCell>
              <TableCell align="right">
                {row.purchase_order.products.length}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link to="/admin/allusers">Ver Todos</Link>
    </React.Fragment>
  );
}
