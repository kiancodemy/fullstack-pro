import { apislice } from "./apislice";

const productionApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    getproducts: build.query({
      query: ({ pages, key }) => {
        return {
          url: `/data/?page=${pages || 1}&key=${key || ""}`,
          credentials: "include",
        };
      },
      keepUnusedDataFor: 5,
      providesTags: ["Post"],
    }),
    DeleteProduct: build.mutation({
      //
      query: (id) => ({
        url: `/data/delete/${id}`,
        credentials: "include",
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    UploadImage: build.mutation({
      query: (data) => ({
        url: "/upload",
        credentials: "include",
        method: "POST",
        body: data,
      }),
    }),
    CreatItem: build.mutation({
      //
      query: (item) => ({
        url: "/data",
        credentials: "include",
        method: "POST",
        body: { ...item },
      }),
      invalidatesTags: ["Post"],
    }),
    getproductsbyid: build.query({
      query: (id) => ({ url: `/data/${id}`, credentials: "include" }),

      providesTags: ["Proid"],
    }),
    UpdateProductById: build.mutation({
      //
      query: ({ data, id }) => ({
        url: `/data/${id}`,
        method: "PUT",
        credentials: "include",
        body: { ...data },
      }),
      invalidatesTags: ["Post", "proid"],
    }),
    AddReview: build.mutation({
      query: ({ data, id }) => ({
        url: `/data/addRe/${id}`,
        method: "POST",
        credentials: "include",
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
  useUploadImageMutation,
  useUpdateProductByIdMutation,
  useAddReviewMutation,
} = productionApiSlice;
