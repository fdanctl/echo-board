import { useContext, createContext, type ActionDispatch } from "react";
import type { TrackInfo } from "~/types/tracks";

export enum ActionType {
  ADD_ITEM,
  REMOVE_ITEM,
  CLEAR_CART,
}

interface Action {
  type: ActionType;
  payload: TrackInfo;
}

export const cartReducer = (state: TrackInfo[], action: Action) => {
  switch (action.type) {
    case ActionType.ADD_ITEM: {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state;
      } else {
        return [...state, { ...action.payload }];
      }
    }

    case ActionType.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id);

    case ActionType.CLEAR_CART:
      return [];

    default:
      return state;
  }
};

export const CartContext = createContext<
  { cart: TrackInfo[]; dispatch: ActionDispatch<[action: Action]> } | undefined
>(undefined);

export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("CartContext must be used within a CartContext.Provider");
  }
  return context;
}
