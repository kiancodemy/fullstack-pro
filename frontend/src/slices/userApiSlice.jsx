import { apislice } from "./apislice";

const userApiSlice = apislice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      //
      query: (data) => ({
        url: `/users/login`,
        credentials: "include",
        method: "POST",

        body: data,
      }),
    }),
    logout: build.mutation({
      //
      query: () => ({
        url: `/users/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    register: build.mutation({
      //
      query: (data) => ({
        url: `/users`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    profile: build.mutation({
      //
      query: (data) => ({
        url: `/users/profile`,
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    Updateuser: build.mutation({
      //
      query: (id) => ({
        url: `/users/${id}`,
        method: "PUT",
        credentials: "include",
      }),
      invalidatesTags: ["All"],
    }),
    DeletedeUser: build.mutation({
      //
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["All"],
    }),
    myorders: build.query({
      query: () => ({
        url: `/orders/mine`,
        credentials: "include",
      }),
    }),
    GetAllUsers: build.query({
      query: () => ({
        url: "/users",
        credentials: "include",
      }),
      providesTags: ["All"],
    }),
  }),
});
export const {
  useLoginMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useRegisterMutation,
  useProfileMutation,
  useMyordersQuery,
  useUpdateuserMutation,
  useDeletedeUserMutation,
} = userApiSlice;
