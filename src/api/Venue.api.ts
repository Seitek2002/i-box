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
      { venueSlug: string; tableId?: string | number }
    >({
      query: ({ venueSlug, tableId }) => {
        if (!tableId) return `venues/${venueSlug}/`;
        if (!venueSlug || !tableId) return '/venues';

        return `venues/${venueSlug}/table/${tableId}/`;
      },
    }),
  }),
});

export const { useGetVenueQuery } = Venues;
