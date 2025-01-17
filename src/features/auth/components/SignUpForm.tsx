import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import FormInput from "@/features/auth/components/FormInput";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: any;
  signUpForm: UseFormReturn<
    {
      email: string;
      password: string;
      role: string;
      name: string;
      confirmPassword: string;
    },
    any,
    undefined
  >;
  handleSignUp: (data: any) => void;
  isLoading: boolean;
};

const SignUpForm = ({ form, signUpForm, handleSignUp, isLoading }: Props) => {
  return (
    <form
      onSubmit={signUpForm.handleSubmit(handleSignUp)}
      className="space-y-4"
    >
      {form.formState.errors.root && (
        <Alert variant="destructive">
          <AlertDescription>
            {form.formState.errors.root.message}
          </AlertDescription>
        </Alert>
      )}
      <FormInput
        placeholder="User Name"
        register={signUpForm.register("name")}
        error={signUpForm.formState.errors.name}
      />
      <FormInput
        type="email"
        placeholder="Email"
        register={signUpForm.register("email")}
        error={signUpForm.formState.errors.email}
      />
      <FormInput
        placeholder="Role"
        register={signUpForm.register("role")}
        error={signUpForm.formState.errors.role}
      />
      <FormInput
        type="password"
        placeholder="Password"
        register={signUpForm.register("password")}
        error={signUpForm.formState.errors.password}
      />
      <FormInput
        type="password"
        placeholder="Confirm Password"
        register={signUpForm.register("confirmPassword")}
        error={signUpForm.formState.errors.confirmPassword}
      />

      <div className="pt-3">
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {isLoading && <Loader2 className="mr-2 animate-spin" />}
          Sign Up
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
