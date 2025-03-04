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
  Menu,
  Twitter,
  Linkedin,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef<HTMLElement | null>(null);
  const mobileNavRef = useRef<HTMLDivElement | null>(null);

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

  // Scroll active button into view in mobile navigation
  useEffect(() => {
    if (mobileNavRef.current) {
      const activeButton = mobileNavRef.current.querySelector(
        `button[data-section="${activeSection}"]`
      );

      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeSection]);

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
      className="flex min-h-screen flex-col items-center relative overflow-hidden w-full"
    >
      {/* Header mit Auth Button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 w-full">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center max-w-full">
          <div className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text truncate">
            Cursor AI
          </div>
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <AuthButton />
          </div>
        </div>
      </div>

      {/* Desktop Side Navigation - nur auf größeren Bildschirmen sichtbar */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block">
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

      {/* Mobile Navigation - unten fixiert, nur auf mobilen Geräten sichtbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gray-900/90 backdrop-blur-md border-t border-gray-800 w-full">
        <div className="relative">
          {/* Linker Farbverlauf als Scroll-Hinweis */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-900/90 to-transparent z-10 pointer-events-none"></div>

          {/* Rechter Farbverlauf als Scroll-Hinweis */}
          <div className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-900/90 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={mobileNavRef}
            className="overflow-x-auto pb-1"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div
              className="flex items-center py-2 px-4 min-w-max"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  data-section={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-2 mx-1 flex flex-col items-center justify-center transition-all duration-300 min-w-[60px] rounded-md ${
                    activeSection === section.id
                      ? "text-blue-500 bg-blue-500/10"
                      : "text-gray-400 hover:text-gray-200"
                  } ${index === sections.length - 1 ? "mr-6" : ""} ${
                    index === 0 ? "ml-2" : ""
                  }`}
                >
                  <div className="flex items-center justify-center h-7 w-7 my-1">
                    {section.icon}
                  </div>
                  <span className="text-[10px] truncate w-full text-center mb-1">
                    {section.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - wird nur angezeigt, wenn das Menü geöffnet ist */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden flex items-center justify-center overflow-hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 p-4 rounded-xl border border-gray-800 w-[90%] max-w-md max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-3">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      scrollToSection(section.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`p-2 flex items-center gap-2 transition-all duration-300 rounded-lg ${
                      activeSection === section.id
                        ? "bg-blue-600/20 text-blue-400"
                        : "hover:bg-gray-800 text-gray-300 hover:text-white"
                    }`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      {section.icon}
                    </div>
                    <span className="text-base truncate">{section.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-20 md:bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50"
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
      <Footer />
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
      className="flex min-h-screen flex-col items-center justify-center text-center px-4 py-16 pb-24 md:pb-16 relative w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2"
      >
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text"
        >
          Cursor AI
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-4xl font-semibold mb-6"
        >
          Die beste KI-gestützte Entwicklungsumgebung
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8"
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
          className="absolute bottom-16 md:bottom-10 opacity-60"
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 pb-24 md:pb-16 w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Was{" "}
          <span className="bg-gradient-to-r from-red-500 to-yellow-500 text-transparent bg-clip-text">
            Cursor AI
          </span>{" "}
          besonders macht
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants} custom={index}>
              <Card className="bg-gray-900 border-gray-800 text-white hover:border-blue-500 transition-all duration-300 h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    {feature.icon}
                    <CardTitle className="text-sm sm:text-base md:text-lg">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-xs sm:text-sm md:text-base text-gray-300">
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 pb-24 md:pb-16 w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Die{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
            Technologie
          </span>{" "}
          hinter Cursor AI
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <motion.div variants={itemVariants}>
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-3">
              <BrainCircuit className="text-purple-500" />
              Claude 3.7 Sonnet KI-Modell
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
              Cursor AI nutzt das leistungsstarke Claude 3.7 Sonnet-Modell von
              Anthropic, um tiefgehende Codeanalysen und intelligente Vorschläge
              zu generieren.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-3">
              <Eye className="text-blue-500" />
              Semantisches Codeverständnis
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-gray-300">
              Die KI versteht nicht nur Syntax, sondern auch die semantische
              Bedeutung deines Codes, wodurch sie kontextbezogene und
              projektspezifische Vorschläge machen kann.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-xl overflow-hidden border border-gray-800 bg-black/50 p-4 sm:p-6"
          >
            <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6 text-center">
              Leistungsmerkmale:
            </h3>

            <div className="space-y-4 sm:space-y-6">
              <motion.div
                variants={itemVariants}
                className="flex items-start gap-2 sm:gap-3"
              >
                <Sparkles className="text-yellow-500 shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-medium text-base sm:text-lg">
                    Großes Kontextfenster
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Cursor kann eine große Menge an Code auf einmal analysieren,
                    was zu präziseren Vorschlägen führt.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-2 sm:gap-3"
              >
                <FileCode2 className="text-green-500 shrink-0 mt-1" size={18} />
                <div>
                  <h4 className="font-medium text-base sm:text-lg">
                    Multi-Datei-Unterstützung
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Die KI versteht Beziehungen zwischen verschiedenen Dateien
                    in deinem Projekt.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-2 sm:gap-3"
              >
                <TerminalSquare
                  className="text-blue-500 shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <h4 className="font-medium text-base sm:text-lg">
                    Natürliche Spracheingabe
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
                    Du kannst mit Cursor in natürlicher Sprache kommunizieren
                    und Aufgaben beschreiben.
                  </p>
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex items-start gap-2 sm:gap-3"
              >
                <Lightbulb
                  className="text-purple-500 shrink-0 mt-1"
                  size={18}
                />
                <div>
                  <h4 className="font-medium text-base sm:text-lg">
                    Kontinuierliches Lernen
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-400">
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 pb-24 md:pb-16 w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          Einsatzszenarien
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 text-center max-w-3xl mx-auto"
        >
          Entdecke, wie Cursor AI deinen Entwicklungsworkflow in verschiedenen
          Szenarien verbessern kann
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-900 transition-colors duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-3 sm:mb-4">{useCase.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                  {useCase.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-400">
                  {useCase.description}
                </p>
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 pb-24 md:pb-16 w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center"
        >
          Cursor AI vs GitHub Copilot
        </motion.h2>

        <div className="space-y-6">
          {comparisonPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="bg-gray-900/20 rounded-xl overflow-hidden border border-gray-800"
            >
              <div className="bg-gray-900 p-3 sm:p-4">
                <h3 className="font-semibold text-base sm:text-lg">
                  {point.feature}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-lg p-3 sm:p-4 ${
                    point.advantage === "cursor"
                      ? "bg-blue-900/20 border border-blue-800"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-600 flex items-center justify-center">
                      {point.advantage === "cursor" ? (
                        <CheckCircle2 size={16} className="text-white" />
                      ) : null}
                    </div>
                    <h4 className="font-medium text-sm sm:text-base text-blue-400">
                      Cursor AI
                    </h4>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
                    {point.cursor}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
                    {point.cursorDetails}
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className={`rounded-lg p-3 sm:p-4 ${
                    point.advantage === "copilot"
                      ? "bg-yellow-900/20 border border-yellow-800"
                      : "bg-gray-800/50 border border-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-600 flex items-center justify-center">
                      {point.advantage === "copilot" ? (
                        <CheckCircle2 size={16} className="text-white" />
                      ) : null}
                    </div>
                    <h4 className="font-medium text-sm sm:text-base text-yellow-400">
                      GitHub Copilot
                    </h4>
                  </div>

                  <p className="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
                    {point.copilot}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 pb-24 md:pb-16 w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          Tastenkombinationen
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 text-center max-w-3xl mx-auto"
        >
          Steigere deine Produktivität mit diesen praktischen Cursor AI
          Shortcuts
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {shortcuts.map((shortcut, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-900/80 border border-gray-800 rounded-lg p-3 sm:p-4 flex items-center gap-3 sm:gap-4"
            >
              <div className="flex-shrink-0">
                <Keyboard className="text-blue-500" size={20} />
              </div>
              <div>
                <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                  {shortcut.key.split("+").map((k, i) => (
                    <span
                      key={i}
                      className="bg-gray-800 text-white px-1 sm:px-2 py-0.5 sm:py-1 rounded-md text-xs sm:text-sm font-mono"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <p className="text-xs sm:text-sm md:text-base text-gray-300 mt-1">
                  {shortcut.description}
                </p>
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 pb-24 md:pb-16 w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2 text-center"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          Erlebe Cursor AI in Aktion
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
        >
          Sieh dir an, wie Cursor AI deinen Entwicklungsworkflow mit seinen
          leistungsstarken KI-Funktionen transformieren kann
        </motion.p>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="aspect-video bg-gray-900 rounded-xl border border-gray-800 flex items-center justify-center mb-6 sm:mb-8 cursor-pointer shadow-lg shadow-blue-900/10"
        >
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            <PlayCircle size={48} className="text-blue-500" />
            <p className="text-xs sm:text-sm text-gray-400">
              Demo-Video (Platzhalter)
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="text-sm sm:text-base bg-blue-600 hover:bg-blue-700 transform transition-transform hover:scale-105 px-4 sm:px-6 py-2 sm:py-3"
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
      className="flex min-h-screen flex-col items-center justify-center px-4 py-16 pb-24 md:pb-16 w-full overflow-hidden"
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={sectionVariants}
        className="max-w-5xl w-full px-2"
      >
        <motion.h2
          variants={itemVariants}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-center"
        >
          Fazit
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Cursor AI repräsentiert die nächste Generation von Entwicklertools und
          kombiniert die Leistungsfähigkeit von KI mit der Vertrautheit einer
          modernen IDE. Schließe dich tausenden von Entwicklern an, die ihren
          Workflow bereits mit Cursor AI beschleunigen.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16"
        >
          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gray-900 border-gray-800 h-full transform transition-transform hover:border-blue-500">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  10x
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs sm:text-sm md:text-base text-gray-300">
                  Schnellere Entwicklungsgeschwindigkeit im Vergleich zu
                  herkömmlichem Programmieren
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gray-900 border-gray-800 h-full transform transition-transform hover:border-blue-500">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  100K+
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs sm:text-sm md:text-base text-gray-300">
                  Aktive Entwickler, die Cursor AI täglich nutzen
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
            <Card className="bg-gray-900 border-gray-800 h-full transform transition-transform hover:border-blue-500">
              <CardHeader className="pb-2 sm:pb-4">
                <CardTitle className="text-2xl sm:text-3xl font-bold">
                  5★
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs sm:text-sm md:text-base text-gray-300">
                  Durchschnittliche Bewertung von professionellen Entwicklern
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center gap-4 sm:gap-6"
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-center">
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
          <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-4">
            Verfügbar für Windows, macOS und Linux
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="w-full px-4 py-8 bg-black border-t border-gray-800 text-gray-400 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              Cursor AI
            </h3>
            <p className="text-xs sm:text-sm">
              Der KI-gestützte Code-Editor, der deine Produktivität auf das
              nächste Level hebt.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github size={18} />
                <span className="sr-only">GitHub</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter size={18} />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-medium text-white">
              Produkt
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#features"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#comparison"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Vergleich
                </a>
              </li>
              <li>
                <a
                  href="#technology"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Technologie
                </a>
              </li>
              <li>
                <a
                  href="#shortcuts"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Tastaturkürzel
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-medium text-white">
              Ressourcen
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Dokumentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Community
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm sm:text-base font-medium text-white">
              Unternehmen
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Über uns
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Kontakt
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  Datenschutz
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs sm:text-sm hover:text-white transition-colors"
                >
                  AGB
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs mb-3 sm:mb-0">
            © {new Date().getFullYear()} Cursor AI. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-4 text-xs">
            <a href="#" className="hover:text-white transition-colors">
              Impressum
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Datenschutz
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie-Einstellungen
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
