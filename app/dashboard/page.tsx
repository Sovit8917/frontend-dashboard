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

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      {session?.user && (
        <div>
          <p>Name: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
        </div>
      )}
      <button onClick={() => signOut({ callbackUrl: "/login" })}>Logout</button>
    </div>
  );
}