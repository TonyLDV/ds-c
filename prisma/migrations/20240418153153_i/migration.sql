-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('ADMIN', 'MODERATOR', 'GUEST');

-- CreateEnum
CREATE TYPE "ChannelType" AS ENUM ('AUDIO', 'TEXT', 'VIDEO');

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "role" "MemberRole" NOT NULL DEFAULT 'GUEST',
    "profileId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ChannelType" NOT NULL DEFAULT 'TEXT',
    "profileId" TEXT NOT NULL,
    "serverId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Member_profileId_idx" ON "Member"("profileId");

-- CreateIndex
CREATE INDEX "Member_serverId_idx" ON "Member"("serverId");

-- CreateIndex
CREATE INDEX "Channel_profileId_idx" ON "Channel"("profileId");

-- CreateIndex
CREATE INDEX "Channel_serverId_idx" ON "Channel"("serverId");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_serverId_fkey" FOREIGN KEY ("serverId") REFERENCES "Server"("id") ON DELETE CASCADE ON UPDATE CASCADE;
