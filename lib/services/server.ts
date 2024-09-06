import { db } from "../db";
import { getInitialProfile } from "./initial-profile";

export const server = async () => {
  const profile = await getInitialProfile();

  const server = await db.server.findFirst({
    where: { members: { some: { profileId: profile.id } } },
  });
  return server;
};
