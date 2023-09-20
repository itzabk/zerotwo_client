import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://127.0.0.1:443",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Access-Control-Allow-Header", "http://localhost:3000");
      headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (
    result?.error?.data?.status === "403" &&
    result?.error?.data?.message === "Forbidden"
  ) {
    const refreshResult = await baseQuery("/users/refresh", api, extraOptions);
    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      return {
        error: { status: result?.error?.status, data: result?.error?.message },
      };
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Brands",
    "Products",
    "Category",
    "Subcategory",
    "Distribution",
    "Cart",
    "CartID",
    "Orders",
    "Wishlist",
  ],
  endpoints: (builder) => ({}),
});
