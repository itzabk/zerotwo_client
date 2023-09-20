import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../config/api";

const productAdaptor = createEntityAdapter();
const initialState = productAdaptor.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBPD: builder.query({
      query: () => ({ url: "/products/distribution/" }),
      providesTags: ["Distribution"],
    }),
    getProducts: builder.query({
      query: (params) => {
        const cat = params?.cat;
        const brand = params?.brand;
        const sort = params?.sort;
        if (params && typeof params === "object") {
          if (Object?.values(params)?.length) {
            if (cat && brand) {
              return `/products/?cat=${cat}&brand=${brand}&sort=${sort}`;
            } else if (cat && !brand) {
              return `/products/?cat=${cat}&sort=${sort}`;
            } else if (!cat && brand) {
              return `/products/?brand=${brand}&sort=${sort}`;
            } else {
              return `/products/?sort=${sort}`;
            }
          }
        } else {
          return `/products/`;
        }
      },
      providesTags: (result = [], error, arg) => {
        if (result?.length > 0) {
          return [
            "Products",
            ...result?.ids?.map((ele) => ({ type: "Products", id: ele })),
          ];
        } else {
          return ["Products"];
        }
      },
      transformResponse: (responseData = []) => {
        const newResponse = responseData?.map((ele) => {
          return { id: ele._id, ...ele };
        });
        if (responseData?.length > 0) {
          return productAdaptor?.setAll(initialState, newResponse);
        } else {
          return responseData;
        }
      },
    }),
    getProduct: builder.query({
      query: (productId) => {
        return {
          url: `/products/${productId}`,
          method: "GET",
        };
      },
      providesTags: (result = [], error, arg) => {
        return [{ type: "Products", id: arg }];
      },
    }),
    addProduct: builder.mutation({
      Headers: {
        "Content-Type": "multipart/form-data",
      },
      query: (data) => ({
        url: "/products/add-product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "DistributionBP"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: "/products/delete-product",
        method: "DELETE",
        body: { ...id },
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: "/products/update-product",
        method: "PATCH",
        body: { ...data },
      }),
      invalidatesTags: (result, error, arg) => [
        "Products",
        { type: "Products", id: arg._id },
      ],
    }),
  }),
});

export const selectProductsResult =
  productApiSlice.endpoints.getProducts.select();

const selectProductsData = createSelector(
  selectProductsResult,
  (response) => response.data
);

export const { selectAll: selectAllProducts, selectById: selectProductById } =
  productAdaptor.getSelectors(
    (state) => selectProductsData(state) ?? initialState
  );

export const {
  useGetProductsQuery,
  useLazyGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetBPDQuery,
  useGetProductQuery,
} = productApiSlice;
