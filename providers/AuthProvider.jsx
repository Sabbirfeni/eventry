"use client";
import { AuthContext } from "@/contexts";
import React, { useState } from "react";

function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
