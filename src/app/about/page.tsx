"use client";

import React, { useState, useEffect } from "react";
import NavBar from "../components/navBar";
import AddButton from "../components/AddButton";
// import Functionality from "./components/functionality";
import Dashboard from "../components/DashBoard";
// import Dashboard from "./components/dashboard";
// import PlusButton from "./components/PlusButton";
// import FadingText from "./components/fadingText";
// import ConnectWalletButton from "./components/metaaaa";

export default function Home() {
    const [theme, setTheme] = useState("light");
    const [isAnimating, setIsAnimating] = useState(false); // Controls sheet visibility
    const [overlayColor, setOverlayColor] = useState("#121212"); // Default dark theme overlay
    const [transform, setTransform] = useState({ x: 0, y: 0 })

    // Load the initial theme from localStorage
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.classList.toggle("dark", storedTheme === "dark");
        document.body.classList.toggle("dark", storedTheme === "dark");
    }, []);

    // Handle theme toggle with animation
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setOverlayColor(newTheme === "dark" ? "#121212" : "#ffffff"); // Set overlay color to match new theme
        setIsAnimating(true); // Start the animation

        setTimeout(() => {
            setTheme(newTheme);
            document.documentElement.classList.toggle("dark", newTheme === "dark");
            document.body.classList.toggle("dark", newTheme === "dark");

            localStorage.setItem("theme", newTheme);
        }, 500); // Change theme halfway through the animation

        setTimeout(() => {
            setIsAnimating(false); // End the animation
        }, 1000); // Match the animation duration
    };
    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            const { clientX, clientY } = event;
            const { innerWidth, innerHeight } = window;
            const offsetX = (clientX / innerWidth - 0.5) * -20;
            const offsetY = (clientY / innerHeight - 0.5) * -20;
            setTransform({ x: offsetX, y: offsetY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div className={`relative overflow-hidden ${theme === "dark" ? "dark" : ""}`}>
            {isAnimating && (
                <div
                    className="fixed inset-0 z-50 transition-transform duration-[1000ms] ease-[cubic-bezier(0.4, 0, 0.2, 1)] transform translate-x-0 animate-slide"
                    style={{ backgroundColor: overlayColor }}
                ></div>
            )}

            <NavBar toggleTheme={toggleTheme} />
            <div
    className="flex flex-col justify-center items-center min-h-screen px-8"
    style={{ transform: `translate(${transform.x}px, ${transform.y}px)` }}
>
    <h1 className="md:text-9xl text-6xl font-sans font-black">Welcome to Blocky</h1>
    <div className="mt-16 text-2xl font-sans">
    Welcome to *Blocky*, your ultimate blockchain-powered platform for seamless subscription management. We’re here to simplify your subscription experience by combining the power of blockchain technology with user-friendly functionality.  

### Who We Are  
At Blocky, we believe in empowering you to take full control of your subscriptions. Say goodbye to juggling multiple platforms, missed renewals, or complicated payment processes. Our mission is to make managing your subscriptions effortless, transparent, and secure.  

### What We Do  
Blocky serves as the central hub for all your subscription needs. Here’s how we help:  
- *Unified Subscription Dashboard*: Easily track and manage all your subscriptions in one place, from entertainment services to productivity tools.  
- *Blockchain-Powered Security*: Enjoy the benefits of decentralized technology, ensuring that your data and payments are secure and tamper-proof.  
- *Metamask Integration*: Make payments directly through your Metamask wallet, offering a fast, secure, and crypto-enabled way to handle your transactions.  
- *Smart Notifications*: Stay on top of upcoming renewals and never miss a payment with timely alerts and reminders.  

### Why Choose Blocky?  
- *Simplified Management*: A single platform for organizing all your subscriptions.  
- *Next-Level Security*: Powered by blockchain to protect your data and transactions.  
- *Crypto-Friendly Payments*: Use your Metamask wallet for smooth, decentralized transactions.  
- *Transparent and Reliable*: Say goodbye to hidden fees or surprises – you’re always in control.  

### Join the Future of Subscription Management  
Blocky is more than just a tool – it’s a solution designed to give you peace of mind and complete control over your subscriptions. Simplify your life with the power of blockchain technology.  

*Manage smarter. Pay securely. Subscribe effortlessly – with Blocky.*
    </div>
</div>
            {/* <Functionality /> */}
            {/* <AddButton /> */}
            {/* <Dashboard /> */}
            {/* <PlusButton onClick={() => console.log("Clicked")} /> */}
            {/* <Subscriptions /> */}
            <div className="mb-[125px]">
            </div>
        </div>
    );
}
