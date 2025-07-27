import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IVenues } from 'src/types/venues.types';

export const Venues = createApi({
  reducerPath: 'venuesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://ibox.kg/api/',
    prepareHeaders: (headers) => {
      const currentLanguage = localStorage.getItem('i18nextLng') || 'en';
      headers.set('Accept-Language', currentLanguage);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getVenue: builder.query<
      IVenues,
      { fridgeSlug: string; tableId?: string | number }
    >({
      query: ({ fridgeSlug, tableId }) => {
        if (!tableId) return `fridges/${fridgeSlug}/`;
        if (!fridgeSlug || !tableId) return '/fridges';

        return `fridges/${fridgeSlug}/table/${tableId}/`;
      },
    }),
  }),
});

export const { useGetVenueQuery } = Venues;
