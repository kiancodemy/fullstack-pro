import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apislice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["product", "user", "order"],
  endpoints: (builder) => ({}),
});
