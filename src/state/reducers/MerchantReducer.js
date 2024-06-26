import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  parkingMerchant: {
    name: '',
    address: '',
    state: '',
    city: '',
    zip: '',
    image: {},
    about: '',
    parking_slot: '',
  },
};

const MerchantReducer = createSlice({
  name: 'parkingMerchant',
  initialState,
  reducers: {
    setParkingMerchantName(state, action) {
      state.parkingMerchant.name = action.payload.name;
      state.parkingMerchant.address = action.payload.address;
      state.parkingMerchant.state = action.payload.state;
      state.parkingMerchant.city = action.payload.city;
      state.parkingMerchant.zip = action.payload.zip;
    },
    setParkingMerchantImage(state, action) {
      state.parkingMerchant.image = action.payload;
    },
    setParkingMerchantAbout(state, action) {
      state.parkingMerchant.about = action.payload;
    },
    setParkingMerchantParkingSlot(state, action) {
      state.parkingMerchant.parking_slot = action.payload;
    },
  },
});

export const {
  setParkingMerchantAbout,
  setParkingMerchantImage,
  setParkingMerchantName,
  setParkingMerchantParkingSlot,
} = MerchantReducer.actions;
export default MerchantReducer.reducer;
