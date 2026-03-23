import { auth } from "@/auth";
import { ReactNode } from "react";

export default async function GuestGuard({ children }: { children: ReactNode }) {
  const session = await auth();
  if (session) return null;
  return <>{children}</>;
}