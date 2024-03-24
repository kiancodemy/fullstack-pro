import { configureStore } from "@reduxjs/toolkit";
import { apislice } from "./slices/apislice";

const store = configureStore({
  reducer: { [apislice.reducerPath]: apislice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apislice.middleware),
});
export default store;
