"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@/components/text-field";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ApiError, apiFetch } from "@/lib/api";
import { PasswordField } from "@/components/password-field";
import { AutoDialogModeType } from "@/components/Auth/AuthDialog";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  CounterId,
  DecrementAction,
  IncrementAction,
  useAppSelector,
  User, UserUpdateAction,
} from "@/lib/store";

const LoginForm = ({
  onChangeMode,
}: {
  onChangeMode: (mode: AutoDialogModeType) => void;
}) => {
  const [token, setToken] = useState("");

  const formSchema = z.object({
    email: z.email("Некорректный формат почты"),
    password: z.string().min(10, "Некорректный формат пароля"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("DATA", data);
    try {
      const res = await apiFetch<string>("/auth/login", {
        method: "POST",
        json: data,
      });
      setToken(res);
      console.log("RES:", res);
      console.log("SUCCESS. Starting get user info...");
      const resUser = await apiFetch<User>(`/users/byEmail/${data.email}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${res}` },
      });
      console.log("USER:", resUser);
      const user: User = {
        id: resUser.id,
        email: resUser.email,
        role: "USER",
        username: resUser.username,
        avatarUrl: resUser.avatarUrl
      }
      SetUserInStore(user);
    } catch (e) {
      if (e instanceof ApiError)
        form.setError("password", { message: "Неправильный логин или пароль" });
    }
  }

  async function getUsers() {
    try {
      const res = await apiFetch("/users", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res);
    } catch (e) {
      if (e instanceof ApiError) console.log(e);
    }
  }

  async function updateToken() {
    try {
      const res = await apiFetch("/auth/refresh", {
        method: "GET",
      });
      setToken(res);
      console.log(res);
    } catch (e) {
      if (e instanceof ApiError) console.log(e);
    }
  }

  async function logout() {
    try {
      const res = await apiFetch("/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      setToken("");
    } catch (e) {
      if (e instanceof ApiError) console.log(e);
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="login"
      className="space-y-4"
    >
      <Controller
        name="email"
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
            type="email"
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
        onClick={() => onChangeMode("resetPassword")}
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
      <Button onClick={() => updateToken()} type="button">
        Обновить токен
      </Button>
      <Button onClick={() => getUsers()} type="button">
        Получить юзеров
      </Button>
      <Button onClick={() => logout()} type="button">
        Выйти
      </Button>
      <Button onClick={() => updateToken()} type="button">
        Обновить токен
      </Button>
    </form>
  );
};

export default LoginForm;

export function SetUserInStore(user: User) {
  console.log('test')
  const dispatch = useDispatch();
  console.log('qwe')
  const counterState = useAppSelector((state) =>
    state.user,
  );


  dispatch({type: "userUpdate", payload: {user}})
  console.log(counterState?.username)
  // console.log("render", counterId);

  // const [, forceUpdate] = useReducer((x) => x + 1, 0)
  //
  // const lastStateRef = useRef<ReturnType<typeof selectCounter>>();
  //
  // useEffect(() => {
  //   const unsubscribe = store.subscribe(() => {
  //     const currentState = selectCounter(store.getState(), counterId);
  //     const lasState = selectCounter(store.getState(), counterId);
  //
  //     if(currentState !== lasState){
  //       forceUpdate();
  //     }
  //     lastStateRef.current = currentState;
  //   });
  //   return unsubscribe;
  // }, [])
  //
  // const counterState = selectCounter(store.getState(), counterId);

}