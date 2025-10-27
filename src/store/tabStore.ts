import { create } from "zustand";

export type TabType = "staff" | "assets" | "return" | "assignments" | null;
interface ModalStore {
  tab: TabType;
  resetTab: () => void;
  setTab: (tab: TabType) => void;
}

import { persist } from "zustand/middleware";
// import type { TMResponseType } from "../hooks/useTM";
export const useTabStore = create<ModalStore>()(
  // devtools(
  persist(
    (set) => ({
      tab: "assets",
      resetTab: () => set({ tab: "assets" }),
      setTab: (tab) => set({ tab }),
    }),
    { name: "modal-storage" }
  )
  // )
);
