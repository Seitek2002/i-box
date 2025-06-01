import { configureStore } from '@reduxjs/toolkit';

import yourReducer from './yourFeatureSlice';

import { Banners, Categories, Orders, Products, Venues } from 'src/api';

const store = configureStore({
  reducer: {
    yourFeature: yourReducer,
    [Categories.reducerPath]: Categories.reducer,
    [Products.reducerPath]: Products.reducer,
    [Orders.reducerPath]: Orders.reducer,
    [Venues.reducerPath]: Venues.reducer,
    [Banners.reducerPath]: Banners.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(Categories.middleware)
      .concat(Banners.middleware)
      .concat(Products.middleware)
      .concat(Orders.middleware)
      .concat(Venues.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch'];

export default store;
