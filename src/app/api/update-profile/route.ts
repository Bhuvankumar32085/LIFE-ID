import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { dob, gender, phone, city, state, country, bloodGroup, userId } =
      await req.json();

    console.log("Received profile update data:", {
      dob,
      gender,
      phone,
      city,
      state,
      country,
      bloodGroup,
      userId,
    });

    if (phone.length !== 10) {
      return NextResponse.json({
        success: false,
        message: "Invalid phone number. Please enter a 10-digit phone number.",
      });
    }

    // blood group validation
    const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    const existingUser = await prisma.user.findUnique({
      where: { phone },
    });

    if (existingUser && existingUser.id !== userId) {
      return NextResponse.json({
        success: false,
        message: "This phone number is already used by another user.",
      });
    }

    if (!validBloodGroups.includes(bloodGroup)) {
      return NextResponse.json({
        success: false,
        message: "Invalid blood group. Please select a valid blood group.",
      });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        dob: new Date(dob),
        gender,
        phone,
        city,
        state,
        country,
        bloodGroup,
      },
    });

    return NextResponse.json({
      updatedUser,
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to update profile",
    });
  }
}
