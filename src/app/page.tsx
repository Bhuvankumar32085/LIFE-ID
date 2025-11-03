"use client";
import { Button } from "@/components/ui/button";
import { clearUser, setUser } from "@/store/slices/userSlices";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((store: RootState) => store.user);

  console.log("User from Redux Store:", user);
  useEffect(() => {
    const fatchuser = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();
        if (data.success) {
          // Dispatch action to store user data in Redux store
          dispatch(setUser(data.user));
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        dispatch(clearUser());
      }
    };
    fatchuser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="pt-24 max-w-7xl mx-auto px-6">
        <section className="text-center py-20">
          <h1 className="text-5xl font-bold text-gray-800">
            Welcome to <span className="text-blue-600">Life-ID</span>
          </h1>
          <p className="mt-6 text-gray-600 text-lg">
            Your unique Life-ID to track population, demographics, and blood
            info securely.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            {/* <SignIn> */}
            <Button
              // onClick={handletSigin}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Get Started
            </Button>
            {/* </SignIn> */}
            <Button className="bg-gray-200 text-gray-800 hover:bg-gray-300">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Unique Life-ID</h2>
            <p>Each member gets a unique ID similar to Aadhaar.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Demographics</h2>
            <p>Track population stats: male, female, children per region.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold mb-2">Blood Info</h2>
            <p>Check blood groups for emergency donation requests.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
