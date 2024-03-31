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
    logout: build.mutation({
      //
      query: () => ({
        url: `/users/logout`,
        method: "POST",
      }),
    }),
    register: build.mutation({
      //
      query: (data) => ({
        url: `/users`,
        method: "POST",
        body: data,
      }),
    }),
    getOrderDetail: build.query({
      //
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetOrderDetailQuery,
} = userApiSlice;
