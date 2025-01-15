import { User } from "@/state/useStore.type";
import { create, StateCreator } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  isSignIn: boolean;
  user: User;

  setIsSignIn: () => void;
  setUser: (user: User) => void;
  resetStore: () => void;
};

const INITIAL_STORE_STATE = {
  isSignIn: true,
  user: null,
};

const createAuthSlice: StateCreator<Store> = (set) => ({
  ...INITIAL_STORE_STATE,
  setIsSignIn: () => set((state) => ({ isSignIn: !state.isSignIn })),
  setUser: (user) => set(() => ({ user })),
  resetStore: () => set(INITIAL_STORE_STATE),
});

export const useStore = create<Store>()(
  persist(
    (...arg) => ({
      ...createAuthSlice(...arg),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      version: 1,
    }
  )
);
