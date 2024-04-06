import { apislice } from "./apislice";

const orderApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    addOrder: build.mutation({
      //
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        body: { ...data },
      }),
    }),
    payOrder: build.mutation({
      //
      query: ({ id, data }) => ({
        url: `/orders/${id}/pay`,
        method: "PUT",
        body: { ...data },
      }),
    }),
    setToDelivered: build.mutation({
      //
      query: (id) => ({
        url: `/orders/${id}/delivered`,
        method: "PUT",
      }),
    }),
    getOrderDetail: build.query({
      //
      query: (id) => ({
        url: `/orders/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    paypalId: build.query({
      //
      query: () => ({
        url: "/config/paypal",
      }),
      keepUnusedDataFor: 5,
    }),
    getallorders: build.query({
      query: () => ({
        url: "/orders",
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
