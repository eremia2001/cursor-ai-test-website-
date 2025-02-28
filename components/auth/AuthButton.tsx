"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2, LogIn, LogOut, User } from "lucide-react";
import { toast } from "sonner";

export function AuthButton() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      logout();
      toast.success("Erfolgreich abgemeldet");
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Bei der Abmeldung ist ein Fehler aufgetreten");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <Button
        onClick={handleLogin}
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-blue-900/20"
      >
        <LogIn size={16} />
        <span>Anmelden</span>
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 text-sm text-gray-400">
        <User size={14} />
        <span>
          Angemeldet als <span className="font-medium">{user.name}</span>
        </span>
      </div>
      <Button
        onClick={handleLogout}
        variant="outline"
        size="sm"
        className="gap-2 hover:bg-red-900/20"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <LogOut size={16} />
        )}
        <span>Abmelden</span>
      </Button>
    </div>
  );
}
