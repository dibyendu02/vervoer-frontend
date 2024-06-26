import * as actionTypes from '../actionTypes/actionTypes';

const initialState = {
  userId: null,
  name: '',
  email: '',
  phNo: '',
  gender: null,
  dob: null,
  anniversaryDate: null,
  token: null,
  referralCode: '',
  referredByReferralCode: null,
  isSignedIn: false,

  favorite: [],
  cuisinepreference: [],
  profileimg: null,
  toggleModal: false,
  guestId: null,
};

const user = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        userId: payload,
      };
    case actionTypes.GUEST_ID:
      return {
        ...state,
        guestId: payload,
      };
    case actionTypes.SET_IS_SIGNIN:
      return {
        ...state,
        isSignedIn: payload,
      };
    case actionTypes.SET_TOGGLE_MODAL:
      return {
        ...state,
        toggleModal: payload,
      };
    case actionTypes.SET_NAME:
      return {
        ...state,
        name: payload,
      };
    case actionTypes.SET_EMAIL:
      return {
        ...state,
        email: payload,
      };
    case actionTypes.SET_PHONE_NUMBER:
      return {
        ...state,
        phNo: payload,
      };

    case actionTypes.FAVORATES:
      return {
        ...state,
        favorite: payload,
      };
    case actionTypes.CUISINEPREFERENCE:
      return {
        ...state,
        cuisinepreference: payload,
      };
    case actionTypes.PROFILEIMAGE:
      return {
        ...state,
        profileimg: payload,
      };

    case actionTypes.SET_ANNIVERSARY_DATE:
      return {
        ...state,
        anniversaryDate: payload,
      };
    case actionTypes.SET_DOB:
      return {
        ...state,
        dob: payload,
      };
    case actionTypes.CLEAR_SESSION:
      return {
        ...state,
        userId: null,
        name: '',
        email: '',
        phNo: '',
        gender: null,
        dob: null,
        anniversaryDate: null,
        token: null,
        referralCode: '',
        referredByReferralCode: null,
        isSignedIn: false,

        favorite: [],
        cuisinepreference: [],
        profileimg: '',
      };
    default:
      return state;
  }
};

export default user;
