"use client";
import { redirect, usePathname } from "next/navigation";
import { buildLoginRedirect } from "@/lib/auth-redirect";

const AuthRedirect = () => {
  const pathname = usePathname();

  return redirect(
    pathname === "/login" || pathname === "/"
      ? "/login"
      : buildLoginRedirect(pathname),
  );
};

export default AuthRedirect;