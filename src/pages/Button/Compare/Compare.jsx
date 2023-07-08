import * as React from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
//import { createContact } from '../../redux/actions'
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Tooltip from "@mui/material/Tooltip";

export default function Compare() {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    subject: "",
    name: "",
    email: "",
    message: "",
  });
  const [tooltip1Open, setTooltip1Open] = React.useState(false);
  const handleTooltip1Open = () => {
    setTooltip1Open(true);
  };

  const handleTooltip1Close = () => {
    setTooltip1Open(false);
  };

  const [Edited, setEdited] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setEdited(false);
  };
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createContact(input));
    setInput({
      subject: "",
      name: "",
      email: "",
      message: "",
    });
    setEdited(true);
  }

  return (
    <div id="background">
      <div id="contenedor-backr-refresh">
        <Tooltip
          id="tooltip1"
          title="Volver al inicio"
          placement="right"
          open={tooltip1Open}
          onClose={handleTooltip1Close}
          onOpen={handleTooltip1Open}
        >
          <Link
            id="back-button"
            to="/"
            onMouseEnter={handleTooltip1Open}
            onMouseLeave={handleTooltip1Close}
          >
            <ArrowBackIosIcon color="black" />
          </Link>
        </Tooltip>
      </div>

      <div id="centering">
        <h2>Si tiene dudas, infórmenos.</h2>
      </div>
      <div className="FormDiv">
        <form className="LogInForm">
          <label className="FormLabel">Asunto</label>
          <select
            className="FormInput"
            type="text"
            name="subject"
            value={input.subject}
            onChange={(e) => handleChange(e)}
          >
            <option>Aplique uno</option>
            <option value="product" defaultValue>
              Productos
            </option>
            <option value="service">Servicios</option>
            <option value="other">Otros</option>
          </select>
          <input
            className="FormInput"
            value={input.name}
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Tu nombre"
            name="name"
            required
          />
          <input
            className="FormInput"
            value={input.email}
            onChange={(e) => handleChange(e)}
            type="email"
            placeholder="Tu correo"
            name="email"
            required
          />
          <label className="FormLabel">Mensaje</label>
          <textarea
            className="FormInput FormTextArea"
            type="textarea"
            name="message"
            value={input.message}
            onChange={(e) => handleChange(e)}
            cols="30"
            rows="10"
          ></textarea>
          <button className="SubmitBtn" type="submit" onClick={handleSubmit}>
            Enviar
          </button>
        </form>
        <Snackbar open={Edited} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={() => handleClose()}
            severity="success"
            sx={{ width: "100%" }}
          >
            <AlertTitle>Enviar</AlertTitle>
            <strong>Tu mensaje fue enviado, pronto te contactaremos</strong>
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
}
