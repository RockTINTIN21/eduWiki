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
import LoginForm from "@/components/Auth/LoginForm";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import RegisterFormStageOne from "@/components/Auth/RegisterForms/RegisterFormStageOne";
import RegisterFormStageTwo from "@/components/Auth/RegisterForms/RegisterFormStageTwo";
import RegisterFormStageThree from "@/components/Auth/RegisterForms/RegisterFormStageThree";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";

export type AutoDialogModeType = "login" | "register" | "resetPassword"

const AuthDialog = () => {
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<AutoDialogModeType>("login");
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState<string>("");

  const onCloseModal = () => {
    setMode("login");
    setStage(1);
    setEmail("");
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

  const onChangeEmail = (email: string) =>{
    setEmail(email);
  }

  const onChangeStage = (stage: 1 | 2 | 3) => {
    setStage(stage);
  };



  return (
    <Dialog onOpenChange={handleOpenChange} open={open}>
      <DialogTrigger asChild>
        <Button className="bg-accent px-8">Войти</Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-106.25 sm:w-full flex flex-col justify-start md:justify-center rounded-none max-w-full  px-8 h-full md:h-auto md:rounded-4xl">
        <DialogHeader>
          <DialogTitle className={"text-center text-2xl font-medium!"}>
            {mode === "login" && "Вход"}
            {mode === "register" && "Регистрация"}
            {mode === "resetPassword" && "Сброс пароля"}
          </DialogTitle>
          <DialogDescription
            className={"text-center font-medium text-[#5A5A5A]"}
          >
            {(mode === "login" || (mode === "register" && stage === 1)) && (
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
            {mode === "resetPassword" && (
              <>Введите почту на которую был зарегистрирован аккаунт</>
            )}
            {stage === 2 && <>Введите код, отправленный на адрес {email}. Если письмо не пришло, проверьте папку «Спам»</>}
          </DialogDescription>
        </DialogHeader>
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              <LoginForm onChangeMode={(stage: AutoDialogModeType) => onChangeMode(stage)} />
            </motion.div>
          ) : mode === "register" ? (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -20 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
            >
              {stage === 1 ? (
                <motion.div
                  key="1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                >
                  <RegisterFormStageOne
                    onChangeEmail={(email) => onChangeEmail(email)}
                    onChangeStage={(stage) => onChangeStage(stage)}
                  />
                </motion.div>
              ) : stage === 2 ? (
                <motion.div
                  key="2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 20, opacity: 0 }}
                >
                  <RegisterFormStageTwo
                    email={email}
                    onChangeStage={(stage) => onChangeStage(stage)}
                  />
                </motion.div>
              ) : (
                stage === 3 && (
                  <motion.div
                    key="3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                  >
                    <RegisterFormStageThree
                      email={email}
                      onClose={onCloseModal}
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          ) : (
            mode === "resetPassword" && (
              <motion.div
                key="resetPassword"
                initial={{ opacity: 0, x: -20 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 20, opacity: 0 }}
              >
                <ResetPasswordForm />
              </motion.div>
            )
          )}
        </AnimatePresence>

        {(mode === "login" || mode === "resetPassword" || stage === 1) && (
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
                  prevState === "login" ? "register" : "login",
                )
              }
              variant="secondary"
            >
              {mode === "login"
                ? "Зарегистрироваться"
                : "Войти в уже существующий аккаунт"}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
