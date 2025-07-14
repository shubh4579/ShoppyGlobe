// import createSlice from redux toolkit to create reducers and actions
import { createSlice } from "@reduxjs/toolkit";

//define the cart slice
const cartSlice = createSlice({
  name: "cart", //name of the slice
  initialState: [], //cart starts with empty array
  reducers: {
    //add item to the cart
    addToCart: (state, action) => {
      // check if the item is already in the cart
      const item = state.find((i) => i.id === action.payload.id);
      if (item) {
        //if item is exists just increase the quantity
        item.quantity += 1;
      } else {
        //if not add the quantity by 1
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    //remove item from cart using its id
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    //update quantity of an item
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((i) => i.id === id);
      if (item) item.quantity = quantity;
    },
    //empty all items from the cart
    emptyCart: () => [],
  },
});

//export actions
export const { addToCart, removeFromCart, updateQuantity, emptyCart } =
  cartSlice.actions;

// export reducer to use in the store
export default cartSlice.reducer;
