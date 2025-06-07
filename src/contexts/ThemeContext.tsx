"use client";


import React, { createContext, useContext, useState, useEffect } from "react";


type Theme = "light" | "dark";


interface ThemeContextType {
 theme: Theme;
 toggleTheme: () => void;
 setTheme: (theme: Theme) => void;
}


const ThemeContext = createContext<ThemeContextType | undefined>(undefined);


export function ThemeProvider({ children }: { children: React.ReactNode }) {
 const [theme, setThemeState] = useState<Theme>("light");
 const [isLoading, setIsLoading] = useState(true);


 useEffect(() => {
   // Check for stored theme preference or system preference
   const storedTheme = localStorage.getItem("theme") as Theme;
   const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
   const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");
   setThemeState(initialTheme);
   applyTheme(initialTheme);
   setIsLoading(false);
 }, []);


 const applyTheme = (newTheme: Theme) => {
   const root = document.documentElement;
  
   if (newTheme === "dark") {
     root.classList.add("dark");
   } else {
     root.classList.remove("dark");
   }
 };


 const setTheme = (newTheme: Theme) => {
   setThemeState(newTheme);
   localStorage.setItem("theme", newTheme);
   applyTheme(newTheme);
 };


 const toggleTheme = () => {
   const newTheme = theme === "light" ? "dark" : "light";
   setTheme(newTheme);
 };


 // Prevent flash of wrong theme
 if (isLoading) {
   return null;
 }


 return (
   <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
     {children}
   </ThemeContext.Provider>
 );
}


export function useTheme() {
 const context = useContext(ThemeContext);
 if (context === undefined) {
   throw new Error("useTheme must be used within a ThemeProvider");
 }
 return context;
}



