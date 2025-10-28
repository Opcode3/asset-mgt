import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { assetService } from "../services/assetService";
import { useTabStore } from "../store/tabStore";
import type { AssetResponseType, AssignmentResponseType } from "../types/asset";

// --------------------------------
// ✅ Types
// --------------------------------
export type AssetPayload = {
  assetNo: string;
  serialNo: string;
  assetType: string;
  description?: string;
  location?: string;
  images?: File[];
};

// export type AssetResponseType = {
//   _id: string;
//   assetNo: string;
//   serialNo: string;
//   assetType: string;
//   imageUrls: string[];
//   description?: string;
//   location?: string;
//   status: "available" | "assigned" | "maintenance" | "retired";
//   createdAt: string;
//   updatedAt: string;
// };

export type AssignmentPayload = {
  assetId: string;
  assignedToEmail: string;
  assignedToName: string;
  comment?: string;
  returnedComment?: string;
};

// --------------------------------
// ✅ Zustand Store
// --------------------------------
type AssetState = {
  selectedAsset: AssetResponseType | null;
  setSelectedAsset: (asset: AssetResponseType) => void;
};

export const useAssetStore = create<AssetState>((set) => ({
  selectedAsset: null,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
}));

// --------------------------------
// ✅ Hook: useAssets()
// --------------------------------
export function useAssets() {
  const queryClient = useQueryClient();
  const token = useAuthStore.getState().token;
  const navigate = useNavigate();
  const { setTab } = useTabStore();

  // 📥 GET all assets
  const {
    data: assets,
    isLoading,
    error,
  } = useQuery<AssetResponseType[]>({
    queryKey: ["assets_list"],
    queryFn: async () => {
      const res = await assetService.getAllAssets(token);
      return res;
    },
  });

  const {
    data: returnedAssets,
    isLoading: isReturning,
    error: returnedError,
  } = useQuery<AssignmentResponseType[]>({
    queryKey: ["assgned_assets_list"],
    queryFn: async () => {
      const res = await assetService.getAllAssignedAssets(token);
      return res;
    },
  });

  // ➕ POST new asset (with images)
  const addAsset = useMutation({
    mutationFn: (payload: FormData) => assetService.createAsset(payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets_list"] });
      toast.success("Asset created successfully!");
      setTab("assets");
      navigate({ to: "/dashboard" });
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to create asset. Please try again.";
      toast.error(message);
    },
  });

  // 🧾 Assign asset
  const assignAsset = useMutation({
    mutationFn: (payload: AssignmentPayload) =>
      assetService.assignAsset(payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assgned_assets_list"] });
      toast.success("Asset assigned successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to assign asset. Please try again.";
      toast.error(message);
    },
  });

  return {
    assets,
    isLoading,
    error,
    returnedAssets,
    isReturning,
    returnedError,
    addAsset: addAsset.mutate,
    addAssignAsset: assignAsset.mutate,
  };
}
