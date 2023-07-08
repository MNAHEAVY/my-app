import React from "react";

import "./Landing.css";

import Carrousel from "../Carousel/Carousel";
import Home from "../Home/Home";

export default function Landing() {
  return (
    <>
      <div>
        <div>
          <Carrousel />
        </div>
        <div id="centering">
          <iframe
            id="style"
            src="https://dolarhoy.com/i/cotizaciones/dolar-blue"
            frameborder="0"
          ></iframe>
        </div>
        <div>
          <Home />
        </div>

        <h3>Iphone case Oberá</h3>
      </div>
    </>
  );
}
