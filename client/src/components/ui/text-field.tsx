import type * as React from "react";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

interface CustomFieldProps extends React.ComponentProps<"input"> {
	name: string;
	title: string;
	error?: string;
	loading?: boolean;
}

function TextField({
	className,
	type,
	name,
	title,
	loading,
	error,
	...props
}: CustomFieldProps) {
	return (
		<div className="relative">
			<input
				name={name}
				type={type}
				placeholder=" "
				data-slot="input"
				className={cn(
					"file:text-foreground placeholder:text-[#5A5A5A] placeholder:font-medium selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-[50px] w-full min-w-0 rounded-full bg-secondary px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-[15px]",
					"focus:border-primary focus:border focus:bg-transparent border border-transparent",
					"aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
					"px-6 peer focus:pt-4 pt-4",
					className,
				)}
				{...props}
			/>
			{loading && <Spinner className="absolute right-6 top-4.5" />}

			<label
				htmlFor={name}
				className={cn(
					"pointer-events-none absolute left-6 top-4",
					"text-sm font-medium text-[#5A5A5A]",
					"transition-all duration-150 ease-in-out",
					"peer-focus:top-1.5 peer-focus:text-[12px]",
					"peer-not-placeholder-shown:top-1.5 peer-not-placeholder-shown:text-[12px]",
				)}
			>
				{title}
			</label>
			<div className="h-3">
				{props["aria-invalid"] && (
					<span className="px-6 text-sm color text-destructive">{error}</span>
				)}
			</div>
		</div>
	);
}

export { TextField };
