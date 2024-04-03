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
    profile: build.mutation({
      //
      query: (data) => ({
        url: `/users/profile`,
        method: "put",
        body: data,
      }),
    }),
    myorders: build.query({
      //
      query: () => ({
        url: `/orders/mine`,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useMyordersQuery,
} = userApiSlice;
