import MultiSelectUsers from "@/features/project/components/modal/selectUser/MultipleSelectUsers";
import { User } from "@/features/project/ts/kanban.type";
import useFetch from "@/hooks/useFetch";
import { Controller, FieldError, Merge } from "react-hook-form";

type Props = {
  control: any;
  error?: Merge<FieldError, (FieldError | undefined)[]> | undefined;
};

const SelectUser = ({ control, error }: Props) => {
  const { data: users } = useFetch<User[]>("/user/all-users");

  return (
    <Controller
      control={control}
      name="assignedUserIds"
      render={({ field }) => (
        <MultiSelectUsers
          users={users}
          selectedIds={field.value}
          onChange={field.onChange}
          error={error?.message}
        />
      )}
    />
  );
};

export default SelectUser;
