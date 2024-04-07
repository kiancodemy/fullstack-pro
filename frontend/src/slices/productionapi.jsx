import { apislice } from "./apislice";

const productionApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    getproducts: build.query({
      query: () => "/data",
      keepUnusedDataFor: 5,
    }),
    DeleteProduct: build.mutation({
      //
      query: (id) => ({
        url: `/data/delete/${id}`,
        method: "DELETE",
      }),
    }),
    getproductsbyid: build.query({
      query: (id) => `/data/${id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useGetproductsQuery,
  useGetproductsbyidQuery,
  useDeleteProductMutation,
} = productionApiSlice;
