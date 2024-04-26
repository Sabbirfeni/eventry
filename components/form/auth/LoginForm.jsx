"use client";
import { performLogin } from "@/actions";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginForm() {
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const user = await performLogin(formData);

      if (user) {
        setAuth(user);
        router.push("/");
      } else {
        setError(`Please provide a valid login credential!`);
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="my-2 text-red-500">{error}</div>
      <form className="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input type="email" name="email" id="email" />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>

        <button
          type="submit"
          className="btn-primary w-full mt-4 bg-indigo-600 hover:bg-indigo-800"
        >
          Login
        </button>
      </form>
    </>
  );
}

export default LoginForm;
