import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { ModeToggle } from "./mode-toggle";
import { LogOutMenuItem } from "./log-out-menu-item";
import { getUser } from "@/actions/user";

export async function UserAccountNav() {
  const user = await getUser();
  const email = user?.data.user?.email ?? "Welcome";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <UserAvatar user={{ email }} className="h-8 w-8" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {/* {user. && <p className="font-medium">{user.name}</p>} */}
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              {email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ModeToggle />
        <DropdownMenuSeparator />
        <LogOutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
