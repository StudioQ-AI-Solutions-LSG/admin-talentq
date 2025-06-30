import { http } from "@/lib/api/axios";
import type { LoginCredentials, LoginResponse, User } from "../types";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
      const response = (await http.post(
        "/auth/login",
        credentials
      )) as unknown as LoginResponse;

      if (!response) {
        throw new Error("Invalid response from server");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },

  getProfile: async (): Promise<User> => {
    try {
      const response = (await http.get("/auth/me")) as unknown as User;

      if (!response) {
        throw new Error("Invalid profile response from server");
      }

      return response;
    } catch (error) {
      throw error;
    }
  },
};
