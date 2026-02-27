'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DashboardThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const DashboardThemeContext = createContext<DashboardThemeContextType>({
  isDarkMode: true,
  toggleTheme: () => {},
});

export const useDashboardTheme = () => useContext(DashboardThemeContext);

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved preference
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('dashboard-theme', newMode ? 'dark' : 'light');
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="dashboard-theme">
        {children}
      </div>
    );
  }

  return (
    <DashboardThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <div className={`dashboard-theme ${isDarkMode ? '' : 'light'}`}>
        {children}
      </div>
    </DashboardThemeContext.Provider>
  );
}
