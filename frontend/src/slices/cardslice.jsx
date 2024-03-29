import { createSlice } from "@reduxjs/toolkit";
import { addTocard } from "../utils/cartdutils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [], shippingAddress: {}, paymentmethod: "paypal" };

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addtToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((x) => x._id === item._id);
      if (exist) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return addTocard(state);
    },
    deletecart: (state, action) => {
      const item = action.payload;
      state.cartItems = state.cartItems.filter(
        (items) => items._id !== item._id
      );
      return addTocard(state);
    },
    saveShippingAdress: (state, action) => {
      state.shippingAddress = action.payload;
      return addTocard(state);
    },
    savepayment: (state, action) => {
      state.paymentmethod = action.payload;
      return addTocard(state);
    },
  },
});
export const { addtToCart, deletecart, saveShippingAdress, savepayment } =
  cardSlice.actions;
export default cardSlice.reducer;
