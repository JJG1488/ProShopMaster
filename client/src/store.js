// this is where we connect all of our reducers or any middleware
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducers.js";

// this is the state that we are importing the reducer into from reducers
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
});

// here is where we will bring in the cart items from the storage by fetching it from there
// so if localStorage.getItem("cartItems") exists, then parse it into usable format and if not, its just going to be the value of an empty array
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

//   setting the initial state
const initialState = {
  cart: { cartItems: cartItemsFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
