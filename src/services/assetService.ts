import type {
  AssetPayload,
  AssignmentPayload,
  ReturnAssignmentPayload,
} from "../hooks/useAssets";
import { api } from "../lib/axios";
import type { AssetResponseType, AssignmentResponseType } from "../types/asset";

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
  // getAssetById: async (
  //   id: string,
  //   token: string | null
  // ): Promise<AssetResponseType> => {
  //   const response = await api.get<AssetResponseType>(`/assets/${id}`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   return response.data;
  // },

  getAssetById: async (id: string): Promise<AssetResponseType> => {
    const response = await api.get<AssetResponseType>(`/assets/${id}`);

    console.log({ response });
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

  updateAssetStatus: async (
    id: string,
    status: string,
    token: string | null
  ): Promise<AssetResponseType> => {
    const response = await api.patch<AssetResponseType>(
      `/assets/${id}/status`,
      {
        status,
      },
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
  // deleteAsset: async (id: string): Promise<void> => {
  //   await api.delete(`/assets/${id}`);
  // },

  // ✅ Assign asset to a user
  assignAsset: async (
    payload: AssignmentPayload,
    token: string | null
  ): Promise<AssignmentResponseType> => {
    const response = await api.post<AssignmentResponseType>(
      `/assets/assign`,
      // `/assets/${id}/assign`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  returnedAsset: async (
    payload: ReturnAssignmentPayload,
    token: string | null
  ): Promise<AssignmentResponseType> => {
    const response = await api.post<AssignmentResponseType>(
      `/assets/return`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  },

  // ✅ Get all assets
  getAllAssignedAssets: async (
    token: string | null
  ): Promise<AssignmentResponseType[]> => {
    console.log(`Bearer ${token}`);

    const response = await api.get<AssignmentResponseType[]>(
      "/assets/assigned",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },

  getAllReturnedAssets: async (
    token: string | null
  ): Promise<AssignmentResponseType[]> => {
    console.log(`Bearer ${token}`);

    const response = await api.get<AssignmentResponseType[]>(
      "/assets/returned",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
};
