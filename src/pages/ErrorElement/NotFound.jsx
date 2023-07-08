import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <>
      <div className="div">
        <div>
          <h1 className="h1">Página en progreso o no disponible</h1>
        </div>
        <div>
          <img
            className="imga"
            src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1678159177/IPHONECASEOBERA/notFound1_o8xpce.png"
          ></img>
        </div>
        <div className="centering">
          <Link className="notFoundLink" to="/">
            Volver al <span className="span">Inicio</span>
          </Link>
        </div>
      </div>
    </>
  );
}
