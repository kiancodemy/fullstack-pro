import { apislice } from "./apislice";

const userApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      //
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
    }),
    getproductsbyid: build.query({
      query: (id) => `/data/${id}`,
      keepUnusedDataFor: 5,
    }),
  }),
});
export const { useLoginMutation } = userApiSlice;
