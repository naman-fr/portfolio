"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type DisplayMode = "full" | "recruiter";

interface DisplayModeContextType {
  mode: DisplayMode;
  toggleMode: () => void;
  isRecruiterMode: boolean;
}

const DisplayModeContext = createContext<DisplayModeContextType | undefined>(undefined);

export function DisplayModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<DisplayMode>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("displayMode");
      return (saved as DisplayMode) || "full";
    }
    return "full";
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("displayMode", mode);
    }
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === "full" ? "recruiter" : "full"));
  };

  return (
    <DisplayModeContext.Provider
      value={{
        mode,
        toggleMode,
        isRecruiterMode: mode === "recruiter",
      }}
    >
      {children}
    </DisplayModeContext.Provider>
  );
}

export function useDisplayMode() {
  const context = useContext(DisplayModeContext);
  if (context === undefined) {
    throw new Error("useDisplayMode must be used within a DisplayModeProvider");
  }
  return context;
}

