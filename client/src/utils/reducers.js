import { useReducer } from "react";
import {
  SET_PERMISSIONS,
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
