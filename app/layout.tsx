import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cursor AI - Die beste KI-gestützte Entwicklungsumgebung",
  description:
    "Eine Präsentation über Cursor AI, den fortschrittlichen KI-gestützten Coding-Assistenten",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="dark scroll-smooth">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          html {
            scroll-behavior: smooth;
            scrollbar-width: thin;
            scrollbar-color: rgba(59, 130, 246, 0.5) rgba(17, 24, 39, 0.8);
          }
          
          body {
            overflow-x: hidden;
          }
          
          section {
            scroll-snap-align: start;
          }
          
          /* Custom scrollbar styles */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(17, 24, 39, 0.8);
          }
          
          ::-webkit-scrollbar-thumb {
            background: rgba(59, 130, 246, 0.5);
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(59, 130, 246, 0.7);
          }
        `,
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-black font-sans antialiased text-white overflow-x-hidden snap-y snap-mandatory",
          inter.className
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-screen flex-col">{children}</div>
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
