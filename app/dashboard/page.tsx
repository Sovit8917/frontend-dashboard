"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6">
        
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          User Information
        </h2>

        {session?.user && (
          <div className="space-y-3 text-gray-600">
            <p>
              <span className="font-medium text-gray-800">Name:</span>{" "}
              {session.user.name}
            </p>
            <p>
              <span className="font-medium text-gray-800">Email:</span>{" "}
              {session.user.email}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}