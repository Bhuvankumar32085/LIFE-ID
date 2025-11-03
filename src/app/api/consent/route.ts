import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const { userId, consent } = await req.json();

    if (typeof consent !== "boolean" || !userId) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid input" }),
        { status: 400 }
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { consentShare: consent },
    });

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 404 }
      );
    }

    revalidatePath("/user-profile");

    return new Response(
      JSON.stringify({
        success: true,
        message: "Consent updated successfully",
        updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating consent:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Internal server error" }),
      { status: 500 }
    );
  }
}
