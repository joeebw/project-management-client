import { Input } from "@/components/ui/input";
import { FieldError } from "react-hook-form";

type Props = {
  type?: string;
  placeholder?: string;
  error?: FieldError;
  register: any;
  className?: string;
};

const FormInput = ({
  type = "text",
  placeholder,
  error,
  register,
  className = "",
}: Props) => {
  return (
    <div>
      <Input
        type={type}
        placeholder={placeholder}
        className={`!text-base ${className}`}
        {...register}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormInput;
