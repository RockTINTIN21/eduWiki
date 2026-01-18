"use client";

import {Controller, UseFormClearErrors, UseFormSetError} from 'react-hook-form';
import React, {useEffect, useState} from "react";
import {HugeiconsIcon} from "@hugeicons/react";
import {CancelCircleIcon, CheckmarkCircle02Icon} from "@hugeicons/core-free-icons";
import {PasswordField} from "@/components/password-field";

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}
interface ValidationCustomFormProps {
  control: any;
  watch:any;
  namePassword?: any;
  nameConfirmPassword?: string;
  setError: UseFormSetError<PasswordFormValues>;
  clearErrors: UseFormClearErrors<PasswordFormValues>;
  group?: boolean;
  confirmPasswordTitle?: string;
  disabled?: boolean;
}

const CustomPasswordInput= 
  (
    {
      watch,
      control,
      setError,
      clearErrors,
      namePassword='password',
      nameConfirmPassword='confirmPassword',
      confirmPasswordTitle = 'Повторите пароль',
      disabled,

    }:ValidationCustomFormProps,
  ) => {
  
    const [isTouched, setIsTouched] = useState<boolean>(false);

    const watchedPassword = watch(namePassword);
    const [passwordValidationState, setPasswordValidationState] = useState({
      length: false,
      hasLetter: false,
      hasDigit: false,
    });
    
    useEffect(() => {
      if(watchedPassword){
        setIsTouched(true);
        const trimmedPassword = watchedPassword.trim();
        setPasswordValidationState({
          length: trimmedPassword.length >= 6,
          hasLetter: /[a-zа-я]/.test(trimmedPassword),
          hasDigit: /\d/.test(trimmedPassword),
        });
      }
      if(!watchedPassword){
        setPasswordValidationState({
          length: false,
          hasLetter: false,
          hasDigit: false,
        });
        setIsTouched(false)
      }
    }, [watchedPassword]);
    
    useEffect(() => {
      if(Object.values(passwordValidationState).every(Boolean) && isTouched){
        clearErrors(namePassword)
      }else if(isTouched){
        setError(namePassword, {type:"manual",message:"error"})
      }
    }, [passwordValidationState, watchedPassword]);

    return (
      <div>
        <div>
          <Controller
            name={namePassword}
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <PasswordField
                  type='password'
                  value={field.value}
                  name={field.name}
                  onChange={(e) => field.onChange(e.target.value)}
                  title={'Пароль'}
                  disabled={disabled}
                />
                <div className='space-y-1 pb-4 px-4 text-[#5A5A5A] text-sm'>

                  <div className='flex items-center gap-1'>
                    {isTouched || fieldState.error ? (
                      passwordValidationState.length ? (
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          size={15}
                          color="#00a81f"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={CancelCircleIcon}
                          size={15}
                          color="#e40014"
                          strokeWidth={1.5}
                        />
                      )
                    ) : null}
                    <span className={` ${isTouched || fieldState.error  ? (passwordValidationState.length ? 'styles.validPassword' : 'styles.invalidPassword') : ''}`}>
                      - Минимум 6 символов
                    </span>
                  </div>

                  <div className='flex items-center gap-1'>
                    {isTouched || fieldState.error ? (
                      passwordValidationState.hasLetter ? (
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          size={15}
                          color="#00a81f"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={CancelCircleIcon}
                          size={15}
                          color="#e40014"
                          strokeWidth={1.5}
                        />
                      )
                    ) : null}
                    <span className={` ${isTouched || fieldState.error  ? (passwordValidationState.hasLetter ? 'styles.validPassword' : 'styles.invalidPassword') : ''}`}>
                      - Хотя бы 1 буква
                    </span>
                  </div>

                  <div className='flex items-center gap-1'>
                    {isTouched || fieldState.error ? (
                      passwordValidationState.hasDigit ? (
                        <HugeiconsIcon
                          icon={CheckmarkCircle02Icon}
                          size={15}
                          color="#00a81f"
                          strokeWidth={1.5}
                        />
                      ) : (
                        <HugeiconsIcon
                          icon={CancelCircleIcon}
                          size={15}
                          color="#e40014"
                          strokeWidth={1.5}
                        />
                      )
                    ) : null}
                    <span className={` ${isTouched || fieldState.error  ? (passwordValidationState.hasDigit ? 'styles.validPassword' : 'styles.invalidPassword') : ''}`}>
                      - Хотя бы 1 цифра
                    </span>
                  </div>
                  
                </div>
              </div>
            )}
          />
        </div>

        <Controller
          name={nameConfirmPassword}
          control={control}
          defaultValue=""
          render={({ field, fieldState }) => (
            <PasswordField
              value={field.value}
              name={field.name}
              aria-invalid={!!fieldState.error?.message}
              error={fieldState.error?.message}
              onChange={(e) => field.onChange(e.target.value)}
              title={confirmPasswordTitle}
              disabled={disabled}
            />
          )}
        />

      </div>



    );
  };

export default CustomPasswordInput;
