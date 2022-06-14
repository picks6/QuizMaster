import { useReducer } from "react";
import {
  SET_PERMISSIONS,
  // ADD_TO_CART,
  // UPDATE_CART_QUANTITY,
  // REMOVE_FROM_CART,
  // ADD_MULTIPLE_TO_CART,
  // UPDATE_CATEGORIES,
  // UPDATE_CURRENT_CATEGORY,
  // CLEAR_CART,
  // TOGGLE_CART
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_PERMISSIONS:

      return {
        ...state,
        permissions: [...action.permissions],
      };
    default:
      return state;
  }
};

export function useProductReducer(initialState) {
  return useReducer(reducer, initialState)
}
