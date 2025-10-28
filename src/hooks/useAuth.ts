import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { authService } from "../services/authService";
import type { LoginCredentials } from "../types/auth";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

export const useLogin = () => {
  const { login } = useAuthStore();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (res) => {
      login(res.data.user, res.data.access_token);
      console.log("Login successful, user:", res);
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      toast.success("Login successful");
      navigate({ to: "/dashboard" });
    },
    onError: (error: any) => {
      console.log(error);
      const message =
        error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    },
  });
};

export const useRefreshToken = () => {
  const { refreshToken } = useAuthStore();

  return useMutation({
    mutationFn: () => refreshToken(),
  });
};

export const verifyAccountEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
  });
};


export const signAssetAgreement = () => {
  return useMutation({
    mutationFn: (token: string) => authService.signAssetAgreement(token),
  });
};
