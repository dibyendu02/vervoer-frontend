import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from '../reducers/AuthReducer';
import DrycleanerReducer from '../reducers/DrycleanerReducer';
import CartReducer from '../reducers/CartReducer';
import MerchantReducer from '../reducers/MerchantReducer';

const reducer = {
  authreducer: AuthReducer,
  drycleanerreducer: DrycleanerReducer,
  cartReducer: CartReducer,
  merchantReducer: MerchantReducer,
};

export const store = configureStore({reducer});
