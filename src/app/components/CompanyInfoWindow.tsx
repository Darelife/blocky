import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CompanyInfoWindowProps {
  companyName: string;
  since: string;
  totalSpent: number;
  inUsd: boolean;
  col1: string;
  isActive: boolean;
  onToggle: () => void;
}

const CompanyInfoWindow: React.FC<CompanyInfoWindowProps> = ({
  companyName,
  since,
  totalSpent,
  inUsd,
  col1,
  isActive,
  onToggle,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDarkMode(document.body.classList.contains("dark"));
    }
  }, []);

  const domain = `${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  return (
    <div
      style={{
        position: "relative",
        bottom: "0",
        width: "100%",
        backgroundColor: isDarkMode ? "#333" : "white",
        color: isDarkMode ? "white" : "black",
        borderTop: isDarkMode ? "1px solid #555" : "1px solid #ccc",
        boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
        transition: "height 0.3s ease",
        overflow: "hidden",
      }}
    >
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: col1,
          color: "white",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        <Image src={logoUrl} alt={`${companyName} logo`} width={50} height={50} />
        <h2 style={{ marginLeft: "10px" }}>{companyName}</h2>
      </div>
      <div
        ref={contentRef}
        style={{
          height: isActive ? `${contentRef.current?.scrollHeight}px` : "0px",
          transition: "height 0.3s ease",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px" }}>
          <p>Since: {since}</p>
          <p>
            Total Spent: {totalSpent} {inUsd ? "USD" : "Other Currency"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoWindow;