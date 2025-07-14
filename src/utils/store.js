// import configureStore to create the redux store
import { configureStore } from "@reduxjs/toolkit";

//import the cartReducer
import cartReducer from "./cartSlice";

//create and export the redux store
export const store = configureStore({
  reducer: {
    //cart is the name of state slice and cartReducer handle its logic
    cart: cartReducer,
  },
});
