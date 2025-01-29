import { ProjectState, StoreState } from "@/state/useStore.type";
import { StateCreator } from "zustand";

const INITIAL_PROJECT_STATE = {
  isTaskModal: false,
  refetchBoards: null,
};

export const createProjectSlice: StateCreator<
  StoreState,
  [],
  [],
  ProjectState
> = (set) => ({
  ...INITIAL_PROJECT_STATE,
  setIsTaskModal: (bool: boolean) => set(() => ({ isTaskModal: bool })),
  setRefetchBoards: (refetch) => set(() => ({ refetchBoards: refetch })),
});
