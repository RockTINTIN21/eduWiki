import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/text-field";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ApiError, apiFetch } from "@/lib/api";
import { PasswordField } from "@/components/password-field";

const ResetPasswordForm = () => {
  const formSchema = z.object({
    email: z.email("Некорректный формат почты"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("DATA", data);
    try {
      const res = await apiFetch<{ user: any; accessToken?: string }>(
        "/auth/login",
        {
          method: "POST",
          json: data,
        },
      );
      console.log("RES:", res);
    } catch (e) {
      // if (e instanceof ApiError)
      //   form.setError("password", { message: "Неправильный логин или пароль" });
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="resetPassword"
      className="space-y-4"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id={field.name}
            name={field.name}
            aria-invalid={!!fieldState.error?.message}
            error={fieldState.error?.message}
            height={48}
            type="email"
            title="Почта"
          />
        )}
      />
      <Button
        type="submit"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="w-full"
        form="login"
      >
        {form.formState.isSubmitting && <Spinner />}
        Продолжить
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
