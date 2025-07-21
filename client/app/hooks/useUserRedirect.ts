import { useEffect } from "react";
import { useNavigate } from "react-router";
import { refresh } from "~/services/auth";

export function useUserRedirect(intent: "protect" | "skip") {
  const navigate = useNavigate();

  useEffect(() => {
    const asyncFunc = async () => {
      const isRefreshable = await refresh();
      if (isRefreshable && intent === "skip") {
        navigate("/dashboard");
      } else if (!isRefreshable && intent === "protect") {
        navigate("/login");
      }
    };
    asyncFunc();
  }, []);
}
