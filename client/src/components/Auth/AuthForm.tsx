import { Controller, Form, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomField } from "@/components/custom-field";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { API_URL, ApiError, apiFetch } from "@/lib/api";

const AuthForm = () => {

  const formSchema = z.object({
    email: z
      .email("Некорректный формат почты"),
    password: z
      .string()
      .min(10, "Некорректный формат пароля")
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('DATA', data)
    try{
      const res = await apiFetch<{ user: any; accessToken?: string }>(
        "/auth/login",
        {
          method: "POST",
          json: data,
        },
      );
      console.log('RES:',res)
    }catch(e){
      if(e instanceof ApiError)
        form.setError('password', {message: 'Неправильный логин или пароль'})
    }
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="login"
        className="space-y-4"
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomField
              {...field}
              id={field.name}
              name={field.name}
              aria-invalid={!!fieldState.error?.message}
              error={fieldState.error?.message}
              height={48}
              type="email"
              title="Почта или имя пользователя"
            />
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <CustomField
              {...field}
              id={field.name}
              name={field.name}
              aria-invalid={!!fieldState.error?.message}
              error={fieldState.error?.message}
              height={48}
              type="password"
              title="Пароль"
            />
          )}
        />
        <button className="text-[#2B48D4] font-medium text-sm">
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
      <div className="relative pb-2 py-2">
        <div className="h-px w-full bg-[#E0E5F2] z-10 absolute "></div>
        <div className="w-full text-center z-40 absolute -translate-y-1/2">
          <span className=" text-[#AFAFAF] w-full text-center  px-5 bg-white ">
            или
          </span>
        </div>
      </div>
      <Button
        type="button"
        variant="secondary"
        className="w-full"
      >
        {form.formState.isSubmitting && <Spinner />}
        Зарегистрироваться
      </Button>
    </div>
  );
};

export default AuthForm;