import FormInput from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { User } from "@/features/settings/ts/settings.types";
import { useEffect } from "react";
import api from "@/lib/apiService";
import { toast } from "sonner";
const settingsSchema = z.object({
  userName: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.string().min(2, "Role must be at least 2 characters"),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

const Settings = () => {
  const { data: user, loading, setData } = useFetch<User>("/user/get-user");

  const settingsForm = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
  });

  const formValues = settingsForm.watch();

  useEffect(() => {
    if (user) {
      settingsForm.reset({
        userName: user.userName,
        email: user.email,
        role: user.role,
      });
    }
  }, [user, settingsForm]);

  const hasFormChanged = () => {
    return (
      user &&
      (formValues.userName !== user.userName ||
        formValues.email !== user.email ||
        formValues.role !== user.role)
    );
  };

  const handleSubmit = async (data: SettingsFormData) => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    try {
      await api.put("/user/update-profile", data);
      settingsForm.reset(data);
      if (user) {
        setData({
          ...user,
          userName: data.userName,
          email: data.email,
          role: data.role,
        });
      }
      toast.success("Profile updated successfully");
    } catch (err) {
      if (user) {
        settingsForm.reset({
          userName: user.userName,
          email: user.email,
          role: user.role,
        });
      }
      toast.error("Failed to update profile");
      console.log(err);
    }
  };

  return (
    <div className="p-5">
      <h3 className="text-2xl font-semibold">Settings</h3>

      <Card className="mt-5">
        <CardContent className="py-8">
          {loading ? (
            <div className="flex justify-center items-center h-[300px]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : (
            <form
              className="flex flex-col gap-5"
              onSubmit={settingsForm.handleSubmit(handleSubmit)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block mb-1 text-sm font-medium"
                >
                  Username
                </label>
                <FormInput
                  id="username"
                  placeholder="Username"
                  register={settingsForm.register("userName")}
                  error={settingsForm.formState.errors.userName}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-1 text-sm font-medium"
                >
                  Email
                </label>
                <FormInput
                  id="email"
                  placeholder="Email"
                  type="email"
                  register={settingsForm.register("email")}
                  error={settingsForm.formState.errors.email}
                />
              </div>

              <div>
                <label
                  htmlFor="role"
                  className="block mb-1 text-sm font-medium"
                >
                  Role
                </label>
                <FormInput
                  id="role"
                  placeholder="Role"
                  register={settingsForm.register("role")}
                  error={settingsForm.formState.errors.role}
                />
              </div>

              <Button
                type="submit"
                className="self-end mt-1"
                disabled={
                  settingsForm.formState.isSubmitting || !hasFormChanged()
                }
              >
                {settingsForm.formState.isSubmitting && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {settingsForm.formState.isSubmitting
                  ? "Saving..."
                  : "Save Settings"}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
