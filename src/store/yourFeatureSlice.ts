import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IFoodCart, IOrderProduct } from 'src/types/products.types';
import { IVenues } from 'src/types/venues.types';

import {
  loadCartFromStorage,
  loadUsersDataFromStorage,
  loadVenueFromStorage,
  saveCartToStorage,
  saveUsersDataToStorage,
} from 'src/utlis/storageUtils';

export interface IUsersData {
  phoneNumber: string;
  address?: string;
  comment?: string;
  name?: string;
  type?: number;
  activeSpot: number;
}

interface YourFeatureState {
  value: number;
  isShow: boolean;
  cart: IFoodCart[];
  usersData: IUsersData;
  buttonText: string;
  venue: IVenues;
  order: IOrderProduct;
}

const initialState: YourFeatureState = {
  value: 0,
  isShow: false,
  cart: loadCartFromStorage(),
  usersData: loadUsersDataFromStorage(),
  buttonText: 'Заказать',
  venue: {
    ...loadVenueFromStorage(),
    colorTheme: '#f80101',
  },
  order: {
    comment: '',
    orderProducts: [],
    phone: '',
    serviceMode: 0,
    servicePrice: '',
    tableNum: '',
    tipsPrice: '',
    fridgeSlug: '',
    spotSlug: '',
  },
};

const yourFeatureSlice = createSlice({
  name: 'yourFeature',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setShow: (state) => {
      state.isShow = !state.isShow;
    },
    setVenue: (state, action: PayloadAction<IVenues>) => {
      state.venue = action.payload;
      localStorage.setItem('venue', JSON.stringify(state.venue));
    },
    addToCart: (state, action: PayloadAction<IFoodCart>) => {
      const foundItem = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (foundItem) {
        foundItem.quantity += action.payload.quantity;
      } else {
        state.cart.push({
          ...action.payload,
          quantity: action.payload.quantity,
        });
      }
      saveCartToStorage(state.cart);
    },
    incrementFromCart: (state, action) => {
      const foundItem = state.cart.find((item) => item.id == action.payload.id);
      if (foundItem) {
        if (foundItem.quantity > 1) {
          foundItem.quantity -= 1;
        } else {
          state.cart = state.cart.filter(
            (item) => item.id != action.payload.id
          );
        }
      }
      saveCartToStorage(state.cart);
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem('cartItems');
    },
    setButtonText: (state, action: PayloadAction<string>) => {
      state.buttonText = action.payload;
    },
    setOrder: (state, action: PayloadAction<IOrderProduct>) => {
      state.order = action.payload;
    },
    setUsersData: (state, action) => {
      state.usersData = action.payload;
      saveUsersDataToStorage(action.payload);
    },
  },
});

export const {
  increment,
  decrement,
  setShow,
  setVenue,
  clearCart,
  setButtonText,
  setOrder,
  addToCart,
  incrementFromCart,
  setUsersData,
} = yourFeatureSlice.actions;

export default yourFeatureSlice.reducer;
