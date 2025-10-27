import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthState, User } from "../types/auth";
import { authService } from "../services/authService";

interface AuthStore extends AuthState {
  login: (user: User, token: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
  refreshToken: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user: User, token: string) =>
        set({ user, token, isAuthenticated: true }),

      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      setUser: (user: User) => set({ user }),

      refreshToken: async () => {
        try {
          const { token } = await authService.refreshToken();
          set({ token });
        } catch (error) {
          get().logout();
          throw error;
        }
      },

      initializeAuth: async () => {
        const { token, isAuthenticated } = get();
        if (token && isAuthenticated) {
          try {
            // Verify token is still valid by fetching profile
            const user = await authService.getProfile();
            set({ user });
          } catch (error) {
            // Token is invalid, logout
            get().logout();
          }
        }
      },
    }),
    {
      name: "auth-storage",
      // Only store token and user, not the entire state
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
      // On rehydrate, set isAuthenticated based on token presence
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isAuthenticated = !!state.token;
        }
      },
    }
  )
);
