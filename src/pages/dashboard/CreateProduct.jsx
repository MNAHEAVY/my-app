import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState, useCallback } from "react";
import { createProd, getValues } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

export default function CreateProduct() {
  const dispatch = useDispatch();
  const [price, setPrice] = useState(0);
  const [dolar, setDolar] = useState(1);
  const values = useSelector((state) => state.values);
  const [selectedImage, setSelectedImage] = useState(null);
  const [calculadora, setCalculadora] = useState(0);
  const [descripcionCorta, setDescripcionCorta] = useState("");

  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);

  const [inputForm, setInputForm] = useState({
    categorias: "",
    subCategoria: "",
    nombre: "",
    marca: "",
    descripcion: "",
    imagenGeneral: [],
    stockGeneral: 0,
    estado: "",
    precioBase: 0,
    disponible: false,
    tipo: "",
    color: [{ nombre: "", imageColor: "", stockColor: 0, estado: "" }],
    almacenamiento: [],
    modelo: [],
  });
  console.log(inputForm);

  function handleChange(e) {
    setInputForm({
      ...inputForm,
      [e.target.name]: e.target.value,
    });
  }

  const handleImageUpload = async (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "bvtkpxxl");

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/deqxuoyrc/image/upload`,
      formData
    );

    setSelectedImage(res.data.secure_url);
  };

  const addImageToProduct = () => {
    if (selectedImage) {
      setInputForm({
        ...inputForm,
        imagenGeneral: [...inputForm.imagenGeneral, selectedImage],
      });

      setSelectedImage(null);
    }
  };

  const handleImageUploadModel = (index, event) => {
    const file = event.target.files[0];
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

  const handleImageUploadColor = (index, event) => {
    const file = event.target.files[0];
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
  /*manejadores del precio calculo*/
  function updatePriceFinal(priceInitial, dolarValue) {
    if (priceInitial === "") {
      setCalculadora(0);
    } else {
      const final =
        priceInitial * dolarValue +
        values.flete +
        values.packagingSimple +
        values.costoGeneral;
      const finalB = ((final * values.profit) / values.dolarBlue).toFixed(2);
      setCalculadora(finalB);
    }
  }

  const uploadCalculo = useCallback(
    async (e) => {
      const priceInitial = e.target.value;
      if (isNaN(priceInitial)) {
        alert("Por favor, ingrese un número válido");
        return;
      }
      updatePriceFinal(priceInitial, dolar);
    },
    [dolar]
  );

  /*manejadores del precio calculo*/
  /*manejadores del precio base*/
  function updatePriceAndDolar(priceValue, dolarValue) {
    const aux =
      priceValue * dolarValue +
      values.flete +
      values.packagingSimple +
      values.costoGeneral;
    setPrice(priceValue);
    setDolar(dolarValue);
    const auxB = ((aux * values.profit) / values.dolarBlue).toFixed(2);
    setInputForm({
      ...inputForm,
      precioBase: auxB,
    });
  }

  const uploadPrice = async (e) => {
    const priceValue = e.target.value;
    updatePriceAndDolar(priceValue, dolar);
  };

  const uploadDolar = async (e) => {
    const dolarValue = e.target.value;
    updatePriceAndDolar(price, dolarValue);
  };
  /*manejadores del precio base*/

  /*manejadores de color*/
  const handleColorChangeB = (index, name, value) => {
    const newColor = [...inputForm.color];
    newColor[index][name] = value;
    setInputForm({ ...inputForm, color: newColor });
  };

  const handleColorChange = (index, event) => {
    const newColor = [...inputForm.color];
    newColor[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, color: newColor });
  };

  const addColor = () => {
    setInputForm({
      ...inputForm,
      color: [
        ...inputForm.color,
        { nombre: "", imageColor: "", stockColor: 0, estado: "" },
      ],
    });
  };

  const removeColor = (index) => {
    const newColor = [...inputForm.color];
    newColor.splice(index, 1);
    setInputForm({ ...inputForm, color: newColor });
  };

  /*manejadores de color*/

  /*manejadores de modelo*/
  const handleModelChange = (index, event) => {
    const newModel = [...inputForm.modelo];
    newModel[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, modelo: newModel });
  };

  const handleModelChangeB = (index, name, value) => {
    const newModel = [...inputForm.modelo];
    newModel[index][name] = value;
    setInputForm({ ...inputForm, modelo: newModel });
  };
  const addModel = () => {
    setInputForm({
      ...inputForm,
      modelo: [
        ...inputForm.modelo,
        {
          nombre: "",
          precio: 0,
          stockModel: 0,
          disponible: false,
          imageModel: "",
        },
      ],
    });
  };

  const removeModel = (index) => {
    const newModel = [...inputForm.modelo];
    newModel.splice(index, 1);
    setInputForm({ ...inputForm, modelo: newModel });
  };

  /*manejadores de modelo*/
  /*manejadores de alamcenamiento*/
  const handleStorageChange = (index, event) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage[index][event.target.name] = event.target.value;
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };
  const handleStorageChangeB = (index, name, value) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage[index][name] = value;
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };
  const addStorage = () => {
    setInputForm({
      ...inputForm,
      almacenamiento: [
        ...inputForm.almacenamiento,
        {
          capacidad: "",
          precio: 0,
          stockStorage: 0,
          disponible: false,
          estado: "",
        },
      ],
    });
  };

  const removeStorage = (index) => {
    const newStorage = [...inputForm.almacenamiento];
    newStorage.splice(index, 1);
    setInputForm({ ...inputForm, almacenamiento: newStorage });
  };

  /*manejadores de alamcenamiento*/

  //descripcion
  useEffect(() => {
    const textoRecortado =
      inputForm.descripcion.length > 10
        ? inputForm.descripcion.substr(0, 10) + "..."
        : inputForm.descripcion;

    setDescripcionCorta(textoRecortado);
  }, [inputForm.descripcion]);

  console.log(descripcionCorta);
  //descripcion

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(createProd(inputForm));
    setInputForm({
      categorias: "",
      subCategoria: "",
      nombre: "",
      marca: "",
      descripcion: "",
      imagenGeneral: [],
      stockGeneral: 0,
      estado: "",
      precioBase: 0,
      disponible: false,
      tipo: "",
      color: [{ nombre: "", imageColor: "", stockColor: 0, estado: "" }],
      almacenamiento: [],
      modelo: [],
    });
  }

  return (
    <div className="container-total-form">
      <div className="containerB">
        <h2>Agregar producto Nuevo</h2>
      </div>
      <div className="container-subtotal-form">
        <div
          className="container-left"
          style={{ maxHeight: "70vh", overflowY: "auto" }}
        >
          <Form
            id="formCreate"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>*Categorias</Form.Label>
              <Form.Select name="categorias" onChange={(e) => handleChange(e)}>
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
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>*Subcategoria</Form.Label>
              <Form.Select
                name="subCategoria"
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
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>*Nombre</Form.Label>
              <Form.Control
                type="text"
                value={inputForm.nombre}
                name="nombre"
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder="ej. iPhone 13"
              />
              <Form.Text className="text-muted">
                Nombre completo del producto.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>*Marca</Form.Label>
              <Form.Control
                type="text"
                value={inputForm.marca}
                name="marca"
                onChange={(e) => handleChange(e)}
                placeholder="ej. Apple"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={inputForm.descripcion}
                name="descripcion"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
            <div className="mb-3">
              <label htmlFor="formFile" className="form-label">
                *Subir imagen
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={handleImageUpload}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary mb-3"
              onClick={addImageToProduct}
            >
              Agregar imagen al producto
            </button>
            <div className="color-content">
              {inputForm.imagenGeneral.map((imgUrl, index) => (
                <img
                  key={index}
                  src={imgUrl}
                  alt="Uploaded"
                  className="img-thumbnail"
                />
              ))}
            </div>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>*Stock General</Form.Label>
              <Form.Control
                value={inputForm.stockGeneral}
                name="stockGeneral"
                onChange={(e) => handleChange(e)}
                type="number"
                placeholder="5"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>*Estado</Form.Label>
              <Form.Select
                value={inputForm.estado}
                name="estado"
                onChange={(e) => handleChange(e)}
              >
                <option>Seleccione</option>
                <option value={"Nuevo"}>Nuevo</option>
                <option value={"Swap"}>Swap</option>
                <option value={"Usado"}>Usado</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>*Tipo Dolar</Form.Label>
              <Form.Select
                value={inputForm.dolar}
                name="dolar"
                onChange={(e) => uploadDolar(e)}
              >
                <option>Seleccione</option>
                <option disabled>Seleccione</option>
                <option value={values.dolarBlue}>Blue</option>
                <option value={values.dolarOficial}>Oficial</option>
                <option value={values.dolarProvedor}>Proveedor</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>*Precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                onChange={(e) => uploadPrice(e)}
                placeholder="45"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>*Disponible</Form.Label>
              <Form.Select
                value={inputForm.disponible}
                name="disponible"
                onChange={(e) => handleChange(e)}
              >
                <option>Seleccione</option>
                <option value={true}>Si</option>
                <option value={false}>No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                value={inputForm.tipo}
                name="tipo"
                onChange={(e) => handleChange(e)}
                placeholder="Silicone"
              />
            </Form.Group>
            <br />
            <div>
              <strong className="centering">Seccion color del producto</strong>
              <p>*Detalle segun el titulo el color que quiere disponer</p>
            </div>
            <br />
            {inputForm.color.map((color, index) => (
              <div className="mb-3 d-flex flex-column" key={index}>
                <label className="form-label"> Nombre </label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  value={color.nombre}
                  onChange={(event) => handleColorChange(index, event)}
                />
                <label className="form-label"> Imagen </label>

                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => handleImageUploadColor(index, event)}
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
                  onChange={(event) => handleColorChange(index, event)}
                />
                <label className="form-label"> Estado </label>
                <select
                  className="form-control"
                  name="estado"
                  value={color.estado}
                  onChange={(event) => handleColorChange(index, event)}
                >
                  <option>Seleccione</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Swap">Swap</option>
                  <option value="Usado">Usado</option>
                </select>
                <br />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => removeColor(index)}
                >
                  Eliminar color
                </button>
              </div>
            ))}
            <button
              className="btn btn-success"
              type="button"
              onClick={addColor}
            >
              Añadir color
            </button>
            <div>
              <strong className="centering">Seccion modelo del producto</strong>
              <p>
                *En caso que el producto cuente con uno o varios modelos pulse
                anadir, de lo contrario omita.
              </p>
            </div>
            <br />
            {inputForm.modelo.map((model, index) => (
              <div className="mb-3 d-flex flex-column" key={index}>
                <label className="form-label"> Modelo </label>
                <select
                  className="form-control"
                  value={model.nombre}
                  name="nombre"
                  onChange={(event) => handleModelChange(index, event)}
                >
                  <option>Seleccione</option>
                  <option value="Generico">Generico</option>
                  <option value="14 Pro Max">14 Pro Max</option>
                  <option value="14 Pro">14 Pro</option>
                  <option value="14 Plus">14 Plus</option>
                  <option value="14">14</option>
                  <option value="13 Pro Max">13 Pro Max</option>
                  <option value="13 Pro">13 Pro</option>
                  <option value="13 Mini">13 Mini</option>
                  <option value="13">13</option>
                  <option value="12 Pro Max">12 Pro Max</option>
                  <option value="12 Pro">12 Pro</option>
                  <option value="12 Mini">12 Mini</option>
                  <option value="12">12</option>
                  <option value="11 Pro Max">11 Pro Max</option>
                  <option value="11 Pro">11 Pro</option>
                  <option value="11">11</option>
                  <option value="SE(3rd)">SE(3rd)</option>
                  <option value="SE(2rd)">SE(2rd)</option>
                  <option value="iPhone XS">iPhone-XS</option>
                  <option value="iPhone XS Max">iPhone-XS Max</option>
                  <option value="iPhone XR">iPhone-XR</option>
                  <option value="iPhone X">iPhone-X</option>
                  <option value="iPhone 8 Plus">iPhone-8-Plus</option>
                  <option value="iPhone 8">iPhone-8</option>
                  <option value="iPhone 7 Plus">iPhone-7-Plus</option>
                  <option value="iPhone 7">iPhone-7</option>
                </select>
                <label className="form-label"> Precio</label>

                <input
                  className="form-control"
                  type="number"
                  name="precio"
                  value={model.precio}
                  onChange={(event) => handleModelChange(index, event)}
                />
                <label className="form-label"> Stock </label>
                <input
                  className="form-control"
                  type="number"
                  name="stockModel"
                  value={model.stockModel}
                  onChange={(event) => handleModelChange(index, event)}
                />
                <label className="form-check-label"> Disponible </label>

                <input
                  className="form-check-input"
                  type="checkbox"
                  name="disponible"
                  checked={model.disponible}
                  onChange={(event) =>
                    handleModelChangeB(
                      index,
                      event.target.name,
                      event.target.checked
                    )
                  }
                />

                <label className="form-label"> Imagen </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(event) => handleImageUploadModel(index, event)}
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
                <br />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => removeModel(index)}
                >
                  Eliminar modelo
                </button>
              </div>
            ))}
            <button
              className="btn btn-success"
              type="button"
              onClick={addModel}
            >
              Añadir modelo
            </button>
            <div>
              <br />
              <strong className="centering">
                Seccion capacidad del producto
              </strong>
              <p>
                *En caso que el producto cuente con almacenamiento pulse anadir,
                de lo contrario omita.
              </p>
            </div>
            <br />
            {inputForm.almacenamiento.map((storage, index) => (
              <div className="mb-3 d-flex flex-column" key={index}>
                <label className="form-label"> Capacidad</label>
                <select
                  className="form-control"
                  type="text"
                  name="capacidad"
                  value={storage.capacidad}
                  onChange={(event) => handleStorageChange(index, event)}
                >
                  <option>Seleccione</option>
                  <option value="64 GB">64GB</option>
                  <option value="128 GB">128GB</option>
                  <option value="256 GB">256GB</option>
                  <option value="512 GB">512GB</option>
                  <option value="1024 GB">1024GB</option>
                </select>
                <label className="form-label"> Precio </label>
                <input
                  className="form-control"
                  type="number"
                  name="precio"
                  value={storage.precio}
                  onChange={(event) => handleStorageChange(index, event)}
                />

                <label className="form-label"> Stock </label>
                <input
                  className="form-control"
                  type="number"
                  name="stockStorage"
                  value={storage.stockStorage}
                  onChange={(event) => handleStorageChange(index, event)}
                />
                <label className="form-check-label"> Disponible </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="disponible"
                  checked={storage.disponible}
                  onChange={(event) =>
                    handleStorageChangeB(
                      index,
                      event.target.name,
                      event.target.checked
                    )
                  }
                />
                <label className="form-label"> Estado </label>
                <select
                  className="form-control"
                  name="estado"
                  value={storage.estado}
                  onChange={(event) => handleStorageChange(index, event)}
                >
                  <option>Seleccione</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Swap">Swap</option>
                  <option value="Usado">Usado</option>
                </select>
                <br />
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={() => removeStorage(index)}
                >
                  Eliminar almacenamiento
                </button>
              </div>
            ))}{" "}
            <button
              className="btn btn-success"
              type="button"
              onClick={addStorage}
            >
              Añadir almacenamiento
            </button>
            <br />
            <br />
          </Form>
          <br />
          <br />
        </div>
        <div className="container-right">
          <div className="calculadora">
            <strong className="centering">Calculadora de precios</strong>
            <p
              style={{
                fontSize: "9px",
              }}
            >
              *En caso de agregar mas variables de precios inserte el valor
              inicial y obtendra el final
            </p>
            <div>
              <input
                className="form-calculo"
                type="number"
                name="precioInicial"
                onChange={(e) => uploadCalculo(e)}
              />{" "}
              =<span className="form-calculo"> {calculadora}</span>
            </div>
          </div>
          <Button
            style={{
              margin: "4px",
              width: "80px",
              height: "50px",
              fontSize: "14px",
            }}
            className="centering"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Cargar
          </Button>
          <div
            className="card"
            style={{ width: "24rem", maxHeight: "50vh", overflowY: "auto" }}
          >
            <img
              src={
                inputForm.imagenGeneral[0] ||
                "https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
              }
              className="card-img-top"
              alt="Product Image"
              style={{ height: "300px", width: "auto", objectFit: "contain" }}
            />

            <div className="card-body">
              <p className="card-text">
                <strong>Nombre: </strong>
                {inputForm.nombre}
                <br />
                <strong>Marca: </strong>
                {inputForm.marca}
                <br />
                <strong>Categoria: </strong>
                {inputForm.categorias}
                <br />
                <strong>Subcategoria: </strong>
                {inputForm.subCategoria}
                <br />
                <strong>Descripcion: </strong>
                {descripcionCorta}
                <br />
                <strong>Precio: </strong>
                {inputForm.precioBase}
                <br />
                <strong>Estado: </strong>
                {inputForm.estado}
                <br />
                <strong>Stock: </strong>
                {inputForm.stockGeneral}
                <br />
                <strong>Disponibilidad: </strong>
                {inputForm.disponible ? "Si" : "No"}
                <br />
                <strong>Tipo: </strong>
                {inputForm.tipo}
                <br />
                <strong>Colores: </strong>
                <br />
                <div className="color-content">
                  {inputForm.color?.map((colorItem, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        width: "5rem",
                        marginTop: "10px",
                        fontSize: "9px",
                      }}
                    >
                      <img
                        src={
                          colorItem.imageColor ||
                          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
                        }
                        className="card-img-top"
                        alt="Color Image"
                        style={{
                          height: "30px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />

                      <div className="card-body">
                        <p className="card-text">
                          <strong>Nombre: </strong>
                          {colorItem.nombre}
                          <br />
                          <strong>Stock: </strong>
                          {colorItem.stockColor}
                          <br />
                          <strong>Estado: </strong>
                          {colorItem.estado}
                          <br />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <strong>Modelos: </strong> <br />
                <div className="color-content">
                  {inputForm.modelo?.map((modelItem, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        width: "5rem",
                        marginTop: "10px",
                        fontSize: "9px",
                      }}
                    >
                      <img
                        src={
                          modelItem.imageModel ||
                          "https://res.cloudinary.com/deqxuoyrc/image/upload/v1677853658/IPHONECASEOBERA/logo_exafgv.png"
                        }
                        className="card-img-top"
                        alt="Color Image"
                        style={{
                          height: "30px",
                          width: "auto",
                          objectFit: "contain",
                        }}
                      />

                      <div className="card-body">
                        <p className="card-text">
                          <strong>Nombre: </strong>
                          {modelItem.nombre}
                          <br />
                          <strong>Precio: </strong>
                          {modelItem.precio}
                          <br />
                          <strong>Stock: </strong>
                          {modelItem.stockModel}
                          <br />
                          <strong>Disponibilidad: </strong>

                          {modelItem.disponible ? "Sí" : "No"}
                          <br />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <strong>Almacenamientos: </strong>
                <br />
                <div className="color-content">
                  {inputForm.almacenamiento?.map((capItem, index) => (
                    <div
                      key={index}
                      className="card"
                      style={{
                        width: "5rem",
                        marginTop: "10px",
                        fontSize: "9px",
                      }}
                    >
                      <div className="card-body">
                        <p className="card-text">
                          <strong>Capacidad: </strong>
                          {capItem.capacidad}
                          <br />
                          <strong>Precio: </strong>
                          {capItem.precio}
                          <br />
                          <strong>Stock: </strong>
                          {capItem.stockStorage}
                          <br />
                          <strong>Disponibilidad: </strong>
                          {capItem.disponible ? "Sí" : "No"}
                          <br />
                          <strong>Estado: </strong>
                          {capItem.estado}
                          <br />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
