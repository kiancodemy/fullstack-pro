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
  }),
});
export const { useAddOrderMutation } = orderApiSlice;
