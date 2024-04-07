"use client";
import { handleOnSelect } from "@/actions/logout";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export function LogOutMenuItem() {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onSelect={() => handleOnSelect()}
    >
      Sign out
    </DropdownMenuItem>
  );
}
