import prismadb from "@/lib/prismadb";

export async function getCampaignHistory() {
  return await prismadb.communicationLog.findMany({
    orderBy: { sentAt: "desc" },
    include: { audience: true },
  });
}

export async function sendMessageToAudience(audienceId: number) {
  const audience = await prismadb.audienceSegment.findUnique({
    where: { id: audienceId },
  });

  if (!audience) throw new Error("Audience not found");

  // Simulate sending messages
  const messages = Array.from({ length: audience.audienceSize }, (_, i) => ({
    audienceId,
    status: Math.random() < 0.9 ? "SENT" : "FAILED", // 90% SENT, 10% FAILED
    sentAt: new Date(),
  }));

  return await prismadb.communicationLog.createMany({
    data: messages,
  });
}
