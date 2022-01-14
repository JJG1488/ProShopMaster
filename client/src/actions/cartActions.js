// bring in axios to make a request to the api/products/id when we add an item to the cart in order to get the data from that particular product to add to our cart
import axios from "axios";
import { CART_ADD_ITEM } from "../constants/cartConstants.js";
import React from "react";

// export this function that is going to take in id and qty (which we can get from the url)
//  we will use thunk. thunk allows us to do async / await adding a function in the middle of a function
// pull in getState (which allows us to pull the state out of the reducer state)
export const addToCart = (id, qty) => async (dispatch, getState) => {
  // make request using axios
  const { data } = await axios.get(`/api/products/:id`);
  //   once request is made, dispatch
  //   use the payload to name the properties that you want to display(if you get lost, refer to your products.js)
  dispatch({
    type: CART_ADD_ITEM,
    payload: { product: data._id },
    name: data.name,
    image: data.image,
    price: data.price,
    countInStock: data.countInStock,
    qty,
  });
  //   once dispatch is called, set items in local storage
  //   since we want to save the entire cart, use getState to grab the state fro the reducers out of the thunk function
  //   we can only save strings in local storage so call JSON.stringify on the getState function
  //   save to the local storage here and pull from the local storage, parse back into javascript (using JSON.parse).. all in the store.js in the initial state object to be specific
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.items));
};

export const cartActions = () => {
  return <div></div>;
};
