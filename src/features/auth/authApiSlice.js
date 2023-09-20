import { apiSlice } from "../../config/api";
import { setCredentials, logout } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    register: builder.mutation({
      query: (registerData) => ({
        url: "/users/register",
        method: "POST",
        body: { ...registerData },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logout());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/users/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
    generateOTP: builder.mutation({
      query: (email) => ({
        url: "/users/generate-otp",
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    generateVerificationLink: builder.mutation({
      query: (email) => ({
        url: "/users/gen-link",
        method: "POST",
        body: {
          email,
        },
      }),
    }),
    generatePassword: builder.mutation({
      query: () => ({ url: "/users/generate-password", method: "GET" }),
    }),
    resetPassword: builder.mutation({
      query: (resetData) => ({
        url: "/users/pswd-reset-link",
        method: "POST",
        body: {
          ...resetData,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGenerateOTPMutation,
  useRegisterMutation,
  useGenerateVerificationLinkMutation,
  useGeneratePasswordMutation,
  useResetPasswordMutation,
  useSendLogoutMutation,
  useRefreshMutation,
} = authApiSlice;
