const updateLocalStorage = (key, item, setIdFunction) => {
  let storedItems = JSON.parse(localStorage.getItem(key));

  if (storedItems === null || !storedItems.length) {
    localStorage.setItem(key, JSON.stringify([item]));
  } else {
    let found = storedItems.find((storedItem) => storedItem._id === item._id);

    if (found) {
      storedItems = storedItems.filter((storedItem) => storedItem !== found);
    } else {
      storedItems.push(item);
    }

    localStorage.setItem(key, JSON.stringify(storedItems));
  }

  setIdFunction(JSON.parse(localStorage.getItem(key)));
};

export const addToFav = (
  nombre,
  imagen,
  _id,
  precio,
  handleAdded,
  handleNotAdded,
  e,
  setFavProducts,
  stock
) => {
  e.preventDefault();
  updateLocalStorage(
    "favList",
    { nombre, imagen, stock, _id, precio },
    setFavProducts
  );
};

export const addToCart = (
  nombre,
  imagen,
  stock,
  _id,
  color,
  precio,
  almacenamiento,
  handleAdded,
  handleNotAdded,
  e
) => {
  e.preventDefault();

  if (stock === 0) {
    return;
  }

  updateLocalStorage(
    "cartList",
    { nombre, imagen, stock, _id, precio, almacenamiento, color, quantity: 1 },
    setFavProducts
  );
};

export function getCartItems() {
  // Verifica si hay elementos almacenados en el localStorage
  const storedCart = localStorage.getItem("cartList");

  // Si no hay elementos almacenados, retorna un array vacío
  if (!storedCart) {
    return [];
  }

  // Si hay elementos almacenados, parsea la cadena JSON y retorna el array de elementos
  return JSON.parse(storedCart);
}

export const getPrice = () => {
  let total = 0;
  JSON.parse(localStorage.getItem("cartList")).forEach((e) => {
    total += e.precio * e.quantity;
  });
  return total.toFixed(2);
};
