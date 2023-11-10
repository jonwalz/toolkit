"use client";
import React from "react";
import { NextUIProvider } from "@nextui-org/react";

interface NextUIProviderCompProps {
  children: React.ReactNode;
}

export const NextUIProviderComp = ({ children }: NextUIProviderCompProps) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};
