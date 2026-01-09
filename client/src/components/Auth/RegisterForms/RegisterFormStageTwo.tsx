import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiError, apiFetch } from "@/lib/api";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import * as React from "react";

const RegisterFormStageOne = ({
  onChangeStage,
}: {onChangeStage: (stage: 3) => void}) => {

  const formSchema = z.object({
    code: z
      .string().min(6, {
        message: "Код должен состоять из 6 цифр."
      })
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log('DATA', data)
    onChangeStage(3);
    // try{
    //   const res = await apiFetch<{ user: any; accessToken?: string }>(
    //     "/auth/register",
    //     {
    //       method: "POST",
    //       json: data,
    //     },
    //   );
    //   console.log('RES:',res)
    // }catch(e){
    //   if(e instanceof ApiError)
    //     form.setError('code', {message: 'Неверный код'})
    // }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="register"
      className="space-y-4"
    >
      <Controller
        name="code"
        control={form.control}
        render={({ field, fieldState }) => (
          <>
            <InputOTP
              maxLength={6}
              containerClassName="flex justify-center"
              {...field}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <div className="h-3">
              {fieldState.error && (
                <span className="px-6 text-sm color text-destructive">
                  {fieldState.error.message}
                </span>
              )}
            </div>
          </>
        )}
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