import axios from "axios";
import { LoginCredentials, LoginResponse } from "../types/auth.type";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = await axios.post<LoginResponse>(
        `${API_BASE_URL}/auth/login`,
        credentials,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error("Invalid credentials");
      }
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  getCurrentUser: async (token: string): Promise<LoginResponse> => {
    try {
      const response = await axios.get<LoginResponse>(
        `${API_BASE_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Failed to get user data"
      );
    }
  },
};
