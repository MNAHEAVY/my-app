import { useState, useEffect } from "react";
import Pagination from "../../Pagination/Pagination";
import { Box, Grid } from "@mui/material";
import { getAllProducts, getValues } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
import FloatButton from "../../Button/FloatButton";
import "./Watch.css"; // Importa aquí el archivo CSS de tu componente
import BackButton from "../../Button/Back";

export default function Watch() {
  const [currentPage, setCurrentPage] = useState(1);
  const prod = useSelector((state) =>
    state.products.filter((product) => product.disponible === true)
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const values = useSelector((state) => state.values);

  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllProducts()).then(() => setLoading(false));
  }, [dispatch]);

  const iph = prod.filter((cat) => cat.categorias == "Watch");

  let idxLastItem = currentPage * 6;
  let ixdFirstItem = idxLastItem - 6;
  let pageProd = iph.slice(ixdFirstItem, idxLastItem);
  const paginate = (number) => {
    setCurrentPage(number);
  };
  const refreshPage = () => {
    setCurrentPage(1);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <br></br>

        <BackButton refreshPage={refreshPage} />
        <h1 id="centering">El compañero perfecto para una vida activa</h1>

        <h2 class="h2">Watch</h2>
        {loading ? (
          <Loading />
        ) : (
          <Grid container sparcing={2}>
            {pageProd.map((item) => (
              <Grid item xs={12} sm={6} md={4}>
                {" "}
                {/* Establece los valores de las columnas según el tamaño de pantalla */}
                <Link className="noShadow" to={"/detalle/" + item._id}>
                  <div id="centering">
                    <img
                      id="imgDetail"
                      src={item.imagenGeneral[0]}
                      loading="lazy"
                    />
                  </div>
                  <br />
                  <div id="centering">
                    <h6>{item.nombre}</h6>
                    <h6>${(item.precioBase * values.dolarBlue).toFixed(2)}</h6>
                    <h6>{item.marca}</h6>
                    <br />
                  </div>
                </Link>
              </Grid>
            ))}
          </Grid>
        )}
        <Pagination
          currentPage={currentPage}
          postPerPage={6}
          totalPosts={iph.length}
          paginate={paginate}
        />
        <FloatButton />
      </Box>
      <br />
      <br />
    </div>
  );
}
