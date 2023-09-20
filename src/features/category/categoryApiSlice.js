import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../config/api";

const categoryAdaptor = createEntityAdapter();
const initialState = categoryAdaptor.getInitialState();

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/categories/",
      providesTags: ["Category"],
      transformResponse: (responseData) => {
        const newResponse = responseData?.map((ele) => {
          return { id: ele._id, ...ele };
        });
        return categoryAdaptor.setAll(initialState, newResponse);
      },
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/add-category",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (cname) => ({
        url: "/categories/delete-category",
        method: "DELETE",
        body: { ...cname },
      }),
      invalidatesTags: ["Category", "Products"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/update-category",
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Category", "Products"],
    }),
  }),
});

export const selectCategoryResult =
  categoryApiSlice.endpoints.getCategories.select();

const selectCategoryData = createSelector(
  selectCategoryResult,
  (response) => response.data
);

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
} = categoryAdaptor.getSelectors(
  (state) => selectCategoryData(state) ?? initialState
);

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApiSlice;
