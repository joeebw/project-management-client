import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createAuthSlice } from "./authSlice";
import { createProjectSlice } from "./projectSlice";
import { StoreState } from "@/state/useStore.type";

export const useStore = create<StoreState>()(
  persist(
    (...arg) => ({
      ...createAuthSlice(...arg),
      ...createProjectSlice(...arg),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(() => {
        try {
          return localStorage;
        } catch (err) {
          console.error("Error accessing localStorage:", err);
          return {
            getItem: () => null,
            setItem: () => null,
            removeItem: () => null,
          };
        }
      }),
      version: 1,
    }
  )
);
