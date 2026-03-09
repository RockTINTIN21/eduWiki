import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TextField } from "@/components/ui/text-field";

import type { AutoDialogModeType } from "@/features/auth/ui/AuthDialog";
import { errorMessages } from "@/lib/api/error-messages";
import { ApiError, http } from "@/lib/api/http";

interface ConfirmEmailStageOneProps {
	onChangeEmail: (email: string) => void;
	type: AutoDialogModeType;
}

const ConfirmEmailStageOne = ({
	onChangeEmail,
	type,
}: ConfirmEmailStageOneProps) => {
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
		try {
			await http.post("/otp/verification-otp", {
				json: {
					email: data.email,
					type: type,
				},
			});
			onChangeEmail(data.email);
		} catch (e) {
			if (e instanceof ApiError && e.errors) {
				form.setError(e.errors[0].field, { message: errorMessages[e.code] });
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
