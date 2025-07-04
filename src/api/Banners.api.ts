import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import i18n from 'i18next';

export interface IBanner {
  id: number;
  title: string;
  text: string;
  banner: string;
  image: string;
  url: string;
}

export const Banners = createApi({
  reducerPath: 'banners',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ibox.kg/api/',
    prepareHeaders: (headers) => {
      const currentLanguage = i18n.language || 'en';
      headers.set('Accept-Language', currentLanguage);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getBanners: builder.query<IBanner[], { venue_slug: string }>({
      query: ({ venue_slug }) => ({
        url: 'banners',
        method: 'GET',
        params: {
          venue_slug,
        },
      }),
    }),
    addBanner: builder.mutation<IBanner, Partial<IBanner>>({
      query: (newBanner) => ({
        url: 'banners',
        method: 'POST',
        body: newBanner,
      }),
    }),
  }),
});

export const { useGetBannersQuery, useAddBannerMutation } = Banners;
