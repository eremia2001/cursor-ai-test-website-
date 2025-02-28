"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowDown,
  Code2,
  Github,
  MonitorSmartphone,
  PlayCircle,
  Zap,
  Terminal,
  BrainCircuit,
  Keyboard,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  Sparkles,
  Rocket,
  FileCode2,
  Eye,
  TerminalSquare,
  Lightbulb,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import cursorPreview from "@/public/cursor-preview.svg";
import { AuthButton } from "@/components/auth/AuthButton";

// Sections definition for navigation
const sections = [
  { id: "hero", name: "Startseite", icon: <Sparkles size={16} /> },
  { id: "features", name: "Features", icon: <Zap size={16} /> },
  { id: "technology", name: "Technologie", icon: <BrainCircuit size={16} /> },
  { id: "use-cases", name: "Einsatzszenarien", icon: <Code2 size={16} /> },
  { id: "comparison", name: "Vergleich", icon: <ShieldCheck size={16} /> },
  { id: "shortcuts", name: "Shortcuts", icon: <Keyboard size={16} /> },
  { id: "demo", name: "Demo", icon: <PlayCircle size={16} /> },
  { id: "conclusion", name: "Fazit", icon: <Rocket size={16} /> },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);
  const mainRef = useRef<HTMLElement | null>(null);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        setScrollY(window.scrollY);
      }
    };

    // Throttle scroll events for better performance
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const throttledHandleScroll = () => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          handleScroll();
          timeoutId = null;
        }, 50);
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Scroll to section
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Scroll to top button visibility
  const showScrollTop = scrollY > 500;

  return (
    <main
      ref={mainRef}
      className="flex min-h-screen flex-col items-center relative"
    >
      {/* Header mit Auth Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Cursor AI
          </div>
          <AuthButton />
        </div>
      </div>

      {/* Side Navigation */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40">
        <div className="bg-gray-900/70 backdrop-blur-sm rounded-full px-2 py-4 flex flex-col items-center space-y-4 border border-gray-800">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group relative ${
                activeSection === section.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {section.icon}
              <span className="absolute right-full mr-2 whitespace-nowrap bg-gray-900 text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {section.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <HeroSection />
      <FeatureSection />
      <TechnologySection />
      <UseCasesSection />
      <ComparisonSection />
      <ShortcutsSection />
      <DemoSection />
      <ConclusionSection />
    </main>
  );
}

// Enhanced animation variants for sections
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Hero Section component
function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center text-center p-6 relative"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-4xl"
      >
        <motion.h1
          variants={itemVariants}
          className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
        >
          Cursor AI
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-semibold mb-6"
        >
          Die beste KI-gestützte Entwicklungsumgebung
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 mb-8"
        >
          Revolutioniere deine Programmierung mit KI-gestütztem Pair Programming
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="rounded-xl overflow-hidden border border-gray-800 shadow-2xl shadow-blue-500/20 w-full max-w-3xl mx-auto my-8"
        >
          <Image
            src="/cursor.jpeg"
            alt="Cursor AI Interface"
            width={1200}
            height={675}
            className="w-full"
          />
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 opacity-60"
        >
          <ArrowDown size={32} />
          <p className="text-sm text-gray-400 mt-2">Scroll zum Entdecken</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Feature Section component
function FeatureSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const features = [
    {
      title: "KI Pair Programming",
      icon: <Code2 size={24} className="text-blue-500" />,
      description:
        "Programmiere mit einem KI-Assistenten, der deine Absichten aktiv versteht und bei der Problemlösung hilft.",
    },
    {
      title: "Intelligente Code-Vervollständigung",
      icon: <Zap size={24} className="text-purple-500" />,
      description:
        "Erhalte intelligente Code-Vorschläge, die weit über einfache Auto-Vervollständigung hinausgehen.",
    },
    {
      title: "Plattformübergreifend",
      icon: <MonitorSmartphone size={24} className="text-green-500" />,
      description:
        "Verfügbar für macOS, Windows und Linux mit nahtloser Synchronisation.",
    },
    {
      title: "Basiert auf VSCode",
      icon: <Github size={24} className="text-orange-500" />,
      description:
        "Vertraute Benutzeroberfläche basierend auf VSCode mit allen Erweiterungen, die du liebst.",
    },
  ];

  return (
    <section
      id="features"
      className="flex min-h-screen flex-col items-center justify-center p-10"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-12 text-center"
        >
          Was{" "}
          <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
            Cursor AI
          </span>{" "}
          besonders macht
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} custom={index}>
              <Card className="bg-gray-900 border-gray-800 text-white hover:border-blue-500 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300 text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Technology Section
function TechnologySection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <section
      id="technology"
      className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-b from-black to-gray-900"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-12 text-center"
        >
          Die{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Technologie
          </span>{" "}
          hinter Cursor AI
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <BrainCircuit className="text-purple-500" />
              Claude 3.7 Sonnet KI-Modell
            </h3>
            <p className="text-gray-300 text-lg mb-8">
              Cursor AI nutzt das leistungsstarke Claude 3.7 Sonnet-Modell von
              Anthropic, um tiefgehende Codeanalysen und intelligente Vorschläge
              zu generieren.
            </p>

            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Eye className="text-blue-500" />
              Semantisches Codeverständnis
            </h3>
            <p className="text-gray-300 text-lg">
              Die KI versteht nicht nur Syntax, sondern auch die semantische
              Bedeutung deines Codes, wodurch sie kontextbezogene und
              projektspezifische Vorschläge machen kann.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-gray-800 bg-black/50 p-6"
          >
            <h3 className="text-xl font-semibold mb-6 text-center">
              Leistungsmerkmale:
            </h3>

            <div className="space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <Sparkles className="text-yellow-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-lg">Großes Kontextfenster</h4>
                  <p className="text-gray-400">
                    Cursor kann eine große Menge an Code auf einmal analysieren,
                    was zu präziseren Vorschlägen führt.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <FileCode2 className="text-green-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-lg">
                    Multi-Datei-Unterstützung
                  </h4>
                  <p className="text-gray-400">
                    Die KI versteht Beziehungen zwischen verschiedenen Dateien
                    in deinem Projekt.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <TerminalSquare className="text-blue-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-lg">
                    Natürliche Spracheingabe
                  </h4>
                  <p className="text-gray-400">
                    Du kannst mit Cursor in natürlicher Sprache kommunizieren
                    und Aufgaben beschreiben.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-3"
              >
                <Lightbulb className="text-purple-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-lg">
                    Kontinuierliches Lernen
                  </h4>
                  <p className="text-gray-400">
                    Die KI lernt von deinem Code-Stil und verbessert sich mit
                    der Zeit.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// Use Cases Section
function UseCasesSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const useCases = [
    {
      title: "Code-Erstellung",
      description:
        "Generiere komplette Funktionen, Klassen oder ganze Dateien basierend auf deinen Beschreibungen.",
      icon: <Code2 className="text-blue-500" size={36} />,
    },
    {
      title: "Code-Erklärung",
      description:
        "Erhalte klare Erklärungen zu komplexem Code, der von anderen geschrieben wurde.",
      icon: <Terminal className="text-green-500" size={36} />,
    },
    {
      title: "Fehlersuche",
      description:
        "Identifiziere und behebe Bugs mit Hilfe der KI, die dir detaillierte Erklärungen liefert.",
      icon: <Zap className="text-yellow-500" size={36} />,
    },
    {
      title: "Refactoring",
      description:
        "Verbessere die Qualität und Lesbarkeit deines Codes mit intelligenten Refactoring-Vorschlägen.",
      icon: <Rocket className="text-purple-500" size={36} />,
    },
  ];

  return (
    <section
      id="use-cases"
      className="flex min-h-screen flex-col items-center justify-center p-10"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-6 text-center"
        >
          Einsatzszenarien
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
        >
          Entdecke, wie Cursor AI deinen Entwicklungsworkflow in verschiedenen
          Szenarien verbessern kann
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:bg-gray-900 transition-colors duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{useCase.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{useCase.title}</h3>
                <p className="text-gray-400">{useCase.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Comparison Section (Visually Enhanced)
function ComparisonSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const comparisonPoints = [
    {
      feature: "KI-Modell",
      cursor: "Claude 3.7 Sonnet",
      copilot: "GPT-4",
      cursorDetails:
        "Fortschrittliches großes Sprachmodell mit erweitertem Verständnis für Programmierkonzepte",
      copilotDetails: "Leistungsfähiges Modell mit guter Code-Generierung",
      advantage: "cursor",
    },
    {
      feature: "Kontextverständnis",
      cursor: "Umfassendes Codebase-Verständnis",
      copilot: "Begrenztes Kontextfenster",
      cursorDetails:
        "Berücksichtigt die gesamte Codebasis für bessere Vorschläge",
      copilotDetails:
        "Limitierte Fähigkeit, den Gesamtkontext eines Projekts zu verstehen",
      advantage: "cursor",
    },
    {
      feature: "Chat-Schnittstelle",
      cursor: "Tief integrierter Chat",
      copilot: "Nur Seitenpanel",
      cursorDetails:
        "Natürliche Konversation direkt im Editor mit Kontext-Awareness",
      copilotDetails: "Einfache Chatfunktion im Seitenpanel",
      advantage: "cursor",
    },
    {
      feature: "Dateigenerierung",
      cursor: "Multi-Datei-Generierung",
      copilot: "Fokus auf einzelne Dateien",
      cursorDetails:
        "Kann mehrere zusammenhängende Dateien gleichzeitig erstellen",
      copilotDetails: "Primär auf die aktuelle Datei beschränkt",
      advantage: "cursor",
    },
    {
      feature: "Debugging",
      cursor: "Interaktives Debugging",
      copilot: "Grundlegende Vorschläge",
      cursorDetails:
        "Hilft aktiv bei der Fehlersuche und dem Verständnis komplexer Probleme",
      copilotDetails: "Bietet einfache Hinweise zur Fehlerbehebung",
      advantage: "cursor",
    },
  ];

  return (
    <section
      id="comparison"
      className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-b from-gray-900 to-black"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-12 text-center"
        >
          Cursor AI vs GitHub Copilot
        </motion.h2>

        <div className="space-y-8">
          {comparisonPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gray-900/20 rounded-xl overflow-hidden border border-gray-800"
            >
              <div className="bg-gray-900 p-4">
                <h3 className="font-semibold text-lg">{point.feature}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-lg p-4 ${
                    point.advantage === "cursor"
                      ? "bg-blue-900/20 border border-blue-800"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      {point.advantage === "cursor" ? (
                        <CheckCircle2 size={18} className="text-white" />
                      ) : null}
                    </div>
                    <h4 className="font-medium text-blue-400">Cursor AI</h4>
                  </div>

                  <p className="text-lg font-medium mb-2 text-white">
                    {point.cursor}
                  </p>
                  <p className="text-gray-400 text-sm">{point.cursorDetails}</p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-lg p-4 ${
                    point.advantage === "copilot"
                      ? "bg-yellow-900/20 border border-yellow-800"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center">
                      {point.advantage === "copilot" ? (
                        <CheckCircle2 size={18} className="text-white" />
                      ) : null}
                    </div>
                    <h4 className="font-medium text-yellow-400">
                      GitHub Copilot
                    </h4>
                  </div>

                  <p className="text-lg font-medium mb-2 text-white">
                    {point.copilot}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {point.copilotDetails}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// Keyboard Shortcuts Section
function ShortcutsSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  const shortcuts = [
    { key: "Ctrl+K", description: "Öffnet den Cursor AI Chat" },
    { key: "Ctrl+J", description: "Generiert oder vervollständigt Code" },
    { key: "Ctrl+L", description: "Erklärt den ausgewählten Code" },
    { key: "Ctrl+I", description: "Verbessert den ausgewählten Code" },
    { key: "Alt+/", description: "Inline-Vorschläge aktivieren/deaktivieren" },
    { key: "Ctrl+\\", description: "Code-Ausführung und Erklärung" },
    { key: "Ctrl+Shift+L", description: "Datei mit KI öffnen" },
    { key: "Ctrl+Enter", description: "Chat-Nachricht senden" },
  ];

  return (
    <section
      id="shortcuts"
      className="flex min-h-screen flex-col items-center justify-center p-10"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold mb-6 text-center"
        >
          Tastenkombinationen
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
        >
          Steigere deine Produktivität mit diesen praktischen Cursor AI
          Shortcuts
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortcuts.map((shortcut, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-900/80 border border-gray-800 rounded-lg p-4 flex items-center gap-4"
            >
              <div className="flex-shrink-0">
                <Keyboard className="text-blue-500" size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  {shortcut.key.split("+").map((k, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-white px-2 py-1 rounded-md text-sm font-mono"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <p className="text-gray-300 mt-1">{shortcut.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-12 text-center">
          <p className="text-gray-400">
            Diese Tastenkombinationen können in den Einstellungen angepasst
            werden.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Demo Section
function DemoSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <section
      id="demo"
      className="flex min-h-screen flex-col items-center justify-center p-10"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full text-center"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-8">
          Erlebe Cursor AI in Aktion
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
        >
          Sieh dir an, wie Cursor AI deinen Entwicklungsworkflow mit seinen
          leistungsstarken KI-Funktionen transformieren kann
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="aspect-video bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-center mb-8 cursor-pointer shadow-lg shadow-blue-900/10"
        >
          <div className="flex flex-col items-center gap-4">
            <PlayCircle size={64} className="text-blue-500" />
            <p className="text-gray-400">Demo-Video (Platzhalter)</p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 transform transition-transform hover:scale-105"
          >
            Teste Cursor AI kostenlos
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Conclusion Section
function ConclusionSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });

  return (
    <section
      id="conclusion"
      className="flex min-h-screen flex-col items-center justify-center p-10 bg-gradient-to-b from-black via-gray-900 to-black"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full text-center"
      >
        <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-8">
          Die Zukunft der Programmierung ist hier
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Cursor AI repräsentiert die nächste Generation von Entwicklertools und
          kombiniert die Leistungsfähigkeit von KI mit der Vertrautheit einer
          modernen IDE. Schließe dich tausenden von Entwicklern an, die ihren
          Workflow bereits mit Cursor AI beschleunigen.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gray-900 border-gray-800 h-full transform transition-transform hover:border-blue-500">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">10x</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Schnellere Entwicklungsgeschwindigkeit im Vergleich zu
                  herkömmlichem Programmieren
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gray-900 border-gray-800 h-full transform transition-transform hover:border-blue-500">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">100K+</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Aktive Entwickler, die Cursor AI täglich nutzen
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gray-900 border-gray-800 h-full transform transition-transform hover:border-blue-500">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">5★</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300">
                  Durchschnittliche Bewertung von professionellen Entwicklern
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-6"
        >
          <h3 className="text-2xl font-semibold">
            Bereit, deine Programmiererfahrung zu revolutionieren?
          </h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-900/20"
            >
              Jetzt Cursor AI herunterladen
            </Button>
          </motion.div>
          <p className="text-gray-400 mt-4">
            Verfügbar für Windows, macOS und Linux
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
