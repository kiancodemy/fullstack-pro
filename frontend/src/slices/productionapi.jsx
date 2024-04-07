import { apislice } from "./apislice";

const productionApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    getproducts: build.query({
      query: () => "/data",
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),
    DeleteProduct: build.mutation({
      //
      query: (id) => ({
        url: `/data/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    CreatItem: build.mutation({
      //
      query: (item) => ({
        url: "/data",
        method: "POST",
        body: { ...item },
      }),
      invalidatesTags: ["Post"],
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
  useCreatItemMutation,
} = productionApiSlice;
