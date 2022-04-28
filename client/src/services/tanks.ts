import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";
import { Tank } from "../types/Tank";

export const tanksApi = createApi({
  reducerPath: "tanks",
  baseQuery: fetchBaseQuery({
    baseUrl: "/tanks",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getTanks: builder.query({
      query: () => "",
    }),
    getTankDetails: builder.query({
      query: (id) => `${id}`,
    }),
    createTank: builder.mutation({
      query: (body: Tank) => ({
        url: `create`,
        method: "POST",
        body: body,
      }),
    }),
    deleteTank: builder.mutation({
      query: (id: string) => ({
        url: `${id}`,
        method: "DELETE",
      }),
    }),
    editTank: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `${id}`,
        method: "PUT",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetTanksQuery,
  useCreateTankMutation,
  useDeleteTankMutation,
  useEditTankMutation,
  useGetTankDetailsQuery,
} = tanksApi;
