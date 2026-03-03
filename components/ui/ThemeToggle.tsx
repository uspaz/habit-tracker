"use client";
import { useState, useEffect } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    // Leer preferencia guardada
    const saved = localStorage.getItem("theme");
    const isDark = saved === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 flex items-center justify-center shadow-lg hover:scale-110 transition-all cursor-pointer z-50"
      title={dark ? "Modo claro" : "Modo oscuro"}
    >
      {dark ? <FiSun className="text-xl" /> : <FiMoon className="text-xl" />}
    </button>
  );
};

export default ThemeToggle;
