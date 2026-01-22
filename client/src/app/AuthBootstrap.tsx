"use client";

import {useAppDispatch, useAppSelector} from "@/lib/store/store";
import {useEffect} from "react";
import {fetchRefresh} from "@/components/Auth/fetch-auth";
import {authSlice} from "@/lib/store/auth/auth.slice";

export default function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRefresh())
  }, [dispatch]);

  return null;
}
