"use client";

import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/text-field";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PasswordField } from "@/components/password-field";
import { AutoDialogModeType } from "@/components/Auth/AuthDialog";
import {useAppDispatch} from "@/lib/store/store";
import {fetchLogin} from "@/components/Auth/fetch-auth";
import {ApiError} from "@/lib/api";
import {errorHandler} from "@/lib/errorHandler/errorHandler";

const LoginForm = ({
  onChangeMode,
}: {
  onChangeMode: (mode: AutoDialogModeType) => void;
}) => {

  const dispatch = useAppDispatch();

  const formSchema = z.object({
    login: z.string().min(8,"Некорректный формат логина"),
    password: z.string().min(8, "Некорректный формат пароля")
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      password: "",
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await dispatch(fetchLogin(data));
    } catch (e) {
      if (e instanceof ApiError){
        form.setError(e.field, {message: errorHandler[e.code]})
      }
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="login"
      className="space-y-4"
    >
      <Controller
        name="login"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            disabled={form.formState.isSubmitting}
            id={field.name}
            name={field.name}
            aria-invalid={!!fieldState.error?.message}
            error={fieldState.error?.message}
            height={48}
            type="text"
            title="Почта или имя пользователя"
          />
        )}
      />
      <Controller
        name="password"
        control={form.control}
        render={({ field, fieldState }) => (
          <PasswordField
            {...field}
            id={field.name}
            name={field.name}
            disabled={form.formState.isSubmitting}
            aria-invalid={!!fieldState.error?.message}
            error={fieldState.error?.message}
            height={48}
            type="password"
            title="Пароль"
          />
        )}
      />

      <button
        type={"button"}
        onClick={() => onChangeMode("PASSWORD_RESET")}
        className="text-[#2B48D4] font-medium text-sm"
      >
        Забыли пароль?
      </button>

      <Button
        type="submit"
        disabled={form.formState.isSubmitting || !form.formState.isValid}
        className="w-full"
        form="login"
      >
        {form.formState.isSubmitting && <Spinner />}
        Войти
      </Button>
    </form>
  );
};

export default LoginForm;