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

export type ReturnAssignmentPayload = {
  assignmentId: string;
  returnedComment: string;
  assetStatus: string; // This will be used to update the asset's status
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
    data: assignedAssets,
    isLoading: isAssigning,
    error: assignedError,
  } = useQuery<AssignmentResponseType[]>({
    queryKey: ["assgned_assets_list"],
    queryFn: async () => {
      const res = await assetService.getAllAssignedAssets(token);
      return res;
    },
  });

  const {
    data: returnedAssets,
    isLoading: isReturning,
    error: returnedError,
  } = useQuery<AssignmentResponseType[]>({
    queryKey: ["returned_assets_list"],
    queryFn: async () => {
      const res = await assetService.getAllReturnedAssets(token);
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

  const updateAssetStatus = useMutation({
    mutationFn: (payload: { status: string; id: string }) =>
      assetService.updateAssetStatus(payload.id, payload.status, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets_list"] });
      toast.success("Asset updated successfully!");
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
      queryClient.invalidateQueries({ queryKey: ["assets_list"] });
      toast.success("Asset assigned successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to assign asset. Please try again.";
      toast.error(message);
    },
  });

  const returnAsset = useMutation({
    mutationFn: (payload: ReturnAssignmentPayload) =>
      assetService.returnedAsset(payload, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets_list"] });
      queryClient.invalidateQueries({ queryKey: ["returned_assets_list"] });
      queryClient.invalidateQueries({ queryKey: ["assgned_assets_list"] });
      toast.success("Asset returned successfully!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to assign asset. Please try again.";
      toast.error(message);
    },
  });

  const deleteAsset = useMutation({
    mutationFn: (assetId: string) => assetService.deleteAsset(assetId, token),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["assgned_assets_list"] });
      queryClient.invalidateQueries({ queryKey: ["assets_list"] });
      toast.success("Asset deleted successfully!");
      console.log(res);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Failed to assign asset. Please try again.";
      toast.error(message);

      console.log(error);
    },
    onSettled: (res) => {
      console.log(res);
    },
  });

  return {
    assets,
    isLoading,
    error,
    assignedAssets,
    isAssigning,
    assignedError,
    returnedAssets,
    isReturning,
    returnedError,
    addAsset: addAsset.mutate,
    addAssignAsset: assignAsset.mutate,
    addReturnAsset: returnAsset.mutate,
    editAssetStatus: updateAssetStatus.mutate,
    deleteAsset: deleteAsset.mutate,
  };
}
