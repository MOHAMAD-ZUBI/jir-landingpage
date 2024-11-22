"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Environment = 0 | 1; // 0 for production, 1 for test

interface EnvironmentContextType {
  environment: Environment;
  setEnvironment: (env: Environment) => void;
}

const EnvironmentContext = createContext<EnvironmentContextType | undefined>(
  undefined
);

interface EnvironmentProviderProps {
  children: ReactNode;
}

export function EnvironmentProvider({ children }: EnvironmentProviderProps) {
  // Initialize state from localStorage, default to 0 if not found
  const [environment, setEnvironmentState] = useState<Environment>(() => {
    // Only access localStorage during client-side rendering
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("environment");
      return saved ? (parseInt(saved) as Environment) : 0;
    }
    return 0;
  });

  // Custom setter that updates both state and localStorage
  const setEnvironment = (env: Environment) => {
    setEnvironmentState(env);
    localStorage.setItem("environment", env.toString());
  };

  return (
    <EnvironmentContext.Provider value={{ environment, setEnvironment }}>
      {children}
    </EnvironmentContext.Provider>
  );
}

// Custom hook to use the environment context
export function useEnvironment() {
  const context = useContext(EnvironmentContext);
  if (context === undefined) {
    throw new Error(
      "useEnvironment must be used within an EnvironmentProvider"
    );
  }
  return context;
}
