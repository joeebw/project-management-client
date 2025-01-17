import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import FormInput from "@/features/auth/components/FormInput";
import { UseFormReturn } from "react-hook-form";

type Props = {
  form: any;
  signInForm: UseFormReturn<
    {
      email: string;
      password: string;
    },
    any,
    undefined
  >;
  handleSignIn: (data: any) => void;
  handleSignInGuest: () => void;
  isLoading: boolean;
  isLoadingGuest: boolean;
};

const SignInForm = ({
  form,
  signInForm,
  handleSignIn,
  handleSignInGuest,
  isLoading,
  isLoadingGuest,
}: Props) => {
  return (
    <form
      onSubmit={signInForm.handleSubmit(handleSignIn)}
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
        type="email"
        placeholder="Email"
        register={signInForm.register("email")}
        error={signInForm.formState.errors.email}
      />
      <FormInput
        type="password"
        placeholder="Password"
        register={signInForm.register("password")}
        error={signInForm.formState.errors.password}
      />

      <div className="flex gap-4 pt-3">
        <Button
          className="w-full"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {isLoading && <Loader2 className="mr-2 animate-spin" />}
          Sign In
        </Button>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleSignInGuest}
          disabled={form.formState.isSubmitting}
        >
          {isLoadingGuest && <Loader2 className="mr-2 animate-spin" />}
          Guest
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
