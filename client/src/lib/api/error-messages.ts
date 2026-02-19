export enum Code {
	EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  EMAIL_NOT_EXISTS = "EMAIL_NOT_EXISTS",
	INVALID_PASSWORD = "INVALID_PASSWORD",
	INVALID_CODE = "INVALID_CODE",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export const errorMessages = {
	[Code.EMAIL_ALREADY_EXISTS]: "Почта уже используется",
	[Code.INVALID_PASSWORD]: "Неправильный логин или пароль",
	[Code.INVALID_CODE]: "Неправильный код",
	[Code.EMAIL_NOT_EXISTS]: "Аккаунта с данной почтой не существует",
  [Code.UNKNOWN_ERROR]: "Внутренняя ошибка сервера. Повторите попытку позже",
} satisfies Record<Code, string>;
