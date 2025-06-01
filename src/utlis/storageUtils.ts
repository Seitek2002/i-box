import { IFoodCart } from 'types/products.types';
import { IVenues } from 'types/venues.types';

import { IUsersData } from 'src/store/yourFeatureSlice';

export const saveCartToStorage = (cart: IFoodCart[]) => {
  localStorage.setItem('cartItems', JSON.stringify(cart));
};

export const loadCartFromStorage = () => {
  const storedItems = localStorage.getItem('cartItems');
  return storedItems ? JSON.parse(storedItems) : [];
};

export const saveUsersDataToStorage = (users: IUsersData) => {
  localStorage.setItem('users', JSON.stringify(users));
};

export const loadUsersDataFromStorage: () => IUsersData = () => {
  const storedUsers = localStorage.getItem('users');
  return storedUsers
    ? JSON.parse(storedUsers)
    : { phoneNumber: '', address: '', comment: '', name: '' };
};

export const saveVenueToStorage = (venue: IVenues) => {
  localStorage.setItem('venue', JSON.stringify(venue));
};

export const loadVenueFromStorage: () => IVenues = () => {
  const storedVenue = localStorage.getItem('venue');
  return storedVenue
    ? JSON.parse(storedVenue)
    : {
        colorTheme: '#875AFF',
        companyName: '',
        slug: '',
        logo: '',
        schedule: '',
        table: {
          id: 0,
          tableNum: '',
        },
      };
};
