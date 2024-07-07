import { apislice } from "./apislice";

const orderApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation({
      //
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        credentials: "include",
        body: { ...data },
      }),
    }),
    payOrder: build.mutation({
      //
      query: ({ id, data }) => ({
        url: `/orders/${id}/pay`,
        method: "PUT",
        credentials: "include",
        body: { ...data },
      }),
    }),
    setToDelivered: build.mutation({
      //
      query: (id) => ({
        url: `/orders/${id}/delivered`,
        method: "PUT",
        credentials: "include",
      }),
    }),
    getOrderDetail: build.query({
      //
      query: (id) => ({
        url: `/orders/${id}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    paypalId: build.query({
      //
      query: () => ({
        url: "/config/paypal",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
    getallorders: build.query({
      query: () => ({
        url: "/orders",
        credentials: "include",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useAddOrderMutation,
  usePayOrderMutation,
  usePaypalIdQuery,
  useGetOrderDetailQuery,
  useGetallordersQuery,
  useSetToDeliveredMutation,
} = orderApiSlice;
