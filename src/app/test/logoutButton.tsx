"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push("/test/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
