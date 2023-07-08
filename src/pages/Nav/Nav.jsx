import * as React from "react";
import "./Nav.css";
import a from "../../assets/apple.png";
import { GrFavorite } from "react-icons/gr";
import { MdOutlineShoppingCart } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import LoginButton from "../Sign/Login";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../Sign/Logout";
import { NavDropdown } from "react-bootstrap";
import { AiOutlinePoweroff } from "react-icons/ai";
import { useSelector } from "react-redux";

export default function Nav() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();
  const excludePaths = ["/admin"];
  const userCheck = useSelector((state) => state.checkUser);

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <div id="pepe">
      <span>
        {userCheck && userCheck.isAdmin === true ? (
          <Link to="/admin">
            <img id="imgtwo" src={a} alt="Admin link"></img>
          </Link>
        ) : (
          <Link to="https://www.apple.com/">
            <img id="imgtwo" src={a} alt="Link alternativo"></img>
          </Link>
        )}
      </span>

      <span id="buttons">
        <Link to="/favoritos">
          <GrFavorite top="0px" size="2rem" color="black" />
        </Link>

        {isAuthenticated ? (
          <>
            <img
              className="ProfileImg"
              src={user.picture}
              alt="user"
              referrerPolicy="no-referrer"
            ></img>
            <NavDropdown id="navbarScrollingDropdown">
              <NavDropdown.Item z-index="3000" className="dropDown">
                <Link to="/miperfil">Mis Datos</Link>
              </NavDropdown.Item>
              <NavDropdown.Item className="dropDown">
                <Link to="/misprods">Mis Productos</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" className="dropDown">
                <LogoutButton />
                <AiOutlinePoweroff />
              </NavDropdown.Item>
            </NavDropdown>
          </>
        ) : (
          !isLoading && (
            <a>
              <LoginButton />
            </a>
          )
        )}

        <Link to="/cart">
          <MdOutlineShoppingCart size="2rem" color="black" />
        </Link>
      </span>
    </div>
  );
}
