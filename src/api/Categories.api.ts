import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ICategory } from 'src/types/categories.types';

import i18n from 'i18next';

export const Categories = createApi({
  reducerPath: 'categories',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://imenu.kg/api/',
    prepareHeaders: (headers) => {
      const currentLanguage = i18n.language || 'en';
      headers.set('Accept-Language', currentLanguage);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], { venueSlug?: string }>({
      query: ({ venueSlug }) => ({
        url: 'categories',
        method: 'GET',
        params: {
          venueSlug,
        },
      }),
    }),
    addCategories: builder.mutation<void, ICategory>({
      query: (newCategory) => ({
        url: 'posts',
        method: 'POST',
        body: newCategory,
      }),
    }),
  }),
});

export const { useGetCategoriesQuery, useAddCategoriesMutation } = Categories;
