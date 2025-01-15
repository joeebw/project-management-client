import { useStore } from "@/state/useStore";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import SignInInputs from "@/features/auth/components/SignInInputs";
import SignUpInputs from "@/features/auth/components/SignUpInputs";
import useAuth from "@/features/auth/hooks/useAuth";

const LoginPage = () => {
  const isSignIn = useStore((state) => state.isSignIn);
  const setIsSignIn = useStore((state) => state.setIsSignIn);

  const {
    handleSignInGuest,
    handleSignUp,
    isLoadingGuest,
    handleSignIn,
    form,
    signInForm,
    signUpForm,
    isLoading,
  } = useAuth();

  return (
    <form
      onSubmit={
        isSignIn
          ? signInForm.handleSubmit(handleSignIn)
          : signUpForm.handleSubmit(handleSignUp)
      }
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="p-16 bg-card w-[33rem] backdrop-blur-xl rounded-2xl shadow-xl">
        <h2 className="text-2xl font-medium text-center">
          Welcome to TaskWolf! Log in to lead your projects to success.
        </h2>
        <div className="flex flex-col gap-7 mt-7">
          {form.formState.errors.root && (
            <Alert variant="destructive">
              <AlertDescription>
                {form.formState.errors.root.message}
              </AlertDescription>
            </Alert>
          )}

          {isSignIn ? (
            <SignInInputs signInForm={signInForm} />
          ) : (
            <SignUpInputs signUpForm={signUpForm} />
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            variant="default"
            className="w-full mt-7"
            disabled={form.formState.isSubmitting}
          >
            {!isLoadingGuest && isLoading && (
              <Loader2 className="animate-spin" />
            )}
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <Button
            type="button"
            variant="default"
            className="w-full mt-7"
            onClick={handleSignInGuest}
            disabled={form.formState.isSubmitting}
          >
            {isLoadingGuest && <Loader2 className="animate-spin" />}
            Continue as Guest
          </Button>
        </div>

        <p
          className="mt-5 text-sm underline cursor-pointer"
          onClick={() => {
            if (isSignIn) {
              signInForm.reset();
            } else {
              signUpForm.reset();
            }
            setIsSignIn();
          }}
        >
          {isSignIn
            ? "Don't have an account? Sign up here"
            : "Already have an account? Sign in here"}
        </p>
      </div>
    </form>
  );
};

export default LoginPage;
