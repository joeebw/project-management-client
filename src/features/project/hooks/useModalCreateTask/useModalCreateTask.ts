import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useStore } from "@/state/useStore";
import useTask from "@/features/project/hooks/useTask";
import {
  CreateFormData,
  createTaskSchema,
  DateErrors,
  modalTaskDefaultValues,
} from "@/features/project/hooks/useModalCreateTask/utils";

const useModalCreateTask = () => {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [dateErrors, setDateErrors] = useState<DateErrors>({
    startDate: "",
    endDate: "",
  });

  const createTaskForm = useForm<CreateFormData>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: modalTaskDefaultValues,
  });

  const isTaskModal = useStore((state) => state.isTaskModal);
  const setIsTaskModal = useStore((state) => state.setIsTaskModal);
  const refetchBoards = useStore((state) => state.refetchBoards);
  const refetchList = useStore((state) => state.refetchList);
  const refetchTable = useStore((state) => state.refetchTable);
  const projectSection = useStore((state) => state.projectSection);
  const { handleCreateTask } = useTask();

  const resetDatePicker = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    setDateErrors({ startDate: "", endDate: "" });
  };

  const handleOpenChange = (bool: boolean) => {
    setIsTaskModal(bool);
    if (!bool) {
      createTaskForm.reset(modalTaskDefaultValues);
      resetDatePicker();
    }
  };

  const onSubmit = async (data: CreateFormData) => {
    const errors = {
      startDate: !startDate ? "Start date is required" : "",
      endDate: !endDate ? "End date is required" : "",
    };
    setDateErrors(errors);

    const refetchFunction =
      projectSection === "board"
        ? refetchBoards
        : projectSection === "list"
        ? refetchList
        : refetchTable;

    if (!startDate || !endDate || !refetchFunction) return;

    await handleCreateTask(
      {
        ...data,
        startDate,
        endDate,
      },
      createTaskForm,
      resetDatePicker,
      refetchFunction
    );
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dateErrors,
    createTaskForm,
    isTaskModal,
    handleOpenChange,
    onSubmit,
  };
};

export default useModalCreateTask;
