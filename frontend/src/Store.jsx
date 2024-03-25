import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "./slices/apislice";
import cartslice from "./slices/cardslice";

const store = configureStore({
  reducer: { [apislice.reducerPath]: apislice.reducer, cart: cartslice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apislice.middleware),
});
export default store;
