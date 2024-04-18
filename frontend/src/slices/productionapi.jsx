import { apislice } from "./apislice";

const productionApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    getproducts: build.query({
      query: ({ pages, key }) => `/data/?page=${pages || 1}&key=${key || ""}`,
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
    UploadImage: build.mutation({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
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
      invalidatesTags: ["Post", "proid"],
    }),
    AddReview: build.mutation({
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
  useUploadImageMutation,
  useUpdateProductByIdMutation,
  useAddReviewMutation,
} = productionApiSlice;
