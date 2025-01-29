import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Controller, FieldError } from "react-hook-form";

type Props = {
  placeholder: string;
  name: string;
  control: any;
  minDate?: Date;
  error?: FieldError;
};

const DatePicker = ({ placeholder, name, control, minDate, error }: Props) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !field.value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="w-4 h-4 mr-2" />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                disabled={(date) => (minDate ? date < minDate : false)}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default DatePicker;
