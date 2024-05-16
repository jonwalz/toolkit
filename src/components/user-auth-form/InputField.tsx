import React from "react";
import {
  FieldError,
  UseFormRegister,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFieldProps<T extends FieldValues> {
  id: Path<T>;
  type: string;
  placeholder: string;
  autoComplete: string;
  disabled: boolean;
  register: UseFormRegister<T>;
  error?: FieldError;
}

const InputField = <T extends FieldValues>({
  id,
  type,
  placeholder,
  autoComplete,
  disabled,
  register,
  error,
}: InputFieldProps<T>) => {
  const registerProps = register(id);

  return (
    <div className="grid gap-1">
      <Label htmlFor={id as string}>
        {(id as string).charAt(0).toUpperCase() + (id as string).slice(1)}
      </Label>
      <Input
        id={id as string}
        type={type}
        placeholder={placeholder}
        autoCapitalize="none"
        autoComplete={autoComplete}
        autoCorrect="off"
        disabled={disabled}
        className="mb-4"
        {...registerProps}
      />
      {error && <p className="px-1 text-xs text-red-600">{error.message}</p>}
    </div>
  );
};

export default InputField;
