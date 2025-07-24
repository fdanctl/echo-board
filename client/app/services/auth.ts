import type { ApiResponse } from "~/types/api";
import type { AuthResponse, Credentials, NewUser } from "~/types/auth";
import { BASE_URL, BASE_URL_CLIENT } from "./api";

export const signUp = async (c: NewUser) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(c),
    });

    if (!response.ok) {
      const errorData: ApiResponse<AuthResponse> = await response
        .json()
        .catch(() => ({}));
      return errorData;
    }

    const data: ApiResponse<AuthResponse> = await response.json();
    return data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const login = async (c: Credentials) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(c),
    });

    if (!response.ok) {
      const errorData: ApiResponse<AuthResponse> = await response
        .json()
        .catch(() => ({}));
      return errorData;
    }

    const data: ApiResponse<AuthResponse> = await response.json();
    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};

export const refresh = async () => {
  console.log("refreshing..");
  try {
    const response = await fetch(`${BASE_URL_CLIENT}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("Refresh error:", error);
    throw error;
  }
};
