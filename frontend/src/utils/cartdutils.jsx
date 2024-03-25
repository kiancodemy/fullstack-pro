const addDecimal = (num) => {
  return Number(Math.round(num * 100) / 100).toFixed(2);
};
export const addTocard = (state) => {
  state.itemPrice = addDecimal(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  state.shippingPrice = addDecimal(state.itemPrice >= 100 ? 0 : 10);
  state.taxPrice = addDecimal(Number(0.15 * state.itemPrice).toFixed(2));
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
