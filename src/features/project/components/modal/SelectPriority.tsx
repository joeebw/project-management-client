import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Controller, FieldError } from "react-hook-form";

type Props = {
  name: string;
  control: any;
  error?: FieldError;
};

const PRIORITY = ["low", "medium", "high"];

const SelectPriority = ({ error, control, name }: Props) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="w-[10.5rem]">
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              {PRIORITY.map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
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

export default SelectPriority;
