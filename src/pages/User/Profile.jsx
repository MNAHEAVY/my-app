import React from "react";
import { useEffect, useState } from "react";
import { getUser } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const dispatch = useDispatch();
  const email = user?.email;
  const usuario = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(email));
  }, [dispatch, email]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    isAuthenticated && (
      <div>
        <div style={{ backgroundColor: "#f5f5f5", padding: "20px" }}>
          <h1 style={{ color: "#333", fontSize: "36px", marginBottom: "10px" }}>
            Bienvenido {usuario.given_name}!
          </h1>
          <div>
            <h3
              style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}
            >
              Esta es tu informacion personal
            </h3>
          </div>
          <div>
            <h6
              style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}
            >
              Tus datos se encuentran protegidos
            </h6>
          </div>
          <img
            src={usuario.picture}
            alt={usuario.name}
            style={{ width: "100px", height: "100px", marginBottom: "10px" }}
          />
          <h2 style={{ color: "#333", fontSize: "24px", marginBottom: "10px" }}>
            Nombre: {usuario.name}
          </h2>
          <p style={{ color: "#666", fontSize: "16px", marginBottom: "20px" }}>
            Correo: {usuario.email}
          </p>
        </div>

        <div>
          <Accordion className="accordion">
            <Accordion.Item eventKey="0" className="accordion-item">
              <Accordion.Header>Dirección</Accordion.Header>
              <Accordion.Body>
                <h3 className="h5">
                  Estos datos vienen por defecto por favor actualice
                </h3>
                <strong>Pais</strong>
                <h2 className="h6">{usuario.address?.pais}</h2>
                <strong>Provincia</strong>
                <h2 className="h6">{usuario.address?.provincia}</h2>
                <strong>Ciudad</strong>
                <h2 className="h6">{usuario.address?.ciudad}</h2>
                <strong>Dirección</strong>
                <h2 className="h6">{usuario.address?.direccion}</h2>
                <strong>CP</strong>
                <h2 className="h6">{usuario.address?.codigo_postal}</h2>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div>
          <Accordion className="accordion">
            <Accordion.Item eventKey="1" className="accordion-item">
              <Accordion.Header>Metodo de pago</Accordion.Header>
              <Accordion.Body>
                <h3 className="h5">
                  Estos datos vienen por defecto, si lo desea puede agregar un
                  metodo de pago
                </h3>
                <p>
                  *Esto no es obligatorio, pero sirve en caso de compras
                  particulares
                </p>
                <strong>Tipo de Tarjeta</strong>
                <h2 className="h6">{usuario.payment?.cardType}</h2>
                <strong>Nombre que figura en la Tarjeta</strong>
                <h2 className="h6">{usuario.payment?.cardName}</h2>
                <strong>Numero de la tarjeta</strong>
                <h2 className="h6">{usuario.payment?.cardNumber}</h2>
                <strong>Vencimiento</strong>
                <h2 className="h6">{usuario.payment?.expDate}</h2>
                <strong>CVV</strong>
                <h2 className="h6">{usuario.payment?.CVV}</h2>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <br />
        <div id="centering">
          <Button className="btn btn-primary">
            <Link id="white" to={"/editaruser/" + usuario._id}>
              Editar Datos
              <EditIcon />
            </Link>
          </Button>
        </div>
        <br />
        <br />
      </div>
    )
  );
}
