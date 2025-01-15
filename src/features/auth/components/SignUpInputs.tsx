import FormInput from "@/features/auth/components/FormInput";
import { SignUpFormData } from "@/features/auth/hooks/useAuth";
import { UseFormReturn } from "react-hook-form";

type Props = {
  signUpForm: UseFormReturn<SignUpFormData, any, undefined>;
};

const SignUpInputs = ({ signUpForm }: Props) => {
  return (
    <>
      <div className="space-y-2">
        <FormInput
          type="email"
          placeholder="Email"
          register={signUpForm.register("email")}
          error={signUpForm.formState.errors.email}
        />
      </div>
      <div className="space-y-2">
        <FormInput
          placeholder="User Name"
          register={signUpForm.register("name")}
          error={signUpForm.formState.errors.name}
        />
      </div>

      <div className="space-y-2">
        <FormInput
          placeholder="Role"
          register={signUpForm.register("role")}
          error={signUpForm.formState.errors.role}
        />
      </div>

      <div className="space-y-2">
        <FormInput
          type="password"
          placeholder="Password"
          register={signUpForm.register("password")}
          error={signUpForm.formState.errors.password}
        />
      </div>

      <div className="space-y-2">
        <FormInput
          type="password"
          placeholder="Confirm Password"
          register={signUpForm.register("confirmPassword")}
          error={signUpForm.formState.errors.confirmPassword}
        />
      </div>
    </>
  );
};

export default SignUpInputs;
