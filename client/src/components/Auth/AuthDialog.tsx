import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AuthForm from "@/components/Auth/AuthForm";

interface ModalProps {
  children: React.ReactNode;
  buttonName: string;
}

const AuthDialog = () => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-accent">Войти</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className={"text-center text-2xl font-medium!"}>
              Вход
            </DialogTitle>
            <DialogDescription className={"text-center font-medium text-[#5A5A5A]"}>
              Продолжая, вы соглашаетесь с Политикой конфиденциальности и
              Пользовательским соглашением.
            </DialogDescription>
          </DialogHeader>
          <AuthForm />
          {/*<DialogFooter>*/}
          {/*  <DialogClose asChild>*/}
          {/*    <Button variant="outline">Cancel</Button>*/}
          {/*  </DialogClose>*/}
          {/*  <Button type="submit">Save changes</Button>*/}
          {/*</DialogFooter>*/}
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AuthDialog;
