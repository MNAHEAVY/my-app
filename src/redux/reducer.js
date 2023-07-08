import {
  FILTERED_PRODUCTS,
  GET_ALL_PRODUCTS,
  GET_PRODUCT_BY_ID,
  CHECK_USER,
  GET_ALL_USERS,
  GET_VALUES,
  GET_USER,
} from "./actions";

const initialState = {
  products: [],
  allProducts: [],
  users: [],
  allUsers: [],
  prodById: {},
  filteredProducts: [],
  checkUser: {},
  values: {},
  user: {},
  favorites: [],
  cart: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
        products: action.payload,
      };

    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
        users: action.payload,
      };

    case FILTERED_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        prodById: action.payload,
      };

    case GET_VALUES:
      return {
        ...state,
        values: action.payload,
      };

    case CHECK_USER:
      return {
        ...state,
        checkUser: action.payload,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
