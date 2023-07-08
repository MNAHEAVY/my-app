import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = "https://iphonecaseoberab-production.up.railway.app";

export const FILTERED_PRODUCTS = "FILTERED_PRODUCTS";
export const GET_ALL_PRODUCTS = "GET_ALL_PRODUCTS";
export const GET_PRODUCT_BY_ID = "GET_PRODUCT_BY_ID";
export const CHECK_USER = "CHECK_USER";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const GET_VALUES = "GET_VALUES";
export const CHECK_USER_EXISTS = "GET_VALUES";
export const PUT_PRODUCT = "PUT_PRODUCT";
export const PUT_VALUES = "PUT_VALUES";
export const CREATE = "CREATE";
export const DELETE_ITEM = "DELETE_ITEM";
export const GET_USER = "GET_USER";

export const addToFavorites = (productId, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId: userId,
        productId: productId,
      };

      const response = await axios.post(
        `${API_BASE_URL}/users/favs`,
        requestData
      );

      if (response.status === 200) {
        toast.success("¡Añadido a favoritos!");
      }

      dispatch({
        type: "ADD_TO_FAVS",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocurrió un error al agregar el producto a favoritos o ya existe"
      );
    }
  };
};

export const addToCart = (defaultValues, userId) => {
  return async (dispatch) => {
    try {
      const requestData = {
        userId: userId,
        ...defaultValues,
      };
      const response = await axios.post(
        `${API_BASE_URL}/users/cart`,
        requestData
      );

      if (response.status === 200) {
        toast.success("¡Añadido al carrito!");
      }

      dispatch({
        type: "ADD_TO_CART",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
      toast.error(
        "Ocurrió un error al agregar el producto al carrito o ya existe"
      );
    }
  };
};

export const deleteCartItem = (userId, itemId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/users/cart/${userId}/${itemId}`
      );
      if (response.status === 200) {
        toast.success("¡Producto eliminado del carrito!");
      }
      dispatch({ type: "DELETE_CART_ITEM_SUCCESS", payload: response.data });
    } catch (error) {
      console.error(error);
      toast.error("Ocurrió un error al eliminar el producto del carrito");
      dispatch({ type: "DELETE_CART_ITEM_FAILURE", payload: error.message });
    }
  };
};

export const getAllProducts = () => {
  return async function (dispatch) {
    const products = await axios(`${API_BASE_URL}/products`);

    return dispatch({
      type: GET_ALL_PRODUCTS,
      payload: products.data,
    });
  };
};
export const getValues = () => {
  return async function (dispatch) {
    const values = await axios(`${API_BASE_URL}/values`);
    console.log(values);

    dispatch({
      type: GET_VALUES,
      payload: values.data,
    });
  };
};

export const checkUserExists = (userData) => {
  return async function (dispatch) {
    await axios.post(`${API_BASE_URL}/users`, userData);
  };
};

export const checkUserAdmin = (mail) => {
  return async function (dispatch) {
    const getUser = await axios.get(`${API_BASE_URL}/users?email=${mail}`);
    console.log(getUser);
    dispatch({
      type: CHECK_USER,
      payload: getUser.data,
    });
  };
};

export const getProductById = (productId) => {
  return async function (dispatch) {
    const prodId = await axios.get(`${API_BASE_URL}/product/${productId}`);
    console.log("aca", prodId);
    dispatch({
      type: GET_PRODUCT_BY_ID,
      payload: prodId.data,
    });
  };
};

export const filteredProducts = (payload) => {
  return async function (dispatch) {
    const filter = await axios.get(`${API_BASE_URL}/filter?${payload}`);
    dispatch({
      type: FILTERED_PRODUCTS,
      payload: filter.data,
    });
  };
};

export const getAllUsers = () => {
  return async function (dispatch) {
    const users = await axios(`${API_BASE_URL}/allusers`);

    return dispatch({
      type: GET_ALL_USERS,
      payload: users.data,
    });
  };
};
export const getUser = (email) => {
  return async function (dispatch) {
    const user = await axios.get(`${API_BASE_URL}/users?email=${email}`);
    console.log(user);
    dispatch({
      type: GET_USER,
      payload: user.data,
    });
  };
};
export const putProd = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/product/${id}`, input);
      dispatch({
        type: "PUT_PRODUCT",
        payload: res.data,
      });
      alert("El producto se actualizó correctamente.");
    } catch (err) {
      console.log(err);
      alert("El producto NO se actualizó correctamente.");
    }
  };
};

export const putVal = (id, input) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/values/${id}`, input);
      dispatch({
        type: "PUT_VALUES",
        payload: res.data,
      });
      alert("Los valores se actualizaron correctamente.");
    } catch (err) {
      console.log(err);
      alert("Los valores NO se actualizaron correctamente.");
    }
  };
};

export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`${API_BASE_URL}/product/${id}`);
      dispatch({
        type: "DELETE_ITEM",
        payload: res.data,
      });
      alert("El producto ha sido borrado");
    } catch (err) {
      console.log(err);
      alert("El producto no se borro");
    }
  };
};

export const createProd = (inputForm) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/products`, inputForm);
      dispatch({
        type: "CREATE",
        payload: res.data,
      });
      alert("Producto Creado.");
    } catch (err) {
      console.log(err);
      alert("Fallo la creacion");
    }
  };
};
