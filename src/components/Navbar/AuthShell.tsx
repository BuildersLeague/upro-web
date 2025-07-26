"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar/Navbar";

export function AuthShell() {
  const { user } = useAuth();
  console.log(user);

  function getDisplayName(user: {
    first_name?: string | null;
    last_name?: string | null;
    email?: string | null;
  }): string | null {
    const first: string | undefined = user.first_name?.trim();
    const last: string | undefined = user.last_name?.trim();

    if (first && last) {
      // rethrn the first letter in upper case
      return (first[0] + last[0]).toUpperCase();
    }

    if (user.email) {
      const prefix = user.email.split("@")[0]; // get the email user name
      if (prefix.length <= 6) return prefix;
      return prefix.slice(0, 6) + "…"; // if the length is more than 6, then trim
    }

    return null;
  }

  let userName: string | null = "";
  if (!user) {
    userName = "Log in";
  } else {
    userName = getDisplayName(user.user_metadata);
  }

  return (
    <>
      <Navbar user={userName} />
    </>
  );
}
