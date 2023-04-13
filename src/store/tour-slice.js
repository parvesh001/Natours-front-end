import { createSlice } from "@reduxjs/toolkit";

const tourSlice = createSlice({
  name: "tour slice",
  initialState: {
    tours: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    createTour(state, action) {
      const availableCapacity =
        action.payload.maxGroupSize * action.payload.startDates.length;
      state.tours.push({
        ...action.payload,
        tourBookingsDetails: { availableCapacity, participants: [] },
      });
    },
    updateTour(state, action) {
      const updatedTourIndex = state.tours.findIndex(
        (tour) => tour._id === action.payload._id
      );
      const availableCapacity =
        state.tours[updatedTourIndex].tourBookingsDetails.availableCapacity;
      const participants = [
        ...state.tours[updatedTourIndex].tourBookingsDetails.participants,
      ];
      state.tours[updatedTourIndex] = {
        ...action.payload,
        tourBookingsDetails: { availableCapacity, participants },
      };
    },
    deleteTour(state, action) {
      const filteredTours = state.tours.filter(
        (tour) => tour._id !== action.payload
      );
      state.tours = filteredTours;
    },
    populateTours(state, action) {
      state.tours = [...action.payload];
    },
    bookTour(state, action) {
      let bookedTourIndex = state.tours.findIndex(
        (tour) => tour._id === action.payload.tourId
      );
      state.tours[bookedTourIndex].tourBookingsDetails.participants.push(
        action.payload.userId
      );
      state.tours[bookedTourIndex].tourBookingsDetails.availableCapacity -= 1;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setHasError(state, action) {
      state.error = action.payload;
    },
  },
});

const tourSliceReducer = tourSlice.reducer;
export const tourSliceActions = tourSlice.actions;

export default tourSliceReducer;
