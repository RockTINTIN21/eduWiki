"use client";

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {apiFetch} from "@/lib/api";
import {toast} from "sonner";

const ResendOtpCode = ({email}: {email: string}) => {


  const [over, setOver] = useState(false);
  const [time, setTime] = useState(59);

  const tick = () => {
    if (over) return;
    if(time === 0){
      setOver(true);
    }
    setTime((prevState)=> prevState - 1);

  };

  useEffect(()=> {
    const timerID = setInterval(tick, 1000);
    return () => clearInterval(timerID);
  })

  const resendCode = async () => {

    setTime(59)
    setOver(false);
    await apiFetch(
      "/auth/verification-otp",
      {
        method: "POST",
        json: {email},
      },
    );

    toast.success('Код подтверждения отправлен', {position: 'top-center'})

  }

  return (
    <Button disabled={!over} onClick={()=> resendCode()} variant='secondary' className='w-full'>
      {!over ? `Повторно отправить код через: ${time}` : 'Повторно отправить код'}
    </Button>
  );
};

export default ResendOtpCode;