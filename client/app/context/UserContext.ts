import { createContext, useContext } from "react";
import type { AuthResponse } from "~/types/auth";

export const UserContext = createContext<
  | {
    user: AuthResponse | null;
    changeUser: (user: AuthResponse | null) => void;
  }
  | undefined
>(undefined);

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserContext must be used within a UserContext.Provider");
  }
  return context;
}
