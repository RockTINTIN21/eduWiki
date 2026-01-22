import {Controller, useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {ApiError, apiFetch} from "@/lib/api";
import { TextField } from "@/components/text-field";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { z } from "zod";
import {errorHandler} from "@/lib/errorHandler/errorHandler";
import {AutoDialogModeType, ConfirmStep} from "@/components/Auth/AuthDialog";

interface ConfirmEmailStageOneProps {
  onChangeEmail: (email: string) => void;
  type: AutoDialogModeType
}

const ConfirmEmailStageOne = ({onChangeEmail, type}: ConfirmEmailStageOneProps) => {

  const formSchema = z.object({
    email: z
      .email("Некорректный формат почты"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    }
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try{
      await apiFetch(
        "/otp/verification-otp",
        {
          method: "POST",
          json: {
            email: data.email,
            type: type
          },
        },
      );
      onChangeEmail(data.email);
    }catch(e){
      if(e instanceof ApiError){
        form.setError(e.field, {message: errorHandler[e.code]})
      }
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      id="register"
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
        form="register"
      >
        {form.formState.isSubmitting && <Spinner />}
        Продолжить
      </Button>
    </form>
  );
};

export default ConfirmEmailStageOne;