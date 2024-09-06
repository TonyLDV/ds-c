import React from "react";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Separator } from "../ui/separator";
import NavigationItem from "./navigation-item";
import { ScrollArea } from "../ui/scroll-area";
import NavigationAction from "./navigation-action";
import { currentProfile } from "@/lib/services/current-profile";
import { UserButton } from "@clerk/nextjs";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: { members: { some: { profileId: profile.id } } },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary bg-[#E3E5E8] dark:bg-[#1e1f22] py-3">
      <NavigationAction />

      <Separator className="h-[2px] bg-zink-500 dark:bg-zinc-700 rounded-md w-10 mx-auto" />

      <ScrollArea className="flex-1 w-full" suppressHydrationWarning>
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <UserButton
          afterSignOutUrl="/"
          appearance={{ elements: { avatarBox: "h-[48px] w-[48px]" } }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
