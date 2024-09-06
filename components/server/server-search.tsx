"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useParams, useRouter } from "next/navigation";
import { Profile } from "@prisma/client";

type ServerSearchProps = {
  profile: Profile;
  data: {
    label: string;
    type: "channel" | "member";
    data: { icon: React.ReactNode; name: string; id: string }[] | undefined;
  }[];
};

const ServerSearch = ({ data, profile }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const onClick = (id: string, type: "channel" | "member") => {
    setOpen(false);

    if (type === "member") {
      router.push(`/servers/${params?.serverId}/conversation/${id}`);
    }

    if (type === "channel") {
      router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
    console.log("click");
  };
  return (
    <>
      <button
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/50 transition"
        onClick={() => setOpen(true)}
      >
        <Search className="size-4 text-zinc-400" />

        <p className="font-semibold text-sm text-zinc-400 group-hover:text-zinc-300 transition">
          Search
        </p>

        <kbd
          className="pointer-events-none inline-flex h-5 select-none items-center
         gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-xs">CNTRL or CMD</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />

        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {data.map(({ label, type, data }) => (
            <div key={label}>
              {!data?.length ? null : (
                <CommandGroup key={label} heading={label}>
                  {data?.map(({ icon, id, name }) => (
                    <CommandItem key={id} onSelect={() => onClick(id, type)}>
                      {icon}
                      <span>{name}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </div>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
