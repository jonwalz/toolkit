"use client";

import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/user-avatar";
import { useRouter } from "next/navigation";
import { clientSideApi } from "@/trpc/react";
import { supabase } from "@/client/supabase";
// import { ModeToggle } from "./mode-toggle";

export function UserAccountNav() {
  const router = useRouter();
  const { data: user } = clientSideApi.user.getUser.useQuery();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <UserAvatar
          // user={{ name: user.name || null, image: user.image || null }}
          user={{ email: user?.email ?? "Welcome" }}
          className="h-8 w-8"
        />
        test@test.com
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {/* {user. && <p className="font-medium">{user.name}</p>} */}
            {/* {user?.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user?.email}
              </p>
            )} */}
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
        {/* <ModeToggle /> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={async (event) => {
            event.preventDefault();
            try {
              await supabase.auth.signOut();
            } catch (e) {
              console.error("Sign out error: ", e);
            }
            router.push("/login");
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
