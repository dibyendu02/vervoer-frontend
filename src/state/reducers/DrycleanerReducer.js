import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dryCleaners: [],
  selectedDryCleaner: {},
  dryCleanerProfile: {
    "coordinates": {
      "lng": 0,
      "lat": 0
    },
    "_id": "",
    "userId": "",
    "about": "",
    "status": "",
    "created_at": "",
    "updated_at": "",
    "availability": [],
    "acceptItems": [],
    "images": [],
    "merchantCity": "",
    "merchantName": ""
  },
  dryCleanerAvailability: []
}

const DrycleanerReducer = createSlice({
  name: 'drycleaner',
  initialState,
  reducers: {
    setDrycleanerList(state, action) {
      state.dryCleaners = action.payload
    },
    setSelectedDryCleaner(state, action) {
      state.selectedDryCleaner = action.payload
    },
    setDryCleanerProfile(state, action) {

      state.dryCleanerProfile = action.payload
    },
    setDryCleanerAvailability(state, action) {
      state.dryCleanerProfile.availability.push(action.payload)
    },
    setAllDayAvailabile(state, action) {
      state.dryCleanerProfile.availability = action.payload
    },
    setAllItemsAcceptable(state, action) {
      state.dryCleanerProfile.acceptItems = action.payload
    },
    removeDryCleanerAvailability(state, action) {
      state.dryCleanerProfile.availability.splice(action.payload, 1);
    },
    editDryCleanerAvailability(state, action) {
      state.dryCleanerProfile.availability = action.payload
    },
    setDryCleanerAcceptedItems(state, action) {
      state.dryCleanerProfile.acceptItems.push(action.payload)
    },
    removeDryCleanerAcceptedItems(state, action) {
      state.dryCleanerProfile.acceptItems.splice(action.payload, 1);
    },
    setDryCleanerAcceptedItemsPrice(state, action) {
      state.dryCleanerProfile.acceptItems = action.payload
    },
    setDryCleanerImages(state, action) {
      state.dryCleanerProfile.images.push(action.payload);
    },
   removeDryCleanerImages(state, action) {
      state.dryCleanerProfile.images.splice(action.payload, 1);
    },
  },
})

export const { 
  setDrycleanerList, 
  setSelectedDryCleaner, 
  setDryCleanerProfile, 
  setDryCleanerAvailability, 
  removeDryCleanerAvailability,
  editDryCleanerAvailability,
  setAllDayAvailabile,
  setDryCleanerAcceptedItems,
  removeDryCleanerAcceptedItems,
  setDryCleanerAcceptedItemsPrice,
  setDryCleanerImages,
  removeDryCleanerImages,
  setAllItemsAcceptable 
} = DrycleanerReducer.actions
export default DrycleanerReducer.reducer
