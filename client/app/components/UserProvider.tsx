import { useEffect, useState, type ReactNode } from "react";
import { UserContext } from "~/context/UserContext";
import { logout } from "~/services/auth";
import type { AuthResponse } from "~/types/auth";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);

  const changeUser = (user: AuthResponse | null) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user)
  }

  useEffect(() => {
    const userStr = localStorage.getItem("user");

    if (userStr) {
      try {
        const authRes = JSON.parse(userStr) as AuthResponse;
        setUser(authRes);
      } catch (e) {
        localStorage.removeItem("user");
        logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, changeUser}}>{children}</UserContext.Provider>
  );
}
