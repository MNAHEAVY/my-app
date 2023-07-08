import * as React from "react";
import "./Footer.css";
import { HiMail } from "react-icons/hi";
import { BsWhatsapp } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const excludePaths = ["/admin"];

  if (excludePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="nav">
      <span id="dev">
        <Link to="/terminos" color="inherit" text-decoration="none">
          Terminos |
        </Link>{" "}
        {"© "}
        <Link to="https://github.com/MNAHEAVY" color="inherit">
          MnaDev
        </Link>{" "}
        {new Date().getFullYear()}
      </span>
      <div className="links ik">
        <a id="i" href="mailto:davidalexanderh21@gmail.com">
          <HiMail />
        </a>
        <a id="i" href="https://wa.me/5493755611592">
          <BsWhatsapp />
        </a>
        <a id="i" href="https://www.instagram.com/iphonecaseobera/">
          <BsInstagram />
        </a>
      </div>
    </nav>
  );
}
