import { createSlice } from "@reduxjs/toolkit";
import { addTocard } from "../utils/cartdutils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const addDecimal = (num) => {};

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
  },
});
export const { addtToCart } = cardSlice.actions;
export default cardSlice.reducer;
