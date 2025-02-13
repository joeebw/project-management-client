import authService from "@/features/auth/services/authService";
import { useStore } from "@/state/useStore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setTokens } from "@/lib/auth";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
});

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    role: z.string().min(3, "Role must be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;

const useAuth = () => {
  const [isLoadingGuest, setIsLoadingGuest] = useState(false);
  const isSignIn = useStore((state) => state.isSignIn);
  const setIsSignIn = useStore((state) => state.setIsSignIn);
  const setUser = useStore((state) => state.setUser);

  const navigate = useNavigate();

  const signInForm = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const signUpForm = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  const form = isSignIn ? signInForm : signUpForm;

  const isLoading = form.formState.isSubmitting;

  const handleSignIn = async ({ email, password }: SignInFormData) => {
    try {
      const response = await authService.signIn(email, password);

      setUser(response.user);
      setTokens(response.accessToken, response.refreshToken);
      navigate("/home", { replace: true });
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: err as string,
      });
    }
  };

  const handleSignInGuest = async () => {
    try {
      setIsLoadingGuest(true);
      const response = await authService.signInGuest();
      setUser(response.user);
      setTokens(response.accessToken, response.refreshToken);
      navigate("/home", { replace: true });
    } catch (err) {
      setIsLoadingGuest(false);
      form.setError("root", {
        type: "manual",
        message: err as string,
      });
    } finally {
      setIsLoadingGuest(false);
    }
  };

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      const registerParams = {
        userName: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };
      const response = await authService.register(registerParams);

      setIsSignIn();
      setUser(response.user);
      setTokens(response.accessToken, response.refreshToken);
      navigate("/home", { replace: true });
    } catch (err) {
      form.setError("root", {
        type: "manual",
        message: err as string,
      });
    }
  };

  return {
    handleSignUp,
    handleSignInGuest,
    isLoadingGuest,
    handleSignIn,
    form,
    signInForm,
    signUpForm,
    isLoading,
  };
};

export default useAuth;
