"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { buildLoginRedirect } from "@/lib/auth-redirect";

const AuthRedirect = () => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const login = "/login";
    const homePage = "/";

    const target =
      pathname === login || pathname === homePage
        ? login
        : buildLoginRedirect(pathname);

    router.replace(target);
  }, [pathname, router]);

  return null;
};

export default AuthRedirect;