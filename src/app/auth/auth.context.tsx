"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string | null;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userEmail = localStorage.getItem("userEmail");
      setUser({ email: userEmail, token });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (email === "user@example.com" && password === "password123") {
        const mockToken =
          "mock-jwt-token-" + Math.random().toString(36).substring(2);
        localStorage.setItem("token", mockToken);
        console.log(mockToken);
        localStorage.setItem("userEmail", email);
        setUser({ email, token: mockToken });
        return { success: true };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      console.log(error);
      return { success: false, message: "Authentication failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
