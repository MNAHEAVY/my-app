import { Link } from "react-router-dom";
import "./empC.css";
export default function EmptyShopH() {
  return (
    <div className="div">
      <h1 className="h1">The Shopping history is empty!</h1>
      <img
        className="imgC"
        src="https://res.cloudinary.com/deqxuoyrc/image/upload/v1678196220/IPHONECASEOBERA/cart_oveesx.png"
      ></img>
      <Link className="notFoundLink" to="/">
        Back to <span className="span">Homepage</span>
      </Link>
    </div>
  );
}
