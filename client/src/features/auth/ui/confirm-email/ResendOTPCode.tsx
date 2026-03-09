"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { AutoDialogModeType } from "@/features/auth/ui/AuthDialog";
import {http} from "@/lib/api/http";


const ResendOtpCode = ({
	email,
	type,
}: {
	email: string;
	type: AutoDialogModeType;
}) => {
	const [over, setOver] = useState(false);
	const [time, setTime] = useState(59);

	const tick = () => {
		if (over) return;
		if (time === 0) {
			setOver(true);
		}
		setTime((prevState) => prevState - 1);
	};

	useEffect(() => {
		const timerID = setInterval(tick, 1000);
		return () => clearInterval(timerID);
	});

	const resendCode = async () => {
		setTime(59);
		setOver(false);
		await http.post("/otp/verification-otp", {
			json: {
				email,
				type,
			},
		});

		toast.success("Код подтверждения отправлен", { position: "top-center" });
	};

	return (
		<Button
			disabled={!over}
			onClick={() => resendCode()}
			variant="secondary"
			className="w-full"
		>
			{!over
				? `Повторно отправить код через: ${time}`
				: "Повторно отправить код"}
		</Button>
	);
};

export default ResendOtpCode;
