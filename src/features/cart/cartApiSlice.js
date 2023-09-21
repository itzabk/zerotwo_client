import { apiSlice } from "../../config/api";
import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";

const cartsAdapter = createEntityAdapter();
const initialState = cartsAdapter.getInitialState();

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query({
      query: (userId) => ({
        url: "/cart/",
        method: "POST",
        body: { ...userId },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData = []) => {
        if (responseData?.length > 0) {
          const newData = responseData?.map((ele, i) => {
            return { id: ele._id, ...ele };
          });
          return cartsAdapter.setAll(initialState, newData);
        } else {
          return responseData;
        }
      },
      providesTags: ["Cart"],
    }),
    createCart: builder.query({
      query: (userId) => ({
        url: "/cart/create-cart",
        method: "POST",
        body: { ...userId },
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["CartID"],
    }),
    emptyCart: builder.mutation({
      query: (cart) => {
        const { cartId } = cart;
        return {
          url: `/cart/empty-cart/${cartId}`,
          method: "DELETE",
          body: { ...cart },
        };
      },
      invalidatesTags: ["Cart", "CartID"],
    }),
    addCartItem: builder.mutation({
      query: (item) => {
        const { productId, cartId } = item;
        return {
          url: `/cart/add-item/?productId=${productId}&cartId=${cartId}`,
          method: "PATCH",
          body: { ...item },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (item) => {
        const { productId, cartId } = item;
        return {
          url: `/cart/del-item/?productId=${productId}&cartId=${cartId}`,
          method: "DELETE",
          body: { ...item },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    incCartItemCount: builder.mutation({
      query: (item) => {
        const { productId, cartId } = item;
        return {
          url: `/cart/inc-item/?productId=${productId}&cartId=${cartId}`,
          method: "PATCH",
          body: { ...item },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    decCartItemCount: builder.mutation({
      query: (item) => {
        const { productId, cartId } = item;
        return {
          url: `/cart/dec-item/?productId=${productId}&cartId=${cartId}`,
          method: "PATCH",
          body: { ...item },
        };
      },
      invalidatesTags: ["Cart"],
    }),
    createPayment: builder.query({
      query: (item) => {
        const { userId } = item;
        return {
          url: `/cart/stripe/create-checkout-session/?userId=${userId}`,
          method: "POST",
          body: { ...item },
        };
      },
    }),
  }),
});

export const selectCartsResult = cartApiSlice.endpoints.getCartItems.select();
export const selectCartIDResult = cartApiSlice.endpoints.createCart.select();

const selectCartsData = createSelector(
  selectCartsResult,
  (response) => response.data
);

const selectCartIDData = createSelector(
  selectCartIDResult,
  (response) => response.data
);

export const { selectAll: selectAllCarts, selectById: selectCartById } =
  cartsAdapter.getSelectors((state) => selectCartsData(state) ?? initialState);

export const { selectAll: selectAllCartID } = cartsAdapter.getSelectors(
  (state) => selectCartIDData(state) ?? initialState
);

export const {
  useCreateCartQuery,
  useLazyCreateCartQuery,
  useEmptyCartMutation,
  useAddCartItemMutation,
  useDeleteCartItemMutation,
  useGetCartItemsQuery,
  useIncCartItemCountMutation,
  useDecCartItemCountMutation,
  useLazyCreatePaymentQuery,
} = cartApiSlice;
