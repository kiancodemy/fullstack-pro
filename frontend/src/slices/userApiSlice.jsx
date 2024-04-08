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
        method: "PUT",
        body: data,
      }),
    }),
    Updateuser: build.mutation({
      //
      query: (id) => ({
        url: `/users/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["All"],
    }),
    DeletedeUser: build.mutation({
      //
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["All"],
    }),
    myorders: build.query({
      query: () => ({
        url: `/orders/mine`,
      }),
    }),
    GetAllUsers: build.query({
      query: () => ({
        url: "/users",
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
