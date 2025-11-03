"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface User {
  name: string | null;
  email: string | null;
  phone: string | null;
}

interface BloodRequest {
  id: string;
  bloodGroup: string;
  city: string | null;
  hospital: string | null;
  reason: string | null;
  requester: User;
  status: string;
}

interface ReceivedRequest {
  id: string;
  status: string;
  request: BloodRequest;
}

export default function BloodRequestPage() {
  const { user } = useSelector((store: RootState) => store.user);
  const [myRequests, setMyRequests] = useState<BloodRequest[]>([]); //blood requests created by me
  const [receivedRequests, setReceivedRequests] = useState<ReceivedRequest[]>(
    []
  ); //blood requests assigned to me
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      if (!user?.id) return;

      try {
        const res = await fetch(`/api/blood-request/${user.id}`);
        const data = await res.json();
        if (data.success) {
          setMyRequests(data.myRequests);
          setReceivedRequests(data.receivedRequests);
        } else {
          console.error("Failed to fetch blood requests:", data.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [user]);

  const handelStatusChange = async (requestId: string, status: string) => {
    // Implement the logic to update the status of the request
    console.log(`Request ID: ${requestId}, New Status: ${status}`);
    // You can make an API call here to update the status in the backend

    try {
      const res = await fetch(`/api/blood-request/recipient-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipientId: requestId, status }),
      });
      const data = await res.json();
      if (data.success) {
        // Update the local state to reflect the status change
        setReceivedRequests((prevRequests) =>
          prevRequests.map((req) =>
            req.id === requestId ? { ...req, status: status } : req
          )
        );
      } else {
        console.error("Failed to update request status:", data.message);
      }
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-12">
      <h1 className="text-3xl font-bold mb-6">Blood Requests Dashboard</h1>

      {/* My Requests */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">My Requests</h2>
        {myRequests.length === 0 && <p>No requests created by you.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myRequests.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedRequest(req.id)}
              className={`border rounded p-4 cursor-pointer hover:shadow ${
                selectedRequest === req.id
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
              }`}
            >
              <h3 className="text-xl font-semibold">{req.bloodGroup} needed</h3>
              <p>
                <strong>Hospital:</strong> {req.hospital || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {req.city || "N/A"}
              </p>
              <p>
                <strong>Reason:</strong> {req.reason || "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {req.status || "N/A"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Received Requests */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Requests for Me</h2>
        {receivedRequests.length === 0 && <p>No requests assigned to you.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {receivedRequests.map((rec) => (
            <div
              key={rec.id}
              onClick={() => setSelectedRequest(rec.request.id)}
              className={`border rounded p-4 cursor-pointer hover:shadow ${
                selectedRequest === rec.request.id
                  ? "border-green-600 bg-green-50"
                  : "border-gray-300"
              }`}
            >
              <h3 className="text-xl font-semibold">
                {rec.request.bloodGroup} needed
              </h3>
              <p>
                <strong>Hospital:</strong> {rec.request.hospital || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {rec.request.city || "N/A"}
              </p>
              <p>
                <strong>Requester:</strong> {rec.request.requester.name} (
                {rec.request.requester.email})
              </p>
              <p>
                <strong>Status:</strong> {rec.status}
              </p>
              <div className="mt-3 flex justify-center">
                {rec.status !== "accepted" && (
                  <Select
                    onValueChange={(value) => handelStatusChange(rec.id, value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Pending" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Pending</SelectLabel>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Selected Request Details */}
      {selectedRequest && (
        <div className="mt-6 p-4 border rounded bg-yellow-50">
          <h2 className="text-xl font-semibold">Selected Request</h2>
          <p>Request ID: {selectedRequest}</p>
          <p>
            You can implement accept/reject logic here for requests assigned to
            you.
          </p>
        </div>
      )}
    </div>
  );
}
