import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "@/types";
import { api } from "../services/apiConfig";

type AuthState = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, accessToken },
      }: PayloadAction<{
        user: User | null;
        accessToken?: string;
        isAuthenticated: boolean;
      }>
    ) => {
      state.user = user;
      state.accessToken = accessToken ? accessToken : null;
      state.isAuthenticated = true;

      localStorage.setItem("user", JSON.stringify(user));
    },
    setLogout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem("user");
    },
  },
});

type UserTag = { type: "Users"; id: string };

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<
      { message: string },
      {
        firstname: string;
        lastname: string;
        email: string;
        password: string;
        role: string;
        status: string;
      }
    >({
      query: (form) => ({
        url: "/register",
        method: "POST",
        body: { ...form },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: [{ type: "Users", id: "LIST" }],
    }),
    getAllUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: (result) =>
        result
          ? [
              ...(result.map(({ _id }) => ({
                type: "Users",
                id: _id,
              })) as UserTag[]),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
    updateUser: builder.mutation<
      { message: string },
      {
        id: string;
        firstname: string;
        lastname: string;
        role: string;
        status: string;
      }
    >({
      query: ({ id, ...rest }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: { ...rest },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Users", id },
        { type: "Users", id: "LIST" },
      ],
    }),
    login: builder.mutation<
      { accessToken: string; user: User },
      { email: string; phone: string; username: string; password: string }
    >({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.mutation<{ accessToken: string; user: User }, void>({
      query: () => ({
        url: "/refresh",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = authApiSlice;

export const { setCredentials, setLogout } = slice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default slice.reducer;
