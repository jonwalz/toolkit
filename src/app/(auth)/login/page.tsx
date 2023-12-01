"use client"
import { Button } from "@nextui-org/react";
import { LoginForm } from "../../_components/Login";
import { redirect } from "next/navigation";

export default function Login() {
  return <LoginForm />;
}