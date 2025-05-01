// components/ThemeToggle.tsx
"use client";

import { useEffect, useState } from "react";
import { getUserTheme, updateUserTheme } from "../lib/theme";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const userTheme = await getUserTheme();
      setTheme(userTheme);
      document.documentElement.classList.toggle("dark", userTheme === "dark");
    };
    fetchTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    await updateUserTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
  );
};

export default ThemeToggle;
