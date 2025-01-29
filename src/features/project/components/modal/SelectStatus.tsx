import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, FieldError } from "react-hook-form";

const STATUS = [
  {
    status: "To Do",
    value: "todo",
  },
  {
    status: "Work In Progress",
    value: "in-progress",
  },
  {
    status: "Under Review",
    value: "under-review",
  },
  {
    status: "Completed",
    value: "completed",
  },
];

type Props = {
  error?: FieldError;
  control: any;
  name: string;
};

const SelectStatus = ({ error, control, name }: Props) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-[10.5rem]">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {STATUS.map(({ status, value }) => (
                <SelectItem key={value} value={value}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default SelectStatus;
