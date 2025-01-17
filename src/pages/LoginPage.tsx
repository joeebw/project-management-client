import { useStore } from "@/state/useStore";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import useAuth from "@/features/auth/hooks/useAuth";
import SignInForm from "@/features/auth/components/SignInForm";
import SignUpForm from "@/features/auth/components/SignUpForm";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg p-4">
        <CardHeader>
          <CardTitle className="text-xl">Project Management</CardTitle>
          <CardDescription className="text-base">
            Sign in or create an account to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={isSignIn ? "signin" : "signup"}
            className="w-full"
            onValueChange={() => {
              setIsSignIn();
              form.reset();
            }}
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <SignInForm
                form={form}
                signInForm={signInForm}
                handleSignIn={handleSignIn}
                handleSignInGuest={handleSignInGuest}
                isLoading={isLoading}
                isLoadingGuest={isLoadingGuest}
              />
            </TabsContent>

            <TabsContent value="signup">
              <SignUpForm
                form={form}
                signUpForm={signUpForm}
                handleSignUp={handleSignUp}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
