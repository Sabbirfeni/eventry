"use client";

import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

function SignInOut() {
  const { auth, setAuth } = useAuth();
  const router = useRouter();

  const singOut = () => {
    setAuth(null);
    router.push("/login");
  };

  return (
    <div>
      {auth ? (
        <>
          <span>Hello, {auth?.name}</span>
          <span className="mx-2">|</span>
          <a className="courser-pointer" onClick={singOut}>
            Logout
          </a>
        </>
      ) : (
        <>
          <Link href="/login">Login</Link>
        </>
      )}
    </div>
  );
}

export default SignInOut;
