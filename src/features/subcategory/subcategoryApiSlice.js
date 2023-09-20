import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../config/api";

const subcategoryAdaptor = createEntityAdapter();
const initialState = subcategoryAdaptor.getInitialState();

export const subcategoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubcategories: builder.query({
      query: (catId) => ({
        url: `/subcategories/`,
        method: "POST",
        body: { ...catId },
      }),
      providesTags: ["Subcategory"],
      transformResponse: (responseData) => {
        const newResponse = responseData?.map((ele) => {
          return { id: ele._id, ...ele };
        });
        return subcategoryAdaptor.setAll(initialState, newResponse);
      },
    }),
    getAroundProblem: builder.mutation({
      query: (catId) => ({
        url: `/subcategories/`,
        method: "POST",
        body: { ...catId },
      }),
    }),
    addSubcategory: builder.mutation({
      query: (data) => ({
        url: "/subcategories/add-subcategory",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Subcategory"],
    }),
    deleteSubCategory: builder.mutation({
      query: (data) => ({
        url: "/subcategories/delete-subcategory",
        method: "DELETE",
        body: { ...data },
      }),
      invalidatesTags: ["Subcategory", "Products"],
    }),
    updateSubcategory: builder.mutation({
      query: (data) => ({
        url: "/subcategories/update-subcategory",
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: ["Subcategory", "Products"],
    }),
  }),
});

export const selectSubcategoryResult =
  subcategoryApiSlice.endpoints.getSubcategories.select();

const selectSubcategoryData = createSelector(
  selectSubcategoryResult,
  (response) => response.data
);

export const {
  selectAll: selectAllSubcategories,
  selectById: selectSubcategoryById,
} = subcategoryAdaptor.getSelectors(
  (state) => selectSubcategoryData(state) ?? initialState
);

export const {
  useGetSubcategoriesQuery,
  useAddSubcategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubcategoryMutation,
  useGetAroundProblemMutation,
} = subcategoryApiSlice;
