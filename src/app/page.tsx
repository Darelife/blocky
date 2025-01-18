"use client";

import React, { useState, useEffect } from "react";
import NavBar from "./components/navBar";
import FadingText from "./components/fadingText";
import ConnectWalletButton from "./components/metaaaa";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [isAnimating, setIsAnimating] = useState(false); // Controls sheet visibility
  const [overlayColor, setOverlayColor] = useState("#121212"); // Default dark theme overlay

  // Load the initial theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Handle theme toggle with animation
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setOverlayColor(newTheme === "dark" ? "#121212" : "#ffffff"); // Set overlay color to match new theme
    setIsAnimating(true); // Start the animation

    setTimeout(() => {
      setTheme(newTheme);
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
    }, 500); // Change theme halfway through the animation

    setTimeout(() => {
      setIsAnimating(false); // End the animation
    }, 1000); // Match the animation duration
  };

  return (
    <div className={`relative overflow-hidden ${theme === "dark" ? "dark" : ""}`}>
      {isAnimating && (
        <div
          className="fixed inset-0 z-50 transition-transform duration-[1000ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] transform translate-x-0 animate-slide"
          style={{ backgroundColor: overlayColor }}
        ></div>
      )}

      <NavBar toggleTheme={toggleTheme} />
      <div className="flex justify-center items-center min-h-screen mt-[-4em]">
        <h1 className="md:text-9xl text-6xl font-mono font-black">BLOCKY</h1>
      </div>

    </div>
  );
}
