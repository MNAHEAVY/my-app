import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductById, getValues } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";
import ShareIcon from "@mui/icons-material/Share";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useAuth0 } from "@auth0/auth0-react";

// Components
import { addToFav, addToCart } from "../Cards/Fav&Cart";
// Styles
import Carousel from "react-bootstrap/Carousel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Form from "react-bootstrap/Form";
import Button from "@mui/material/Button";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Loading from "../Loading/Loading";
import BackButton from "../Button/Back";

export default function ProductDetail({ handleAdded, handleNotAdded }) {
  // Hooks
  const { id } = useParams();
  const dispatch = useDispatch();

  const productItem = useSelector((state) => state.prodById);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);
  const values = useSelector((state) => state.values);
  const { user } = useAuth0();

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);

  const handleColorChange = (e) => {
    const color = product.color.find((c) => c.nombre === e.target.value);
    setSelectedColor(color);
  };

  const handleStockChange = (e) => {
    const capacity = product.almacenamiento.find(
      (c) => c.capacidad === e.target.value
    );
    setSelectedStorage(capacity);
  };

  console.log(productItem);
  useEffect(() => {
    dispatch(getValues());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getProductById(id)).then(() => setLoading(false));
  }, [dispatch]);

  // Alert Logic
  const [open, setOpen] = React.useState(false);
  const [messageAlert, setMessageAlert] = useState("");
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleClickShare = (message) => {
    setMessageAlert(message);
    setOpen(true);
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Favs and cart
  const [favProducts, setFavProducts] = useState(
    JSON.parse(localStorage.getItem("favList"))
  );

  const handleFavoritesState = () => {
    let favs = JSON.parse(localStorage.getItem("favList"));
    let answer = favs.map((fav) => fav === productItem._id);
    return answer;
  };

  const handleCartState = () => {
    let cart = JSON.parse(localStorage.getItem("cartList"));
    let answer = cart.map((cart) => cart === productItem._id);
    return answer;
  };

  return (
    <div className="containerDetails">
      <div className="principalData">
        <BackButton />
        {loading ? ( // show loading component if still loading
          <Loading />
        ) : (
          <>
            {selectedColor ? (
              <img
                className="imageDetail"
                src={selectedColor.imageColor}
                alt=""
              />
            ) : (
              <Carousel variant="dark">
                {product?.imagenGeneral?.map((img, index) => {
                  return (
                    <Carousel.Item interval={3000} key={index}>
                      <img className="imageDetail" src={img} alt="" />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            )}
            <div className="productData">
              <h3>{productItem.nombre}</h3>
              <ul>
                <div className="listProductDetail">
                  <li>
                    <b>Marca |</b> {product.marca}
                  </li>
                  <li>
                    <b>Precio |</b>{" "}
                    {selectedStorage
                      ? selectedStorage.precio * 470
                      : product.precioBase * 470}
                  </li>
                  <li>
                    <b>Stock |</b>
                    {selectedStorage
                      ? selectedStorage.stockStorage
                      : selectedColor
                      ? selectedColor.stockColor
                      : product.stockGeneral}
                  </li>
                  <p>
                    *El stock final puede variar en relacion de la combinacion
                    entre color y almacenamiento{" "}
                  </p>
                  <li>
                    <b>Estado |</b> {product.estado}
                  </li>
                </div>
                <div className="listProductDetail">
                  <Form.Label>Color</Form.Label>
                  <Form.Select
                    size="sm"
                    value={selectedColor?.nombre}
                    onChange={handleColorChange}
                  >
                    {product?.color?.map((c, index) => {
                      return <option key={index}>{c.nombre}</option>;
                    })}
                  </Form.Select>
                </div>
                <div className="listProductDetail">
                  <Form.Label>Almacenamiento</Form.Label>
                  <Form.Select
                    size="sm"
                    value={selectedStorage?.capacidad}
                    onChange={handleStockChange}
                  >
                    {product?.almacenamiento?.map((c, index) => {
                      return <option key={index}>{c.capacidad}</option>;
                    })}
                  </Form.Select>
                </div>
              </ul>
              <b>Descripción</b>
              <p>{productItem.descripcion}</p>
            </div>
            <div className="productsOptions">
              <div className="share-favorite">
                <Tooltip title="Agregar a Favoritos">
                  <IconButton
                    onClick={(e) => {
                      setOpen(false);
                      setTimeout(
                        () => {
                          addToFav(
                            productItem.nombre,
                            productItem.imagen,
                            productItem._id,
                            productItem.precio,
                            null,
                            null,
                            e,
                            setFavProducts,
                            productItem.stock
                          );
                          handleFavoritesState();
                          handleClickShare(
                            handleFavoritesState().length
                              ? "Añadido a favoritos"
                              : "Eliminado de favoritos"
                          );
                        },
                        open ? 100 : 0
                      );
                    }}
                  >
                    <FavoriteIcon className="text-black" />
                  </IconButton>
                </Tooltip>
                <CopyToClipboard text={window.location.href}>
                  <Tooltip
                    onClick={() => {
                      setOpen(false);
                      setTimeout(
                        () => {
                          handleClickShare("Link copiado al portapapeles");
                        },
                        open ? 100 : 0
                      );
                    }}
                    title="Compartir"
                  >
                    <IconButton>
                      <ShareIcon className="text-black" />
                    </IconButton>
                  </Tooltip>
                </CopyToClipboard>
              </div>
              <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
              >
                <Alert
                  onClose={handleCloseSnackbar}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  {messageAlert}
                </Alert>
              </Snackbar>

              <div className="detailPayment">
                <h5>
                  ${(productItem?.precio[0] * values.dolarBlue).toFixed(2)}
                </h5>
                <Form className="formDetailProduct">
                  <Form.Group className="selectInput">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Select
                      size="sm"
                      value={quantity}
                      onChange={(e) => handlerQuantity(e)}
                    >
                      {[...Array(productItem.stock)].map((e, i) => (
                        <option value={i + 1} key={i}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <div className="total">
                    Total:{" "}
                    <span>
                      $
                      {(
                        productItem?.precio[0] *
                        values.dolarBlue *
                        quantity
                      ).toFixed(2)}
                    </span>
                  </div>
                  {user ? (
                    <Link to="/cart">
                      <Button variant="contained">Comprar</Button>
                    </Link>
                  ) : (
                    <>
                      <Button variant="contained" disabled>
                        Comprar
                      </Button>
                      <p className="userexist">
                        *Debe estar logueado para comprar
                      </p>
                    </>
                  )}

                  <Button
                    onClick={(e) => {
                      setOpen(false);
                      setTimeout(
                        () => {
                          addToCart(
                            productItem.nombre,
                            productItem.imagen,
                            productItem.stock,
                            productItem.color,
                            productItem._id,
                            (productItem.precio[0] * values.dolarBlue).toFixed(
                              2
                            ),
                            null,
                            null,
                            e
                          );

                          handleClickShare(
                            handleCartState().length
                              ? "Añadido al carrito"
                              : "Eliminado del carrito"
                          );
                        },
                        open ? 100 : 0
                      );
                    }}
                    variant="contained"
                    startIcon={<ShoppingCartOutlinedIcon />}
                  >
                    Añadir al Carrito
                  </Button>
                </Form>
              </div>
            </div>
          </>
        )}
      </div>
      <Divider />
    </div>
  );
}
