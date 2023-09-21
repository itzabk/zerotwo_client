import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../config/api";

const wishlistAdapter = createEntityAdapter();
const initialState = wishlistAdapter.getInitialState();

export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query({
      query: (userId) => ({
        url: `/accounts/${userId}/wishlist/`,
        method: "GET",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData = []) => {
        if (responseData?.length > 0) {
          const newData = responseData?.map((ele, i) => {
            return { id: ele._id, ...ele };
          });
          return wishlistAdapter.setAll(initialState, newData);
        } else {
          return responseData;
        }
      },
      providesTags: ["Wishlist"],
    }),
    addWish: builder.mutation({
      query: (data) => {
        const { userId } = data;
        return {
          url: `/accounts/${userId}/wishlist/add-wish/`,
          method: "POST",
          body: { ...data },
        };
      },
      invalidatesTags: ["Wishlist"],
    }),
    deleteWish: builder.mutation({
      query: (data) => {
        const { userId } = data;
        return {
          url: `/accounts/${userId}/wishlist/delete-wish/`,
          method: "DELETE",
          body: { ...data },
        };
      },
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const selectWishlistResult =
  wishlistApiSlice.endpoints.getWishlist.select();

export const {
  useAddWishMutation,
  useDeleteWishMutation,
  useGetWishlistQuery,
} = wishlistApiSlice;
