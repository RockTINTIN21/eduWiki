"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type {
	AutoDialogModeType,
	ConfirmStep,
} from "@/features/auth/ui/AuthDialog";
import ConfirmEmailStageOne from "@/features/auth/ui/confirm-email/stages/ConfirmEmailStageOne";
import ConfirmEmailStageTwo from "@/features/auth/ui/confirm-email/stages/ConfirmEmailStageTwo";
import RegisterForm from "@/features/auth/ui/forms/RegisterForm";
import ResetPasswordForm from "@/features/auth/ui/forms/ResetPasswordForm";

interface ConfirmEmailProps {
	formAfterConfirm: AutoDialogModeType;
	onClose: () => void;
	onChangeConfirmStep: (step: ConfirmStep) => void;
	confirmStep: ConfirmStep;
}

const ConfirmEmail = ({
	formAfterConfirm,
	onClose,
	onChangeConfirmStep,
	confirmStep,
}: ConfirmEmailProps) => {
	const [email, setEmail] = useState("");

	const onChangeEmail = (email: string) => {
		setEmail(email);
	};

	useEffect(() => {
		if (email) {
			onChangeConfirmStep("ENTER_OTP");
		}
	}, [email]);

	const form =
		formAfterConfirm === "REGISTRATION" ? (
			<RegisterForm onClose={onClose} email={email} />
		) : (
			<ResetPasswordForm onClose={onClose} email={email} />
		);

	return (
		<AnimatePresence mode="wait">
			{confirmStep !== "AFTER_CONFIRM_FORM" ? (
				!email ? (
					<motion.div
						key="enterEmail"
						initial={{ opacity: 0, x: -20 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 20, opacity: 0 }}
					>
						<ConfirmEmailStageOne
							type={formAfterConfirm}
							onChangeEmail={(email) => onChangeEmail(email)}
						/>
					</motion.div>
				) : (
					<motion.div
						key="enterOtp"
						initial={{ opacity: 0, x: -20 }}
						animate={{ x: 0, opacity: 1 }}
						exit={{ x: 20, opacity: 0 }}
					>
						<ConfirmEmailStageTwo
							type={formAfterConfirm}
							onChangeConfirmStep={onChangeConfirmStep}
							email={email}
						/>
					</motion.div>
				)
			) : (
				<motion.div
					key="form"
					initial={{ opacity: 0, x: -20 }}
					animate={{ x: 0, opacity: 1 }}
					exit={{ x: 20, opacity: 0 }}
				>
					{form}
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default ConfirmEmail;
