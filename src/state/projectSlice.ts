import { ProjectState, StoreState } from "@/state/useStore.type";
import { StateCreator } from "zustand";

const INITIAL_PROJECT_STATE = {
  isTaskModal: false,
  isProjectModal: false,
  refetchBoards: null,
  refetchProjects: null,
  refetchList: null,
  refetchTable: null,
  comments: {},
  projectSection: "board",

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
    set(() => {
      return {
        isConfirmationModal: true,
        configConfirmationModal: config,
      };
    }),
  closeConfirmationModal: () =>
    set(() => {
      return {
        isConfirmationModal: false,
        configConfirmationModal: null,
      };
    }),
  setComments: (taskId, comments) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [taskId]: comments,
      },
    })),
  addComment: (taskId, comment) =>
    set((state) => ({
      comments: {
        ...state.comments,
        [taskId]: [...(state.comments[taskId] || []), comment],
      },
    })),
  setIsProjectModal: (bool: boolean) => set(() => ({ isProjectModal: bool })),
  setRefetchProjects: (refetch) => set(() => ({ refetchProjects: refetch })),
  setProjectSection: (section: string) =>
    set(() => ({ projectSection: section })),
  setRefetchList: (refetch) => set(() => ({ refetchList: refetch })),
  setRefetchTable: (refetch) => set(() => ({ refetchTable: refetch })),
});
