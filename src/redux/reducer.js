import { createReducer } from "@reduxjs/toolkit";

const cartReducer = createReducer(
  { 
    cartItems: [],
    totalAmount: 0,
  },
  {
    addToCart: (state, action) => {
      const inputItem = action.payload;
      const isItemAvailable = state.cartItems.find(
        (i) => i.id === inputItem.id
      );
      if (isItemAvailable) {
        state.cartItems.forEach((i) => {
          if (i.id === inputItem.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(inputItem);
      }
    },
    decreaseQnt: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item.quantity > 1) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity -= 1;
        });
      }
    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },
    calculateTotal: (state) => {
      let sum = 0;
      state.cartItems.forEach((i) => {
        sum = sum + i.quantity * i.price;
      });
      state.totalAmount = +sum.toFixed(2);
    },
  }
);

export default cartReducer;
