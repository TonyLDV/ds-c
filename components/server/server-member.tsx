"use client";

import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import UserAvatar from "../user-avatar";

type ServerMemberProps = {
  member: Member & { profile: Profile };
  server: Server;
};
const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: (
    <ShieldCheck className="size-4 mr-2 text-indigo-500" />
  ),
  [MemberRole.ADMIN]: <ShieldAlert className="size-4 mr-2 text-rose-500" />,
};
const ServerMember = ({ member, server }: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full gover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700"
      )}
    >
      <UserAvatar src={member.profile.imageUrl} className="size-8 md:size-8" />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-400 group-hover:text-zinc-300 transition ",
          params?.memberId === member.id &&
            "text-zinc-200 group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};

export default ServerMember;
