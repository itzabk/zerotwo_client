import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../config/api";

const accountsAdapter = createEntityAdapter();
const initialState = accountsAdapter.getInitialState();

export const accountsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccounts: builder.query({
      query: () => ({
        url: "/accounts/",
        method: "GET",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const newData = responseData?.map((ele, i) => {
          return { id: ele._id, ...ele };
        });
        return accountsAdapter.setAll(initialState, newData);
      },
      providesTags: (result = [], error, arg) => {
        return [
          "Accounts",
          ...result?.ids?.map((ele) => ({ type: "Accounts", id: ele })),
        ];
      },
    }),
    getAccount: builder.query({
      query: (uid) => `/accounts/${uid}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: (result, error, arg) => [{ type: "Accounts", id: arg }],
    }),
    deleteAccount: builder.mutation({
      query: (data) => ({
        url: "/accounts/delete-user",
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: ["Accounts"],
    }),
    banAccount: builder.mutation({
      query: (id) => ({
        url: "/accounts/ban-user",
        method: "PATCH",
        body: { ...id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Accounts", id: arg._id },
      ],
    }),
    unbanAccount: builder.mutation({
      query: (id) => ({
        url: "/accounts/unban-user",
        method: "PATCH",
        body: { ...id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Accounts", id: arg._id },
      ],
    }),
    updateAccount: builder.mutation({
      Headers: {
        "Content-Type": "multipart/form-data",
      },
      query: (data) => ({
        url: "/accounts/update-user",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Accounts", id: arg._id },
      ],
    }),
  }),
});

export const selectAccountsResult =
  accountsApiSlice.endpoints.getAccounts.select();

const selectAccountsData = createSelector(
  selectAccountsResult,
  (response) => response.data
);

export const {
  selectAll: selectAllUserAccounts,
  selectById: selectUserAccountById,
} = accountsAdapter.getSelectors(
  (state) => selectAccountsData(state) ?? initialState
);

export const {
  useBanAccountMutation,
  useDeleteAccountMutation,
  useGetAccountQuery,
  useGetAccountsQuery,
  useUnbanAccountMutation,
  useUpdateAccountMutation,
} = accountsApiSlice;
