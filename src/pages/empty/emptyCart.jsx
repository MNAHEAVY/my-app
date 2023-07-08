import { Link } from "react-router-dom";
import "./empC.css";

export default function EmptyCart() {
  return (
    <div className="div">
      <h1 className="h1">Carrito de compras vacio!</h1>
      <img
        className="imgC"
        src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1678196220/IPHONECASEOBERA/cart_oveesx.png"
      ></img>
      <Link className="notFoundLink" to="/">
        Volver al <span className="span">Inicio</span>
      </Link>
    </div>
  );
}
