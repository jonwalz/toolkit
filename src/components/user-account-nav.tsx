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
import { supabaseServerClient } from "@/server/vendor/supabase";
import { LogOutMenuItem } from "./log-out-menu-item";

export async function UserAccountNav() {
  const user = await supabaseServerClient().auth.getUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <UserAvatar
          // user={{ email: user?.user?.email ?? "Welcome" }}
          user={{ email: "test" }}
          className="h-8 w-8"
        />
        test@test.com
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {/* {user. && <p className="font-medium">{user.name}</p>} */}
            {user?.data.user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.data.user?.email}
              </p>
            )}
            <p className="w-[200px] truncate text-sm text-muted-foreground">
              test@test.com
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/billing">Billing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <ModeToggle />
        <DropdownMenuSeparator />
        <LogOutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
