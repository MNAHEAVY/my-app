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
import Loading from "../Loading/Loading";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
export default function AllProducts() {
  // Generate Order Data
  const prod = useSelector((state) => state.products);
  const dispatch = useDispatch(); // add this line to get the dispatch function
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getAllProducts()).then(() => setLoading(false)); // call dispatch as a function and set loading to false when done
  }, [dispatch]);

  return (
    <>
      <br />
      <span id="arrowBack">
        <Link to="/admin">
          <ArrowBackIosIcon />
        </Link>
      </span>
      <div id="centering">
        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <React.Fragment>
            <br />
            <h2>Todos los productos</h2>
            <div id="angost">
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
                  {prod.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        <img
                          src={row.imagenGeneral?.[0]}
                          style={{ height: "60px", width: "auto" }}
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
                      <TableCell>{row.stockGenearl}</TableCell>
                      <TableCell align="right">{`$${row.precioBase}`}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <br />
            <Link to="/admin">Volver al Panel</Link>
          </React.Fragment>
        )}
      </div>
    </>
  );
}
