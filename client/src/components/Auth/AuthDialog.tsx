"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginForm from "@/components/Auth/Forms/LoginForm";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmEmail from "@/components/Auth/ConfirmEmail/ConfirmEmail";

export type AutoDialogModeType = "REGISTRATION" | "PASSWORD_RESET" | "LOGIN"
export type ConfirmStep = "ENTER_EMAIL" | "ENTER_OTP" | "AFTER_CONFIRM_FORM";

const AuthDialog = () => {
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<AutoDialogModeType>("LOGIN");
  const [confirmStep, setConfirmStep] = useState<ConfirmStep>('ENTER_EMAIL')

  const onCloseModal = () => {
    setMode("LOGIN");
    setConfirmStep("ENTER_EMAIL");
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onCloseModal();
    }
    setOpen(isOpen);
  };

  const onChangeMode = (mode: AutoDialogModeType) =>{
    setMode(mode);
  }

  const onChangeConfirmStep = (step: ConfirmStep) => {
    setConfirmStep(step);
  };

  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button className="bg-accent px-8">Войти</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-106.25 sm:w-full flex flex-col justify-start md:justify-center rounded-none max-w-full  px-8 h-full md:h-auto md:rounded-4xl">
        <DialogHeader>
          <DialogTitle className={"text-center text-2xl font-medium!"}>
            {mode === "LOGIN" && "Вход"}
            {mode === "REGISTRATION" && "Регистрация"}
            {mode === "PASSWORD_RESET" && "Сброс пароля"}
          </DialogTitle>
          <DialogDescription
            className={"text-center font-medium text-[#5A5A5A]"}
          >
            {(mode === "LOGIN" || (mode === "REGISTRATION" && confirmStep === 'ENTER_EMAIL')) && (
              <>
                Продолжая, вы соглашаетесь с{" "}
                <Link className="text-link hover:underline" href="/">
                  Политикой конфиденциальности
                </Link>{" "}
                и{" "}
                <Link className="text-link hover:underline" href="/">
                  Пользовательским соглашением
                </Link>
                .
              </>
            )}
            {(mode === "PASSWORD_RESET" && confirmStep === "ENTER_EMAIL") && (
              <>Введите почту на которую был зарегистрирован аккаунт</>
            )}
            {confirmStep === 'ENTER_OTP' && <>Введите код, отправленный на указанный адрес. Если письмо не пришло, проверьте папку «Спам»</>}
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {mode === "LOGIN" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              <LoginForm onChangeMode={(stage: AutoDialogModeType) => onChangeMode(stage)} />
            </motion.div>
          ) : (
            <motion.div
              key="confirmEmail"
              initial={{ opacity: 0, x: -20 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              <ConfirmEmail
                confirmStep={confirmStep}
                onClose={onCloseModal}
                formAfterConfirm={mode}
                onChangeConfirmStep={onChangeConfirmStep} />
            </motion.div>

          )}
        </AnimatePresence>

        {(mode === "LOGIN" || (mode === "PASSWORD_RESET" && confirmStep === 'ENTER_EMAIL')) && (
          <>
            <div className="relative pb-2 py-2">
              <div className="h-px w-full bg-[#E0E5F2] z-10 absolute"></div>
              <div className="w-full text-center z-40 absolute -translate-y-1/2">
                <span className="text-[#AFAFAF] w-full text-center  px-5 bg-white ">
                  или
                </span>
              </div>
            </div>
            <Button
              onClick={() =>
                setMode((prevState) =>
                  prevState === "LOGIN" ? "REGISTRATION" : "LOGIN",
                )
              }
              variant="secondary"
            >
              {mode === "LOGIN" ? "Зарегистрироваться" : "Войти в уже существующий аккаунт"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
