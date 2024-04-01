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
      query: ({ data, id }) => ({
        url: `/orders/${id}/pay`,
        method: "PUT",
        body: { ...data },
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
  }),
});

export const {
  useAddOrderMutation,
  usePayOrderMutation,
  usePaypalIdQuery,
  useGetOrderDetailQuery,
} = orderApiSlice;
