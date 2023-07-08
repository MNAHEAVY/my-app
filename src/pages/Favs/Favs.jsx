import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyFav from "../empty/emptyFav";
import { Box, Grid } from "@mui/material";
import "./Favs.css";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import BackButton from "../Button/Back";

export default function Favorites() {
  const [favProducts, setFavProducts] = useState(
    JSON.parse(localStorage.getItem("favList"))
  );

  const prodFavs = favProducts;
  console.log(prodFavs);

  const deleteFav = (id) => {
    let arr = favProducts.filter((prod) => prod._id !== id);
    localStorage.setItem("favList", JSON.stringify(arr));
    setFavProducts(arr);
  };

  if (!favProducts || favProducts.length === 0) {
    return <EmptyFav />;
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <BackButton />
      <h1 id="centering">Todos tus Favoritos</h1>
      <h2 class="h2">Te estan esperando!</h2>
      <br />
      <Grid container sparcing={2}>
        <br />
        {prodFavs?.map((item) => (
          <Grid item xs={2}>
            <div id="delButton">
              <button onClick={() => deleteFav(item._id)}>
                <RemoveCircleTwoToneIcon />
              </button>
            </div>
            <div id="smallCard">
              <Link className="noShadow" to={"/detalle/" + item._id}>
                <div id="centering">
                  <img id="favImg" src={item.imagen[0]} loading="lazy" />
                </div>
                <div id="centering">
                  <h5>{item.nombre}</h5>
                  <h5>${(item.precio[0] * 380).toFixed(2)}</h5>
                  <h5>{item.marca}</h5>
                </div>

                <br />
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
