import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import type {
	AutoDialogModeType,
	ConfirmStep,
} from "@/components/Auth/AuthDialog";
import ResendOtpCode from "@/components/Auth/ConfirmEmail/ResendOTPCode";
import { Button } from "@/components/ui/button";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import { ApiError, apiFetch } from "@/lib/api";
import { errorHandler } from "@/lib/error-handler/errorHandler";

interface RegisterFormStageTwoProps {
	onChangeConfirmStep: (step: ConfirmStep) => void;
	email: string;
	type: AutoDialogModeType;
}

const RegisterFormStageTwo = ({
	email,
	type,
	onChangeConfirmStep,
}: RegisterFormStageTwoProps) => {
	const formSchema = z.object({
		code: z.string().min(6, {
			message: "Код должен состоять из 6 цифр.",
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			code: "",
		},
	});

	async function onSubmit(data: z.infer<typeof formSchema>) {
		const formattedData = {
			code: data.code,
			email: email,
			type: type,
		};
		try {
			await apiFetch("/otp/verify", {
				method: "POST",
				json: formattedData,
			});
			onChangeConfirmStep("AFTER_CONFIRM_FORM");
		} catch (e) {
			if (e instanceof ApiError)
				form.setError(e.field, { message: errorHandler[e.code] });
		}
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
								<InputOTPSlot
									aria-invalid={!!fieldState.error?.message}
									index={0}
								/>
								<InputOTPSlot
									aria-invalid={!!fieldState.error?.message}
									index={1}
								/>
								<InputOTPSlot
									aria-invalid={!!fieldState.error?.message}
									index={2}
								/>
								<InputOTPSlot
									aria-invalid={!!fieldState.error?.message}
									index={3}
								/>
								<InputOTPSlot
									aria-invalid={!!fieldState.error?.message}
									index={4}
								/>
								<InputOTPSlot
									aria-invalid={!!fieldState.error?.message}
									index={5}
								/>
							</InputOTPGroup>
						</InputOTP>
						<div className="pt-0">
							{fieldState.error && (
								<span className="px-8 text-sm color text-destructive">
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

			<div className="relative pb-2 py-2">
				<div className="h-px w-full bg-[#E0E5F2] z-10 absolute"></div>
				<div className="w-full text-center z-40 absolute -translate-y-1/2">
					<span className="text-[#AFAFAF] w-full text-center  px-5 bg-white ">
						или
					</span>
				</div>
			</div>
			<ResendOtpCode type={type} email={email} />
		</form>
	);
};

export default RegisterFormStageTwo;
