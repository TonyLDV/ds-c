import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

type UserAvatarProps = { src?: string; className?: string };

const UserAvatar = ({ className, src }: UserAvatarProps) => {
  return (
    <Avatar className={cn("size-7 md:h-10 md:w-10", className)}>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default UserAvatar;
