import { Input } from "@/components/ui/input";
import FormInput from "@/features/auth/components/FormInput";
import { SignInFormData } from "@/pages/LoginPage";
import { UseFormReturn } from "react-hook-form";

type Props = {
  signInForm: UseFormReturn<SignInFormData, any, undefined>;
};

const SignInInputs = ({ signInForm }: Props) => {
  return (
    <>
      <div className="space-y-2">
        <FormInput
          type="email"
          placeholder="Email"
          register={signInForm.register("email")}
          error={signInForm.formState.errors.email}
        />
      </div>

      <div className="space-y-2">
        <FormInput
          type="password"
          placeholder="Password"
          register={signInForm.register("password")}
          error={signInForm.formState.errors.password}
        />
      </div>
    </>
  );
};

export default SignInInputs;
