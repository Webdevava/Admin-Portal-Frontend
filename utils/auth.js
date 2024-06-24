// utils/auth.js

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useRequireAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token is found
    }
  }, []);

  return; // This hook doesn't need to return anything
};
