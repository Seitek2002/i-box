import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IOrder, IOrderById, IReqCreateOrder } from 'src/types/orders.types';

import i18n from 'i18next';

export const Orders = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ibox.kg/api/',
    prepareHeaders: (headers) => {
      const currentLanguage = i18n.language || 'en';
      headers.set('Accept-Language', currentLanguage);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<
      IOrder[],
      {
        tableNum?: string;
        fridgeSlug?: string;
        spotSlug?: string;
        phone?: string;
      }
    >({
      query: ({ tableNum, fridgeSlug, spotSlug, phone }) => {
        const params = new URLSearchParams();
        if (tableNum) params.append('tableNum', tableNum);
        if (fridgeSlug) params.append('fridgeSlug', fridgeSlug);
        if (spotSlug) params.append('spotSlug', spotSlug);
        if (phone) params.append('phone', phone);

        return `orders/?${params.toString()}`;
      },
    }),
    postOrders: builder.mutation<{ paymentUrl: string }, IReqCreateOrder>({
      query: (newOrder) => {
        return {
          url: 'orders/',
          method: 'POST',
          body: newOrder,
        };
      },
    }),
    getOrdersById: builder.query<IOrderById, { id: number }>({
      query: ({ id }) => {
        return `orders/${id}/`;
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  usePostOrdersMutation,
  useGetOrdersByIdQuery,
  useLazyGetOrdersByIdQuery,
} = Orders;
