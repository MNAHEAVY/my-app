import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar() {
  // Hooks
  const location = useLocation();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [isActive, setIsActive] = useState(false); // Estado para la clase CSS

  // Save every change that occurs in the SearchBar
  function handleInputChange(e) {
    e.preventDefault();
    setNombre(e.target.value);
    setIsActive(e.target.value !== ""); // Actualiza el estado de isActive
  }

  // Send the content that is in the SearchBar
  function handleSubmit(e) {
    e.preventDefault();
    if (nombre) {
      navigate(`/?nombre=${nombre}`);
    }
  }

  return (
    <div className={`wrapper${isActive ? " active" : ""}`}>
      <form
        className={`search${isActive ? " active" : ""}`}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <button className="search">
          {" "}
          <span className="uil uil-search"></span>
        </button>
        <input
          placeholder="Buscar"
          type="text"
          value={nombre}
          nombre={"Nombre"}
          onChange={(e) => {
            handleInputChange(e);
          }}
        />
      </form>
    </div>
  );
}
