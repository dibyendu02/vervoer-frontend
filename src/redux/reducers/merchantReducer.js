// import {createSlice} from '@reduxjs/toolkit';
import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
  parkingMerchant: {
    name: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    image: '',
    about: '',
    parking_slot: '',
  },
};

const merchant = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case actionTypes.SET_MERCHANT_NAME:
      return {
        ...state,
        name: payload.name,
        address: payload.address,
        state: payload.state,
        city: payload.city,
        zip: payload.zip,
      };
    case actionTypes.SET_MERCHANT_IMAGE:
      return {
        ...state,
        image: payload,
      };
    case actionTypes.SET_MERCHANT_ABOUT:
      return {
        ...state,
        about: payload,
      };

    case actionTypes.SET_MERCHANT_PARKING_SLOT:
      return {
        ...state,
        parking_slot: payload,
      };
    default:
      return state;
  }
};

export default merchant;
