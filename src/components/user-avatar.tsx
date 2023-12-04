// import { User } from "@prisma/client"
import { AvatarProps } from "@radix-ui/react-avatar";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Icons } from "@/components/icons";
import { User } from "@supabase/supabase-js";

interface UserAvatarProps extends AvatarProps {
  // user: Pick<User, "image" | "name">
  user: Pick<User, "email">;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {/* TODO: To  */}
      {/* {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : ( */}
      <AvatarFallback>
        {/* TODO: change user.email to user.name */}
        <span className="sr-only">{user.email}</span>
        <Icons.user className="h-4 w-4" />
      </AvatarFallback>
      {/* )} */}
    </Avatar>
  );
}
