export enum Code {
	EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  EMAIL_NOT_EXISTS = "EMAIL_NOT_EXISTS",
	INVALID_PASSWORD = "INVALID_PASSWORD",
	INVALID_CODE = "INVALID_CODE",
  INTERNAL_ERROR = "INTERNAL_ERROR",
  ERROR_UPDATE_TOKEN = "ERROR_UPDATE_TOKEN",
}

export const errorMessages = {
	[Code.EMAIL_ALREADY_EXISTS]: "Почта уже используется.",
	[Code.INVALID_PASSWORD]: "Неправильный логин или пароль.",
	[Code.INVALID_CODE]: "Неправильный код.",
	[Code.EMAIL_NOT_EXISTS]: "Аккаунта с данной почтой не существует.",
  [Code.INTERNAL_ERROR]: "Внутренняя ошибка сервера. Повторите попытку позже.",
  [Code.ERROR_UPDATE_TOKEN]: "Сессия аккаунта более недействительна. Пожалуйста, войдите в аккаунт повторно.",
} satisfies Record<Code, string>;
