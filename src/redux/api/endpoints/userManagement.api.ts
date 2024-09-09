import baseApi from "../baseApi";
import { tagTypes } from "../tagTypes";

export const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // User Signup
    signUpUser: builder.mutation({
      query: (newUser) => ({
        url: "/auth/signup",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: [tagTypes.User],
    }),
    // User Login
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    // Get All Users
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/allUser",
        method: "GET",
      }),
      providesTags: [tagTypes.User],
    }),
    // Get Single User by ID
    getUserById: builder.query({
      query: (userId) => ({
        url: `auth/allUser/${userId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.User],
    }),
    // Update User Role
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => {
        console.log({ role, userId });

        return {
          url: `/auth/allUser/${userId}`,
          method: "PUT",
          body: { role },
        };
      },
      invalidatesTags: [tagTypes.User],
    }),
    // Delete User by ID
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `auth/deleteUser/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.User],
    }),
    updateUser: builder.mutation({
      query: ({ userId, formData }) => ({
        url: `auth/update/${userId}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: [tagTypes.User],
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useLoginUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  useUpdateUserMutation
} = userManagementApi;
