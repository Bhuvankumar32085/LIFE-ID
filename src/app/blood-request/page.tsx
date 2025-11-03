"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function BloodRequestPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [hospital, setHospital] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");

    try {
      const res = await fetch("/api/blood-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bloodGroup,
          city,
          hospital,
          reason,
          requesterId: user?.id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Blood request submitted successfully!");
        // Reset form
        setBloodGroup("");
        setCity("");
        setHospital("");
        setReason("");
      } else {
        setSuccess("Failed to submit request.");
      }
    } catch (err) {
      console.error(err);
      setSuccess("Error submitting request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-20">
      <h1 className="text-2xl font-bold mb-6">Create Blood Request</h1>

      {success && <p className="mb-4 text-green-600 font-medium">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Blood Group</label>
          <select
            className="w-full border p-2 rounded"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">City</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hospital</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={hospital}
            onChange={(e) => setHospital(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Reason (optional)</label>
          <textarea
            className="w-full border p-2 rounded"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </Button>
      </form>
    </div>
  );
}
