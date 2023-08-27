import { createSelector } from "@reduxjs/toolkit";

const selectCartReducer = (state) => state.cart;

export const selectCartCount = createSelector(
  [selectCartReducer],
  (cart) => cart.cartCount
);
