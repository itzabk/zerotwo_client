import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../config/api";

const brandsAdapter = createEntityAdapter();
const initialState = brandsAdapter.getInitialState();

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "/brands/",
        method: "GET",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const newData = responseData?.map((ele, i) => {
          return { id: ele._id, ...ele };
        });
        return brandsAdapter.setAll(initialState, newData);
      },
      providesTags: ["Brands"],
    }),
    addBrand: builder.mutation({
      query: (data) => ({
        Headers: {
          "Content-Type": "multipart/form-data",
        },
        url: "/brands/add-brand",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation({
      query: (data) => ({
        url: "/brands/delete-brand",
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const selectBrandsResult = brandApiSlice.endpoints.getBrands.select();

const selectBrandsData = createSelector(
  selectBrandsResult,
  (response) => response.data
);

export const { selectAll: selectAllBrands, selectById: selectUserById } =
  brandsAdapter.getSelectors(
    (state) => selectBrandsData(state) ?? initialState
  );

export const {
  useGetBrandsQuery,
  useAddBrandMutation,
  useDeleteBrandMutation,
} = brandApiSlice;
