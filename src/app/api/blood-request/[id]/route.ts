import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    console.log("Logged-in user ID:", user?.id);

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not logged in" }),
        { status: 401 }
      );
    }

    const userRecord = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });

    if (!userRecord) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    const userId = userRecord.id; //logged in user's id in our database

    // 1️⃣ Requests created by this user
    const myRequests = await prisma.bloodRequest.findMany({
      where: { requesterId: userId },
      include: { requester: true },
      orderBy: { createdAt: "desc" },
    });

    // 2️⃣ Requests where this user is a recipient
    const receivedRequests = await prisma.bloodRequestRecipient.findMany({
      where: { userId },
      include: {
        request: { include: { requester: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return new Response(
      JSON.stringify({
        success: true,
        myRequests,
        receivedRequests,
        message: "Blood requests fetched successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blood requests:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to fetch requests" }),
      { status: 500 }
    );
  }
}
