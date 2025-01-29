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
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
);
