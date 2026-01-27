export enum Code {
	EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
	INVALID_PASSWORD = "INVALID_PASSWORD",
	INVALID_CODE = "INVALID_CODE",
	EMAIL_NOT_EXISTS = "EMAIL_NOT_EXISTS",
}

export const errorMessages = {
	[Code.EMAIL_ALREADY_EXISTS]: "Почта уже используется",
	[Code.INVALID_PASSWORD]: "Неправильный логин или пароль",
	[Code.INVALID_CODE]: "Неправильный код",
	[Code.EMAIL_NOT_EXISTS]: "Аккаунта с данной почтой не существует",
} satisfies Record<Code, string>;
