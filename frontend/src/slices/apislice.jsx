import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apislice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_SOME_KEY }),

  endpoints: (builder) => ({}),
});
