import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { useAuthStore } from "../store/authStore";
import type { UserPayload, UserResponseType } from "../types/auth";
import { authService } from "../services/authService";
import { toast } from "react-toastify";
import { useNavigate } from "@tanstack/react-router";

// --------------------------------
// ✅ Type Definitions
// --------------------------------

export type ModifyUserPayload = UserPayload & {
  id: number;
};

export type TMResponseType = {
  id: number;
  slug: string;
  name: string;
  role: string;
  email: string;
  desc: string;
  image: string;
  created_at: string;
  updated_at: string;
};

// --------------------------------
// ✅ Zustand Store
// --------------------------------
type TMState = {
  selectedTM: TMResponseType | null;
  setSelectedTM: (tm: TMResponseType) => void;
};

export const useTMStore = create<TMState>((set) => ({
  selectedTM: null,
  setSelectedTM: (tm) => set({ selectedTM: tm }),
}));

// --------------------------------
// ✅ Hook: useTMs()
// --------------------------------
export function useStaff() {
  const queryClient = useQueryClient();

  const token = useAuthStore.getState().token;

  const navigate = useNavigate();

  // 📥 GET all tms
  // const {
  //   data: staffs,
  //   isLoading,
  //   error,
  // } = useQuery<TMResponseType[]>({
  //   queryKey: ["staff_list"],
  //   queryFn: async () => {
  //     const res = await api.get(`${TEAMMEMBER_URL}`);
  //     return res.data;
  //   },
  // });

  const {
    data: staffs,
    isLoading,
    error,
  } = useQuery<UserResponseType[]>({
    queryKey: ["staff_list"],
    queryFn: async () => {
      const res = authService.getStaffList(token);
      return res;
    },
  });

  // ➕ POST new tm
  // const addTM = useMutation({
  //   mutationFn: (newTM: UserPayload) =>
  //     api.post(TEAMMEMBER_URL, newTM, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["staff_list"] }),
  // });

  const addStaff = useMutation({
    mutationFn: (credentials: UserPayload) =>
      authService.createUser(credentials, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff_list"] });
      navigate({ to: "/dashboard" });
    },
    onError: (error: any) => {
      console.log(error);
      const message =
        error?.response?.data?.message ||
        "Adding Staff failed. Please try again.";
      toast.error(message);
    },
  });

  // ✏️ PUT/PATCH update tm
  // const updateTM = useMutation({
  //   mutationFn: (payload: ModifyUserPayload) =>
  //     api.put(`${TEAMMEMBER_URL}`, payload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }),
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tms"] }),
  // });

  // const deleteMutation = useMutation({
  //   mutationFn: async (id: number): Promise<any> => {
  //     const res = await api.delete(`${TEAMMEMBER_URL}?id=${id}`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return res.data;
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["tms"] });
  //   },
  // });

  return {
    staffs,
    isLoading,
    error,
    addStaff: addStaff.mutate,
    // updateStaff: updateTM.mutate,
    // deleteStaff: deleteMutation.mutate,
  };
}
