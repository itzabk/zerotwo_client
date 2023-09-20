import { apiSlice } from "../../config/api";

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (userId) => ({
        url: `/orders/${userId}`,
        method: "GET",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData = []) => {
        return responseData.map((ele) => {
          return { ...ele, id: ele._id };
        });
      },
      providesTags: (result = [], error, arg) => {
        return [{ type: "Orders", id: arg }];
      },
    }),
    getOrders: builder.query({
      query: () => ({
        url: `/orders/`,
        method: "GET",
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData = []) => {
        return responseData.map((ele) => {
          return { ...ele, id: ele._id };
        });
      },
      providesTags: (result = [], error, arg) => {
        if (result.length > 0) {
          return [
            "Orders",
            ...result?.map((ele) => ({ type: "Orders", id: ele })),
          ];
        } else {
          return ["Orders"];
        }
      },
    }),
  }),
});

export const { useGetOrderQuery, useGetOrdersQuery } = orderApiSlice;
