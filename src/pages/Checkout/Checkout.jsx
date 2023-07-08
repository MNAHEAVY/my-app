import { useEffect, useState } from "react";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { getUser, getValues } from "../../redux/actions";
import EmptyCart from "../empty/emptyCart";
import RemoveCircleTwoToneIcon from "@mui/icons-material/RemoveCircleTwoTone";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";

initMercadoPago("APP_USR-8c926d78-0d84-43b8-a918-9da21227b3a9", {
  locale: "es-AR",
});

export default function Checkout() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const email = user?.email;
  const buyer = useSelector((state) => state.user);
  const products = useSelector((state) => state.checkUser.cart);
  const prodToBuy = products;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getUser(email));
  }, [dispatch, email, products, quantity]);

  const getTotalPrice = () => {
    let totalPrice = 0;
    prodToBuy.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice.toFixed(2);
  };
  const [price, setPrice] = useState(getTotalPrice());

  const deleteProd = (id) => {
    let arr = products.filter((prod) => prod._id !== id);
    localStorage.setItem("cartList", JSON.stringify(arr));
    setProducts(arr);
  };

  if (!products || products.length === 0) {
    return <EmptyCart />;
  }

  const onSubmit = async (formData) => {
    const preferenceData = {
      items: prodToBuy,
      purpose: "wallet_purchase",
    };

    try {
      const response = await fetch(
        "https://iphonecaseoberab-production.up.railway.app/create_preference",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(preferenceData),
        }
      );
      console.log(preferenceData);
      const preference = await response.json();
      return preference.preferenceId;
    } catch (error) {
      console.error(error);
      throw new Error("Error al crear la preferencia de pago");
    }
  };

  const onError = async (error) => {
    console.error(error);
  };

  const onReady = async () => {
    // Este callback se ejecuta cuando el botón de pago está listo para usarse.
    // Aquí podrías ocultar cualquier mensaje de carga.
  };

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <h1>Concreta tu Compra!</h1>
      </div>

      <div className="checkout-payment">
        <h2>Alternativas de Pago</h2>
      </div>
      <div>
        <Wallet onSubmit={onSubmit} onReady={onReady} onError={onError} />
      </div>

      <div className="checkout-product-list">
        <h3>Listado de Producto/s</h3>
        <br />

        {prodToBuy?.map((item) => (
          <div key={item.product} className="product-item">
            <div className="product-image">
              <img src={item.image} alt={item.name} loading="lazy" />
            </div>

            <div className="product-details">
              <div className="product-info">
                <h4 className="product-name">{item.name}</h4>
                <h4 className="product-price">${item.price}</h4>
                //<h4 className="product-brand">{item.color}</h4>
              </div>

              <div className="product-quantity">
                <span>Cantidad: {item.quantity}</span>
                <button onClick={() => deleteProd(item._id)}>
                  <RemoveCircleTwoToneIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="checkout-total">
        <h4>Precio total: ${price}</h4>
      </div>
      <br />
      <br />
    </div>
  );
}
