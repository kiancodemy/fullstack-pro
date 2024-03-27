import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "./slices/apislice";
import auth from "./slices/authslice";
import cartslice from "./slices/cardslice";

const store = configureStore({
  reducer: {
    [apislice.reducerPath]: apislice.reducer,

    cart: cartslice,
    userinfo: auth,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apislice.middleware),
});
export default store;
