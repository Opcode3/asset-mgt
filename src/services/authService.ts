import { api } from "../lib/axios";
import type {
  LoginCredentials,
  LoginResponse,
  User,
  UserPayload,
  UserResponseType,
} from "../types/auth";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", credentials);
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await api.get<User>("/auth/profile");
    return response.data;
  },

  createUser: async (
    credentials: UserPayload,
    token: string | null
  ): Promise<UserResponseType> => {
    const response = await api.post<UserResponseType>("/auth", credentials, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  refreshToken: async (): Promise<{ token: string }> => {
    const response = await api.post<{ token: string }>("/auth/refresh");
    return response.data;
  },

  verifyEmail: async (token: string): Promise<UserResponseType> => {
    const response = await api.post<UserResponseType>(
      `/auth/verify-email?token=${token}`
    );

    console.log(`/auth/verify-email?token=${token}`);
    return response.data;
  },

  // Users
  getStaffList: async (token: string | null): Promise<UserResponseType[]> => {
    const response = await api.get<UserResponseType[]>("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(" and " + token);
    return response.data.data;
  },
};
