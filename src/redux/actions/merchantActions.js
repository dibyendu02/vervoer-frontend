import * as actionTypes from '../actionTypes/actionTypes';

export const setMerchantName = payload => ({
  type: actionTypes.SET_MERCHANT_NAME,
  payload,
});

export const setMerchantImage = payload => ({
  type: actionTypes.SET_MERCHANT_IMAGE,
  payload,
});

export const setMerchantAbout = payload => ({
  type: actionTypes.SET_MERCHANT_ABOUT,
  payload,
});
export const setMerchantSpaces = payload => ({
  type: actionTypes.SET_MERCHANT_PARKING_SLOT,
  payload,
});
