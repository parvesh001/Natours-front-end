import { configureStore } from "@reduxjs/toolkit";
import tourSliceReducer from "./tour-slice";

const store = configureStore({
  reducer: { tour: tourSliceReducer },
});

export default store;
