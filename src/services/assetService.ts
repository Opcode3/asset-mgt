import type { AssetPayload, AssignmentPayload } from "../hooks/useAssets";
import { api } from "../lib/axios";
import type { AssetResponseType } from "../types/asset";

export const assetService = {
  // ✅ Create a new asset
  createAsset: async (
    payload: FormData, //AssetPayload,
    token: string | null
  ): Promise<AssetResponseType> => {
    const response = await api.post<AssetResponseType>("/assets", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // ✅ Get all assets
  getAllAssets: async (token: string | null): Promise<AssetResponseType[]> => {
    console.log(`Bearer ${token}`);

    const response = await api.get<AssetResponseType[]>("/assets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  // ✅ Get a single asset by ID
  getAssetById: async (
    id: string,
    token: string | null
  ): Promise<AssetResponseType> => {
    const response = await api.get<AssetResponseType>(`/assets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  // ✅ Update an asset
  updateAsset: async (
    id: string,
    payload: Partial<AssetPayload>,
    token: string | null
  ): Promise<AssetResponseType> => {
    const response = await api.patch<AssetResponseType>(
      `/assets/${id}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // ✅ Delete an asset
  deleteAsset: async (id: string, token: string | null): Promise<void> => {
    await api.delete(`/assets/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  // ✅ Assign asset to a user
  assignAsset: async (
    id: string, // asset ID
    payload: AssignmentPayload,
    token: string | null
  ): Promise<AssetResponseType> => {
    const response = await api.post<AssetResponseType>(
      `/assets/${id}/assign`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },
};
