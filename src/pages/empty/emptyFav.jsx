import { Link } from "react-router-dom";
import "./empC.css";

export default function EmptyFav() {
  return (
    <div className="div">
      <h1 className="h1">No hay Favoritos!</h1>
      <img
        className="imgC"
        src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1678196220/IPHONECASEOBERA/Fav_fkh4vu.png"
      ></img>
      <Link className="notFoundLink" to="/">
        Volver al <span className="span">Inicio</span>
      </Link>
    </div>
  );
}
