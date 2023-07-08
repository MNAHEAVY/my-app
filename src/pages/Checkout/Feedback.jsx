import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Carousel from "react-bootstrap/Carousel";

export default function Feedback() {
  return (
    <React.Fragment>
      <Typography variant="h3" gutterBottom>
        Gracias por tu compra
      </Typography>

      <Carousel className="containerCarousel2" variant="dark">
        <img
          className="imageCarousel2"
          src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1681659356/IPHONECASEOBERA/background_khw6hk.png"
          alt="First slide"
          onClick={() => navigate("/detail/6318c6acce607c902c86dd24")}
        />
      </Carousel>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
            {" "}
            Nuestro equipo se pondra en contacto contigo a la brevedad
          </Typography>
          <Grid>
            <Typography gutterBottom>Iphone Case Obera</Typography>
            <img src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"></img>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
    </React.Fragment>
  );
}
