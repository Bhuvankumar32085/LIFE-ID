"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlices";

export default function BloodConsent({
  userId,
  currentConsent,
}: {
  userId?: string;
  currentConsent?: boolean;
}) {
  const [consent, setConsent] = useState(currentConsent);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleConsentChange = async (value: boolean) => {
    if (!userId) return;
    setLoading(true);

    try {
      const res = await fetch("/api/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, consent: value }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Update local state & Redux store with new user data
        setConsent(data.updatedUser.consentShare);
        dispatch(setUser(data.updatedUser));
      } else {
        console.error("Error updating consent:", data.message);
      }
    } catch (error) {
      console.error("Error updating consent:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Blood Donation</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Blood Donation Consent</DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 mt-2">
          Do you want to share your information with people who need blood in
          your area?
        </p>

        <div className="flex items-center gap-4 mt-6">
          <Switch
            checked={consent}
            onCheckedChange={handleConsentChange}
            disabled={loading}
          />
          <span>{consent ? "Yes, I want to donate" : "No, not now"}</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
