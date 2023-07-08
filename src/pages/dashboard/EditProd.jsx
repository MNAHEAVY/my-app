import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, putProd } from "../../redux/actions";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function ProdEdit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [input, setInput] = useState({
    categorias: "",
    subCategoria: "",
    nombre: "",
    marca: "",
    descripcion: "",
    imagenGeneral: "",
    stockGeneral: 0,
    estado: "",
    precioBase: 0,
    disponible: "",
    tipo: "",
    color: [],
    almacenamiento: [],
    modelo: [],
  });

  const prodEd = useSelector((state) => state.products);
  const thisProd = prodEd.find((e) => e._id === id);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    setInput({
      categorias: thisProd.categorias || "",
      subCategoria: thisProd.subCategoria || "",
      nombre: thisProd.nombre || "",
      marca: thisProd.marca || "",
      descripcion: thisProd.descripcion || "",
      imagenGeneral: thisProd.imagenGeneral || "",
      stockGeneral: thisProd.stockGeneral || 0,
      estado: thisProd.estado || "",
      precioBase: thisProd.precioBase || 0,
      disponible: thisProd.disponible || "",
      tipo: thisProd.tipo || "",
      color: thisProd.color || [],
      almacenamiento: thisProd.almacenamiento || [],
      modelo: thisProd.modelo || [],
    });
  }, [thisProd]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await dispatch(putProd(id, input));
      // Mostrar un mensaje de éxito al usuario
      alert("Producto actualizado exitosamente");
    } catch (error) {
      // Mostrar un mensaje de error al usuario
      alert("Hubo un error al actualizar el producto");
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  //manejadores del color
  const handleImageUploadColor = (index, e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bvtkpxxl");

    axios
      .post("https://api.cloudinary.com/v1_1/deqxuoyrc/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        handleColorChangeB(index, "imageColor", imageUrl);
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };
  const handleColorChangeB = (index, name, value) => {
    const newColor = [...input.color];
    newColor[index][name] = value;
    setInput({ ...input, color: newColor });
  };

  function handleColorChange(e, index) {
    const updatedColors = [...input.color];
    updatedColors[index][e.target.name] = e.target.value;

    setInput({
      ...input,
      color: updatedColors,
    });
  }
  function handleRemoveColor(index) {
    const updatedColors = [...input.color];
    updatedColors.splice(index, 1);
    setInput({
      ...input,
      color: updatedColors,
    });
  }
  function handleAddColor() {
    setInput({
      ...input,
      color: [
        ...input.color,
        { nombre: "", imageColor: "", stockColor: 0, estado: "" },
      ],
    });
  }

  //manejadores del color
  //manejadores del model
  const handleImageUploadModel = (index, e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "bvtkpxxl");

    axios
      .post("https://api.cloudinary.com/v1_1/deqxuoyrc/upload", formData)
      .then((response) => {
        const imageUrl = response.data.secure_url;
        handleModelChangeB(index, "imageModel", imageUrl);
      })
      .catch((error) => {
        console.error("Error uploading image", error);
      });
  };
  const handleModelChangeB = (index, name, value) => {
    const newmodel = [...input.modelo];
    newmodel[index][name] = value;
    setInput({ ...input, modelo: newmodel });
  };

  function handleModelChange(e, index) {
    const updatedmodels = [...input.modelo];
    updatedmodels[index][e.target.name] = e.target.value;

    setInput({
      ...input,
      modelo: updatedmodels,
    });
  }
  function handleRemoveModel(index) {
    const updatedmodels = [...input.modelo];
    updatedmodels.splice(index, 1);
    setInput({
      ...input,
      modelo: updatedmodels,
    });
  }
  function handleAddModel() {
    setInput({
      ...input,
      modelo: [
        ...input.modelo,
        { nombre: "", precio: 0, imageModel: "", stockModel: 0, estado: "" },
      ],
    });
  }

  //manejadores del model
  //manejadores del storage
  function handleAlmacenamientoChange(e, index) {
    const updatedAlmacenamientos = [...input.almacenamiento];
    updatedAlmacenamientos[index][e.target.name] = e.target.value;

    setInput({
      ...input,
      almacenamiento: updatedAlmacenamientos,
    });
  }
  function handleRemoveAlmacenamiento(index) {
    const updatedAlmacenamientos = [...input.almacenamiento];
    updatedAlmacenamientos.splice(index, 1);
    setInput({
      ...input,
      almacenamiento: updatedAlmacenamientos,
    });
  }
  function handleAddAlmacenamiento() {
    setInput({
      ...input,
      almacenamiento: [
        ...input.almacenamiento,
        {
          capacidad: "",
          precio: 0,
          stockStorage: 0,
          disponible: false,
          estado: "",
        },
      ],
    });
  }
  //manejadores del storage
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">SUPER ADMIN PRODUCTS EDITION V-4.0</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <h3 className="text-center">Editor de Productos</h3>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <label>*Categorias</label>
              <select
                className="form-control"
                value={input.categorias}
                name="linea"
                onChange={(e) => handleChange(e)}
              >
                <option>Seleccione</option>
                <option value={"Iphone"}>Iphone</option>
                <option value={"Accesorios"}>Accesorios</option>
                <option value={"Watch"}>Watch</option>
                <option value={"Airpods"}>Airpods</option>
                <option value={"Baterias"}>Baterias</option>
                <option value={"Modulos"}>Modulos</option>
                <option value={"Tapa trasera"}>Tapa trasera</option>
                <option value={"Camara"}>Camara</option>
                <option value={"Pin de carga"}>Pin de carga</option>
              </select>
            </div>
            <div className="form-group">
              <label>*Subcategoria</label>
              <select
                className="form-control"
                value={input.subCategoria}
                name="categorias"
                onChange={(e) => handleChange(e)}
              >
                <option>Seleccione</option>
                <option value={"Smartphone"}>Smartphone</option>
                <option value={"Fundas"}>Fundas</option>
                <option value={"Watch"}>Watch</option>
                <option value={"Glass"}>Glass</option>
                <option value={"Energia y Cables"}>Energia y Cables</option>
                <option value={"Correas"}>Energia y Cables</option>
                <option value={"Airpods"}>Airpods</option>
                <option value={"Servicio Tecnico"}>Servicio Tecnico</option>
              </select>
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                className="form-control"
                type="text"
                value={input.nombre}
                name="nombre"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Marca</label>
              <input
                className="form-control"
                type="text"
                value={input.marca}
                name="marca"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Descripcion</label>
              <textarea
                className="form-control"
                type="text"
                value={input.descripcion}
                name="descripcion"
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="form-group">
              <label>*Stock General</label>
              <input
                className="form-control"
                type="number"
                value={input.stockGeneral}
                name="stockGeneral"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select
                className="form-control"
                value={input.estado}
                name="estado"
                onChange={(e) => handleChange(e)}
              >
                <option>Seleccione</option>
                <option value={"Nuevo"}>Nuevo</option>
                <option value={"Swap"}>Swap</option>
                <option value={"Usado"}>Usado</option>
              </select>
            </div>
            <div className="form-group">
              <label>Precio</label>
              <input
                className="form-control"
                type="number"
                value={input.precioBase}
                name="precioBase"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
            <div className="form-group">
              <label>Disponible</label>
              <select
                className="form-control"
                value={input.disponible}
                name="disponible"
                onChange={(e) => handleChange(e)}
              >
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <input
                className="form-control"
                type="text"
                value={input.marca}
                name="marca"
                onChange={(e) => handleChange(e)}
              ></input>
            </div>
          </form>
        </div>
        <div>
          <br />
          <div className="kkkooo">
            <strong>Color/es</strong>
            <div className="container-color">
              {input.color.length > 0 ? (
                input.color.map((color, index) => (
                  <div className="card-f" key={index}>
                    <label className="form-label">Nombre</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      value={color.nombre}
                      onChange={(e) => handleColorChange(e, index)}
                    />
                    <label className="form-label"> Imagen </label>

                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleImageUploadColor(index, e)}
                    />
                    {color.imageColor && (
                      <div className="mt-2">
                        <img
                          src={color.imageColor}
                          alt="Uploaded"
                          className="img-thumbnail"
                        />
                      </div>
                    )}

                    <label className="form-label">Stock </label>
                    <input
                      className="form-control"
                      type="number"
                      name="stockColor"
                      value={color.stockColor}
                      onChange={(e) => handleColorChange(e, index)}
                    />
                    <label className="form-label"> Estado </label>
                    <select
                      className="form-control"
                      name="estado"
                      value={color.estado}
                      onChange={(e) => handleColorChange(e, index)}
                    >
                      <option>Seleccione</option>
                      <option value="Nuevo">Nuevo</option>
                      <option value="Swap">Swap</option>
                      <option value="Usado">Usado</option>
                    </select>
                    <button
                      class="btn btn-danger"
                      onClick={() => handleRemoveColor(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay colores disponibles</p>
              )}
            </div>
            <br />
            <button class="btn btn-primary" onClick={handleAddColor}>
              Agregar Color
            </button>
          </div>
          <br />
          <div className="kkkooo">
            <strong>Modelo/s</strong>
            <div
              style={{ height: "40rem", maxWidth: "120vh", overflowX: "auto" }}
              className="container-color"
            >
              {input.modelo.length > 0 ? (
                input.modelo.map((model, index) => (
                  <div
                    className="card-f"
                    style={{ width: "120px" }}
                    key={index}
                  >
                    <label className="form-label">Nombre</label>
                    <input
                      className="form-control"
                      type="text"
                      name="nombre"
                      value={model.nombre}
                      onChange={(e) => handleModelChange(e, index)}
                    />
                    <label className="form-label"> Precio</label>

                    <input
                      className="form-control"
                      type="number"
                      name="precio"
                      value={model.precio}
                      onChange={(e) => handleModelChange(e, index)}
                    />
                    <label className="form-label">Stock </label>
                    <input
                      className="form-control"
                      type="number"
                      name="stockModel"
                      value={model.stockModel}
                      onChange={(e) => handleModelChange(e, index)}
                    />
                    <label>Disponible</label>
                    <select
                      className="form-control"
                      value={model.disponible}
                      name="disponible"
                      onChange={(e) => handleModelChange(e, index)}
                    >
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>

                    <label className="form-label"> Imagen </label>

                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => handleImageUploadModel(index, e)}
                    />
                    {model.imageModel && (
                      <div className="mt-2">
                        <img
                          src={model.imageModel}
                          alt="Uploaded"
                          className="img-thumbnail"
                        />
                      </div>
                    )}

                    <button
                      class="btn btn-danger"
                      onClick={() => handleRemoveModel(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay modelos disponibles</p>
              )}
            </div>
            <br />
            <button class="btn btn-primary" onClick={handleAddModel}>
              Agregar Modelo
            </button>
          </div>
          <br />
          <div className="kkkooo">
            <strong>Almacenamiento/s</strong>
            <div className="container-color">
              {input.almacenamiento.length > 0 ? (
                input.almacenamiento.map((almacenamiento, index) => (
                  <div className="card-f" key={index}>
                    <label className="form-label">Capacidad</label>

                    <select
                      className="form-control"
                      type="text"
                      name="capacidad"
                      value={almacenamiento.capacidad}
                      onChange={(e) => handleAlmacenamientoChange(e, index)}
                    >
                      <option>Seleccione</option>
                      <option value="64 GB">64GB</option>
                      <option value="128 GB">128GB</option>
                      <option value="256 GB">256GB</option>
                      <option value="512 GB">512GB</option>
                      <option value="1024 GB">1024GB</option>
                    </select>

                    <label className="form-label"> Precio</label>

                    <input
                      className="form-control"
                      type="number"
                      name="precio"
                      value={almacenamiento.precio}
                      onChange={(e) => handleAlmacenamientoChange(e, index)}
                    />
                    <label className="form-label">Stock </label>
                    <input
                      className="form-control"
                      type="number"
                      name="stockStorage"
                      value={almacenamiento.stockStorage}
                      onChange={(e) => handleAlmacenamientoChange(e, index)}
                    />
                    <label>Disponible</label>
                    <select
                      className="form-control"
                      value={almacenamiento.disponible}
                      name="disponible"
                      onChange={(e) => handleAlmacenamientoChange(e, index)}
                    >
                      <option value={true}>Si</option>
                      <option value={false}>No</option>
                    </select>

                    <label className="form-label"> Estado </label>
                    <select
                      className="form-control"
                      name="estado"
                      value={almacenamiento.estado}
                      onChange={(e) => handleAlmacenamientoChange(e, index)}
                    >
                      <option>Seleccione</option>
                      <option value="Nuevo">Nuevo</option>
                      <option value="Swap">Swap</option>
                      <option value="Usado">Usado</option>
                    </select>

                    <button
                      class="btn btn-danger"
                      onClick={() => handleRemoveAlmacenamiento(index)}
                    >
                      Eliminar
                    </button>
                  </div>
                ))
              ) : (
                <p>No hay almacenamientos disponibles</p>
              )}
            </div>
            <br />
            <button class="btn btn-primary" onClick={handleAddAlmacenamiento}>
              Agregar almacenamiento
            </button>
          </div>
          <br />
          <div id="centeringSideB">
            <button
              className="btn btn-outline-success me-2"
              type="submit"
              onClick={handleSubmit}
            >
              Modificar
            </button>
            <button className="btn btn-outline-success me-2">
              <Link to={"/admin"}>Cancelar</Link>
            </button>
          </div>

          <br />
          <br />
        </div>
      </div>
    </div>
  );
}
