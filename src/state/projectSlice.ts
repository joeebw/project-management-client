import { ProjectState, StoreState } from "@/state/useStore.type";
import { StateCreator } from "zustand";

const INITIAL_PROJECT_STATE = {
  isTaskModal: false,
  refetchBoards: null,
  isConfirmationModal: false,
  configConfirmationModal: null,
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
  openConfirmationModal: (config) =>
    set(() => ({ isConfirmationModal: true, configConfirmationModal: config })),
  closeConfirmationModal: () =>
    set(() => ({ isConfirmationModal: false, configConfirmationModal: null })),
});
