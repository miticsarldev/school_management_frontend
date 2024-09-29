import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

import { RootState } from "../store";
import { BASE_URL } from "./config";
import { setCredentials, setLogout } from "../features/authSlice";
import { User } from "@/types";

export interface UserResponse {
  user: User;
  accessToken: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      {
        url: "/refresh",
        method: "POST",
      },
      api,
      extraOptions
    );

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;
      const token = (refreshResult.data as { accessToken: string }).accessToken;
      api.dispatch(
        setCredentials({
          user,
          accessToken: token,
          isAuthenticated: true,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLogout());
    }
  }
  return result;
};
