"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !localStorage.getItem("access_token")) {
      router.push("/login");
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      <button onClick={logout}>Logout</button>
    </div>
  );
}