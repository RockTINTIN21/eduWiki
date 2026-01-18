export enum Code {
  EMAIL_ALREADY_EXISTS = "EMAIL_ALREADY_EXISTS",
  INVALID_PASSWORD = "INVALID_PASSWORD",
  INVALID_CODE = "INVALID_CODE"
}

export const errorHandler = {
  [Code.EMAIL_ALREADY_EXISTS]: "Почта уже используется",
  [Code.INVALID_PASSWORD]: "Неправильный логин или пароль",
  [Code.INVALID_CODE]: "Неправильный код",
} satisfies Record<Code, string>