"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/lib/auth";
import { motion } from "framer-motion";

export default function LoginPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // Wenn der Benutzer bereits angemeldet ist, zur Startseite weiterleiten
  useEffect(() => {
    if (user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Laden...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-black to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Cursor AI
        </h1>
        <p className="text-xl text-gray-300">
          Melde dich an, um auf die Präsentation zuzugreifen
        </p>
      </motion.div>

      <LoginForm />
    </div>
  );
}
