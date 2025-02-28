"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);

      if (success) {
        toast.success("Erfolgreich angemeldet!");
        router.push("/"); // Nach erfolgreicher Anmeldung zur Startseite navigieren
      } else {
        toast.error("Ungültige Anmeldedaten. Bitte versuche es erneut.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Bei der Anmeldung ist ein Fehler aufgetreten.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl text-center">Anmeldung</CardTitle>
          <CardDescription className="text-center">
            Melde dich an, um auf die Cursor AI-Präsentation zuzugreifen
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Benutzername</Label>
              <Input
                id="username"
                placeholder="Benutzername eingeben"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-gray-950 border-gray-800"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                placeholder="Passwort eingeben"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-950 border-gray-800"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Anmelden...
                </>
              ) : (
                "Anmelden"
              )}
            </Button>
          </CardFooter>
        </form>
        <div className="p-4 text-center text-sm text-gray-500">
          <p>Demo-Zugangsdaten:</p>
          <p>Benutzername: user | Passwort: password</p>
        </div>
      </Card>
    </motion.div>
  );
}
