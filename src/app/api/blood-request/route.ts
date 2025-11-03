import { sendEmailForBloodDonation } from "@/lib/nodemailer/email";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { bloodGroup, city, hospital, reason, requesterId } = await req.json();

    if (!bloodGroup || !city || !hospital || !reason || !requesterId) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required." }),
        { status: 400 }
      );
    }

    const requester = await prisma.user.findUnique({
      where: { id: requesterId },
    });

    if (!requester) {
      return new Response(
        JSON.stringify({ success: false, message: "Requester not found." }),
        { status: 404 }
      );
    }

    if (requester.bloodGroup !== bloodGroup) {
      return new Response(
        JSON.stringify({ success: false, message: "Blood group mismatch." }),
        { status: 400 }
      );
    }

    // Create the blood request
    const bloodRequest = await prisma.bloodRequest.create({
      data: {
        bloodGroup,
        city,
        hospital,
        reason,
        requesterId,
      },
    });

    // Find users to notify
    const usersToNotify = await prisma.user.findMany({
      where: {
        bloodGroup,
        city,
        consentShare: true,
        NOT: { id: requesterId }, // bo user find hoga jiski id requesterId ke barabar na ho
      },
    });

    console.log(usersToNotify)

    // Create recipient records & send emails
    for (const user of usersToNotify) {
      // 1️⃣ Create record in BloodRequestRecipient
      await prisma.bloodRequestRecipient.create({
        data: {
          requestId: bloodRequest.id,
          userId: user.id,
          status: "pending",
        },
      });

      // 2️⃣ Send email notification
      if (user.email && user.name) {
        await sendEmailForBloodDonation({
          email: user.email,
          userName: user.name,
          bloodGroup,
          hospital,
          city,
          phone: requester.phone || "",
        });
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Blood request created successfully.",
        bloodRequest,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blood request:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
