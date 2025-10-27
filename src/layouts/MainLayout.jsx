import { Outlet } from "@tanstack/react-router";
import { useEffect } from "react";
import Navbar from "../componnets/navbar/Navbar";
import Footer from "../componnets/Footer";
import ScrollToTop from "../componnets/ScrollToTop";
import ChatWidgetAppwrite from "../componnets/ChatWidgetAppwrite";

const MainLayout = () => {
  useEffect(() => {
    // Load Calendly widget script for embed functionality
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    script.onload = () => {
      console.log("Calendly script loaded successfully");
    };

    script.onerror = () => {
      console.error("Failed to load Calendly script");
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]'
      );
      if (existingScript) existingScript.remove();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="px-4">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      {/* <ChatWidgetAppwrite /> */}
    </>
  );
};

export default MainLayout;
