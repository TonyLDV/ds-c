import { db } from "@/lib/db";
import { currentProfile } from "@/lib/services/current-profile";
import { DirectMessage } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const cursor = searchParams.get("cursor");
    const conversationId = searchParams.get("conversationId");

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!conversationId) {
      return new NextResponse("Conversation ID missing", { status: 400 });
    }

    let messages: DirectMessage[] = [];

    if (cursor) {
      messages = await db.directMessage.findMany({
        take: 10,
        skip: 1,
        cursor: { id: cursor },
        where: { conversationId },
        include: { member: { include: { profile: true } } },
        orderBy: { createdAt: "desc" },
      });
    } else {
      messages = await db.directMessage.findMany({
        take: 10,
        where: { conversationId },
        include: { member: { include: { profile: true } } },
        orderBy: { createdAt: "desc" },
      });
    }
    let nextCursor = null;
    if (messages.length === 10) {
      nextCursor = messages[10 - 1].id;
    }

    return NextResponse.json({ items: messages, nextCursor });
  } catch (error) {
    console.log("[DIRECT_MESSAGES_GET]", error);
    return new NextResponse("Internal errro", { status: 500 });
  }
}
