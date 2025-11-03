import { sendEmailForNeededPerson } from "@/lib/nodemailer/email";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { recipientId, status } = await req.json();

    if (!recipientId || !status) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Recipient ID and status are required",
        }),
        { status: 400 }
      );
    }

    // Check if the request is already accepted by someone else
    const recipientRecord = await prisma.bloodRequestRecipient.findUnique({
      where: { id: recipientId },
      include: { request: true },
    });

    if (!recipientRecord) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Recipient record not found",
        }),
        { status: 404 }
      );
    }

    if (status === "accepted") {
      const anyAccepted = await prisma.bloodRequestRecipient.findFirst({
        where: {
          requestId: recipientRecord.requestId,
          status: "accepted",
        },
      });

      if (anyAccepted) {
        return new Response(
          JSON.stringify({
            success: false,
            message: "This request is already accepted by someone else",
          }),
          { status: 400 }
        );
      }

      // Also mark the main BloodRequest as fulfilled
      await prisma.bloodRequest.update({
        where: { id: recipientRecord.requestId },
        data: { status: "fulfilled" },
      });
    }

    if (status === "rejected") {
      //us Recipient ko delete kar do jo reject kar raha hai
      await prisma.bloodRequestRecipient.delete({
        where: { id: recipientId },
      });
      return new Response(
        JSON.stringify({ success: true, message: "Request rejected" }),
        { status: 200 }
      );
    }

    // Update the recipient status
    const updatedRecipient = await prisma.bloodRequestRecipient.update({
      where: { id: recipientId },
      data: { status },
    });

    //find bloodRequest  for email notification
    const bloodRequest = await prisma.bloodRequest.findUnique({
      where: { id: updatedRecipient.requestId },
    });

    // Find the user associated with the blood request
    const user = await prisma.user.findUnique({
      where: { id: bloodRequest?.requesterId },
    });

    console.log(user);

    const acceptencUser = await prisma.user.findUnique({
      where: {
        id: updatedRecipient.userId,
      },
    });

    console.log(acceptencUser);

    // Send email notification
    if (
      user?.email &&
      acceptencUser?.email &&
      acceptencUser?.name &&
      acceptencUser.city &&
      acceptencUser.state &&
      acceptencUser.phone
    ) {
      await sendEmailForNeededPerson(
        user.email,
        acceptencUser?.email,
        acceptencUser.name,
        acceptencUser.city,
        acceptencUser.state,
        acceptencUser.phone
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Request status updated",
        recipient: updatedRecipient,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
