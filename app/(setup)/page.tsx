import React from "react";

import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import InitialModal from "@/components/modals/initial-modal";
import { getInitialProfile } from "@/lib/services/initial-profile";

const SetupPage = async () => {
  const profile = await getInitialProfile();

  const server = await db.server.findFirst({
    where: { members: { some: { profileId: profile.id } } },
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }
  return redirect("/servers");

  // return <InitialModal />;
};

export default SetupPage;
