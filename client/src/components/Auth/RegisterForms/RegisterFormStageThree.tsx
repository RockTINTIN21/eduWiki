"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiErrorOld, apiFetch } from "@/lib/api";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {HugeiconsIcon} from "@hugeicons/react";
import {PencilEdit02Icon} from "@hugeicons/core-free-icons";
import {useEffect, useMemo, useState} from "react";
import {useDebounce} from "use-debounce";
import RegisterPassword from "@/components/Auth/RegisterForms/RegisterPassword";

const RegisterFormStageOne = ({
  email
}: {onChangeStage: (stage: 2) => void, email: string}) => {

  const [usernameValue, setUsernameValue] = useState("");
  const [debouncedValue] = useDebounce(usernameValue, 500);
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    avatar: z.file().optional(),
    username: z.string().min(10, "Некорректный формат имени пользователя"),
    password: z.string(),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const avatarFile = form.watch("avatar");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('DATA', data)
    const formattedData = {
      ...data,
      email: email
    }
    console.log('DATA:', data)
    // const formData = new FormData();
    // formData.append("avatar", data.avatar)
    // try{
    //   const res = await apiFetch(
    //     "/auth/register",
    //     {
    //       method: "POST",
    //       json: formattedData,
    //     },
    //   );
    //   console.log('RES:',res)
    // }catch(e){
    //   if(e instanceof ApiErrorOld){
    //     console.log(e)
    //     form.setError('username', {message: 'Имя пользователя уже занято'})
    //   }
    //
    // }
  }

  const handleInputChange = (event: any) => {
    const value = event.target.value;
    setUsernameValue(value);
  };

  useEffect(() => {
    if(debouncedValue){
      checkUsername().then()
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (form.formState.isSubmitted) {
      form.trigger("confirmPassword").then(null);
    }
  }, [form, form.formState.isSubmitted, form.trigger]);
  
  const checkUsername = async () => {
    setLoading(true);
    const res = await apiFetch<{available: boolean}>(`/auth/check-username/${debouncedValue}`)
    if(!res.available){
      form.setError('username', {message: 'Имя пользователя уже занято'})
    }else{
      console.log('clear')
      form.clearErrors('username');
    }
    setLoading(false);
  }
  
  // const previewUrl = useMemo(() => {
  //   if (!avatarFile) return null;
  //   return URL.createObjectURL(avatarFile);
  // }, [avatarFile]);
  //
  // useEffect(() => {
  //   return () => {
  //     if (previewUrl) URL.revokeObjectURL(previewUrl);
  //   };
  // }, [previewUrl]);

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="register"
      className="space-y-4"
    >
      {/*<Avatar className="w-20 h-20 ms-auto me-auto">*/}
      {/*  <AvatarImage*/}
      {/*    src={previewUrl ?? ''}*/}
      {/*    alt={'qwe'}*/}
      {/*  />*/}
      {/*  <AvatarFallback className='text-white'>CN</AvatarFallback>*/}
      {/*</Avatar>*/}

      <Controller
        name="avatar"
        control={form.control}
        render={({ field, fieldState }) => (
          <div className="w-full flex flex-col items-center gap-3 pb-4">
            <label htmlFor="picture">
              <Button variant="secondary" className="!px-8 cursor-pointer" asChild>
                <span className="flex items-center gap-2">
                  Загрузить свой аватар
                  <HugeiconsIcon icon={PencilEdit02Icon} strokeWidth={2} />
                </span>
              </Button>
            </label>

            <Input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
              onBlur={field.onBlur}
              name={field.name}
              ref={field.ref}
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                field.onChange(file);
              }}
            />

            {fieldState.error?.message && (
              <p className="text-sm text-destructive">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="username"
        control={form.control}
        render={({ field, fieldState }) => (
          <TextField
            onChange={(value)=> {
              field.onChange(value)
              handleInputChange(value)
            }}

            loading={loading}
            disabled={loading}
            value={field.value}
            id={field.name}
            name={field.name}
            aria-invalid={!!fieldState.error?.message}
            error={fieldState.error?.message}
            height={48}
            type="text"
            title="Имя пользователя"
          />
        )}
      />

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
        form="register"
      >
        {form.formState.isSubmitting && <Spinner />}
        Продолжить
      </Button>
    </form>
  );
};

export default RegisterFormStageOne;