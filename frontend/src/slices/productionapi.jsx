import { apislice } from "./apislice";

const productionApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    getproducts: build.query({
      query: (id) => `/data/?page=${id || 1}`,
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
      providesTags: ["Proid"],
    }),
    UpdateProductById: build.mutation({
      //
      query: ({ data, id }) => ({
        url: `/data/${id}`,
        method: "PUT",
        body: { ...data },
      }),
      invalidatesTags: ["Post", "Proid"],
    }),
    AddReview: build.mutation({
      //
      query: ({ data, id }) => ({
        url: `/data/addRe/${id}`,
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Post", "Proid"],
    }),
  }),
});
export const {
  useGetproductsQuery,
  useGetproductsbyidQuery,
  useDeleteProductMutation,
  useCreatItemMutation,
  useUpdateProductByIdMutation,
  useAddReviewMutation,
} = productionApiSlice;
