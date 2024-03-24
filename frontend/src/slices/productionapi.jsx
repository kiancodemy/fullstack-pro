import { apislice } from "./apislice";

const productionApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    getproducts: build.query({
      query: () => "/data",
      keepUnusedDataFor: 5,
    }),
    getproductsbyid: build.query({
      query: (id) => `/data/${id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useGetproductsQuery, useGetproductsbyidQuery } =
  productionApiSlice;
