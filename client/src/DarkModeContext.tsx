import { createContext, useEffect, useState, ReactNode } from "react";

interface DarkModeContextProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void; //toggle will be a function that handles DOM
}

/** whats going on? */
export const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider
      /** these values are available to all children */
      value={{ isDarkMode, toggleDarkMode: () => setIsDarkMode(!isDarkMode) }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
