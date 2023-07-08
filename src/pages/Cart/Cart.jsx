import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getValues, deleteCartItem } from "../../redux/actions";
import EmptyCart from "../empty/emptyCart";
import { Box, Grid, Typography, Button } from "@mui/material";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import LocalAtmTwoToneIcon from "@mui/icons-material/LocalAtmTwoTone";
import BackButton from "../Button/Back";

export default function Cart() {
  const user = useSelector((state) => state.checkUser);
  const carro = useSelector((state) => state.checkUser.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);

  const handleDeleteCartItem = (itemId) => {
    const userId = user._id;
    dispatch(deleteCartItem(userId, itemId));
  };

  if (!carro || carro.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <br />
      <BackButton />
      <Typography variant="h1" align="center" id="centering">
        Tu Carrito está listo!!
      </Typography>
      <Typography variant="h2" className="h2" align="center">
        Accede a tu compra!
      </Typography>
      <br />
      <Grid container spacing={2}>
        <br />
        {carro.map((item) => (
          <Grid item xs={12} md={6} lg={4} key={item._id}>
            <div id="delButton">
              <button onClick={() => handleDeleteCartItem(item._id)}>
                <RemoveCircleTwoToneIcon />
              </button>
            </div>
            <div id="smallCard">
              <Link className="noShadow" to={"/detalle/" + item?.product}>
                <div id="centering">
                  <img
                    id="favImg"
                    src={item.image}
                    loading="lazy"
                    alt={item.name}
                  />
                </div>
                <div id="centering">
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography variant="h5">${item.price}</Typography>
                  <Typography variant="h5">{item.color}</Typography>
                </div>
                <br />
              </Link>
            </div>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: "center", marginTop: "20px" }}>
        {user ? (
          <Button
            size="large"
            variant="contained"
            color="primary"
            component={Link}
            to="/payment"
            startIcon={<LocalAtmTwoToneIcon />}
          >
            Comprar
          </Button>
        ) : (
          <div className="userexistb">
            <Button
              size="large"
              variant="contained"
              color="primary"
              disabled
              startIcon={<LocalAtmTwoToneIcon />}
            >
              Comprar
            </Button>
            <Typography variant="body2" color="text.secondary">
              *Debe estar logueado para comprar
            </Typography>
          </div>
        )}
      </Box>
    </Box>
  );
}
