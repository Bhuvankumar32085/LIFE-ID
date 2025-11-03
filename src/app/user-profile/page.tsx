"use client";

import BloodConsent from "@/components/IfUserWantShareBlood";
import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const { user } = useSelector((state: RootState) => state.user);

  if (!user)
    return (
      <p className="text-center mt-20 text-lg text-gray-500 animate-pulse">
        Loading...
      </p>
    );

  const userInfo = [
    { label: "Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Life-ID", value: user.lifeId },
    { label: "Date of Birth", value: user.dob ? new Date(user.dob).toLocaleDateString() : "N/A" },
    { label: "Gender", value: user.gender || "N/A" },
    { label: "Phone", value: user.phone || "N/A" },
    { label: "City", value: user.city || "N/A" },
    { label: "State", value: user.state || "N/A" },
    { label: "Country", value: user.country || "N/A" },
    { label: "Blood Group", value: user.bloodGroup || "N/A" },
    { label: "Consent to Donate Blood", value: user.consentShare ? "Yes" : "No" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 md:p-10 space-y-6">
        {/* Top Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h2 className="text-3xl font-bold text-gray-800">User Profile</h2>
          <div className="flex gap-2">
            <UpdateProfileDialog />
            <BloodConsent userId={user.id} currentConsent={user.consentShare} />
          </div>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {userInfo.map((info) => (
            <div
              key={info.label}
              className="bg-gray-50 p-4 rounded shadow hover:shadow-md transition"
            >
              <p className="text-gray-500 font-semibold">{info.label}</p>
              <p className="text-gray-800 font-medium">{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
