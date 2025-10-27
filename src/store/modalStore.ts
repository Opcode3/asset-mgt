import { create } from "zustand";

export type WhichType = "add_asset" | "add_staff" | null;
interface ModalStore {
  isOpen: boolean;
  which: WhichType;
  resetWhich: () => void;
  setWhich: (which: WhichType) => void;
  openModal: () => void;
  closeModal: () => void;
}

import { persist } from "zustand/middleware";
// import type { TMResponseType } from "../hooks/useTM";
export const useModalStore = create<ModalStore>()(
  // devtools(
  persist(
    (set) => ({
      isOpen: false,
      which: null,
      resetWhich: () => set({ which: null, isOpen: false }),
      setWhich: (which) => set({ which }),
      openModal: () => set({ isOpen: true }),
      closeModal: () => set({ isOpen: false }),
    }),
    { name: "modal-storage" }
  )
  // )
);
