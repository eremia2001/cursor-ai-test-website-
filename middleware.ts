import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Das Routing überlassen wir dem Client-seitigen Code
  // In dieser Demo-Version der Anwendung wird die Authentifizierung im Browser mit localStorage gehandhabt
  // In einer richtigen Produktionsanwendung würden wir hier die Authentifizierung serverseitig implementieren
  return NextResponse.next();
}

// Die Middleware auf bestimmte Pfade anwenden, nicht auf statische Dateien
export const config = {
  matcher: [
    // Nicht auf statische Dateien anwenden
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
