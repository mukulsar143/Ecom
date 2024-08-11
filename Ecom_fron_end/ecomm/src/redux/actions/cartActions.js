// src/redux/actions/cartActions.js
import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/";

export const fetchProducts = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}products/`);
    dispatch({ type: "FETCH_PRODUCTS", payload: response.data });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchCart = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${API_URL}cart/f11e2f01-ab23-4867-93ff-f3153d64817e/items/`,
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "FETCH_CART", payload: response.data });
  } catch (error) {
    console.error("Error fetching cart:", error);
  }
};

export const addToCart = (product) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${API_URL}cart/f11e2f01-ab23-4867-93ff-f3153d64817e/items/`,
      { product_id: product.id, quantity: 1 },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    alert("Add To Cart...")
    dispatch({ type: "ADD_TO_CART", payload: response.data });
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

export const updateCartItem = (item) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${API_URL}cart/f11e2f01-ab23-4867-93ff-f3153d64817e/items/`,
      { quantity: item.quantity },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      }
    );
    dispatch({ type: "UPDATE_CART_ITEM", payload: response.data });
  } catch (error) {
    console.error("Error updating cart item:", error);
  }
};

export const removeFromCart = (itemId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}cart/f11e2f01-ab23-4867-93ff-f3153d64817e/items/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    });
    dispatch({ type: "REMOVE_FROM_CART", payload: itemId });
  } catch (error) { 
    console.error("Error removing from cart:", error);
  }
};
