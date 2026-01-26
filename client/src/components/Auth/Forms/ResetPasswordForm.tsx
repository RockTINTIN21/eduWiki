import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/text-field";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ApiErrorOld, apiFetch } from "@/lib/api";
import { PasswordField } from "@/components/password-field";
import RegisterPassword from "@/components/Auth/Forms/RegisterPassword";
import {toast} from "sonner";
import {AUTH_ENDPOINTS} from "@/lib/api-endpoints/auth";

const ResetPasswordStageTwo = ({
  email,
  onClose,
}: {email: string, onClose: () => void}) => {

  const formSchema = z.object({
    password: z.string(),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await apiFetch(
      AUTH_ENDPOINTS.resetPassword,
      {
        method: "POST",
        json: {
          email: email,
          password: data.password,
        },
      },
    );
    onClose();
    toast.success('Ваш пароль успешно сброшен', {position: 'top-center'});
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="resetPassword"
      className="space-y-4"
    >
      <RegisterPassword
        control={form.control}
        clearErrors={form.clearErrors}
        setError={form.setError}
        watch={form.watch}
      />

      <Button
        type="submit"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="w-full"
        form="resetPassword"
      >
        {form.formState.isSubmitting && <Spinner />}
        Сбросить пароль
      </Button>
    </form>
  );
};

export default ResetPasswordStageTwo;
