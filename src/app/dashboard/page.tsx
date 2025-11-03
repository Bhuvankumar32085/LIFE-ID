"use client";

import BloodInfo from "@/components/BloodInfo";
import DashboardCard from "@/components/DashboardCard";
// import BloodConsent from "@/components/IfUserWantShareBlood";
import StatsChart from "@/components/StatsChart";
// import UpdateProfileDialog from "@/components/UpdateProfileDialog";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";



export default function Dashboard() {
  const { user } = useSelector((state:RootState) => state.user);

  console.log("Dashboard User:", user);

  if (!user) {
    return <p className="text-center mt-20 text-lg">Loading...</p>;
  }

  return (
    <div className="relative min-h-screen bg-gray-50 pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Welcome, <span className="text-blue-600">{user.name}</span>
      </h1>
      <p className="mb-8 text-gray-600">
        Your Life-ID: <span className="font-semibold">{user.lifeId}</span>
      </p>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Demographics" description="Population stats per region" />
        <DashboardCard title="Blood Info" description="Check blood groups for emergencies" />
        <DashboardCard title="Profile" description="Update your personal info" />
      </section>

      <section className="mt-12">
        <StatsChart />
      </section>

      <section className="mt-12">
        <BloodInfo />
      </section>
    </div>
  );
}
