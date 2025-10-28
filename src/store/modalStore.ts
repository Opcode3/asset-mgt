import { create } from "zustand";

export type WhichType =
  | "add_asset"
  | "add_staff"
  | "assign_asset"
  | "view_assigned_asset"
  | null;
interface ModalStore {
  isOpen: boolean;
  which: WhichType;
  data: AssetResponseType | AssignmentResponseType | null;
  resetWhich: () => void;
  setWhich: (which: WhichType) => void;
  setData: (data: AssetResponseType | AssignmentResponseType | null) => void;
  openModal: () => void;
  closeModal: () => void;
}

import { persist } from "zustand/middleware";
import type { AssetResponseType, AssignmentResponseType } from "../types/asset";
// import type { TMResponseType } from "../hooks/useTM";
export const useModalStore = create<ModalStore>()(
  // devtools(
  persist(
    (set) => ({
      isOpen: false,
      which: null,
      data: null,
      setData: (data) => set({ data }),
      resetWhich: () => set({ which: null, isOpen: false, data: null }),
      setWhich: (which) => set({ which }),
      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false, data: null }),
    }),
    { name: "modal-storage" }
  )
  // )
);
