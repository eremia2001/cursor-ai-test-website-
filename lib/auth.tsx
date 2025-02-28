"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import users from "../data/users.json";

// Typen definieren
export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

// Kontext erstellen
export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

// Einfache Hash-Funktion (nur für Demo-Zwecke)
// In Produktion würde man einen sichereren Hash wie bcrypt verwenden
export function hashPassword(password: string): string {
  // MD5-Hash Werte für die Demo
  // "password" = "5f4dcc3b5aa765d61d8327deb882cf99"
  if (password === "password") {
    return "5f4dcc3b5aa765d61d8327deb882cf99";
  }
  // Für andere Passwörter einfach eine andere Zeichenfolge zurückgeben
  return "unknown";
}

// Auth Provider erstellen
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Beim ersten Laden prüfen, ob ein Benutzer im localStorage gespeichert ist
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login-Funktion, die Benutzername und Passwort mit der JSON-Datei abgleicht
  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    // Passwort hashen
    const hashedPassword = hashPassword(password);

    // Benutzer in der JSON-Datei suchen
    const foundUser = users.find(
      (u) => u.username === username && u.password === hashedPassword
    );

    if (foundUser) {
      // Benutzerinfos ohne Passwort speichern
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      return true;
    }

    return false;
  };

  // Logout-Funktion
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom Hook für einfachen Zugriff auf den Auth-Kontext
export function useAuth() {
  return useContext(AuthContext);
}
