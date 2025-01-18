import React, { useState, useEffect } from "react";
import Image from "next/image";

interface CompanyInfoWindowProps {
  companyName: string;
  since: string;
  totalSpent: number;
  inUsd: boolean;
  onClose: () => void;
}

const CompanyInfoWindow: React.FC<CompanyInfoWindowProps> = ({
  companyName,
  since,
  totalSpent,
  inUsd,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDarkMode(document.body.classList.contains("dark"));
    }
  }, []);

  const domain = `${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      style={{
        position: "relative",
        bottom: "0",
        width: "100%",
        backgroundColor: isDarkMode ? "#333" : "white",
        color: isDarkMode ? "white" : "black",
        borderTop: isDarkMode ? "1px solid #555" : "1px solid #ccc",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0 -4px 8px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >

      <div
        onClick={toggleCollapse}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "gray",
          padding: "10px",
          cursor: "pointer",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <Image src={logoUrl} alt={`${companyName} logo`} width={50} height={50} />
        <h2 style={{ marginLeft: "10px" }}>{companyName}</h2>
      </div>
      {!isCollapsed && (
        <div style={{ padding: "20px" }}>
          <p>Since: {since}</p>
          <p>
            Total Spent: {totalSpent} {inUsd ? "USD" : "Other Currency"}
          </p>
        </div>
      )}
    </div>
  );
};

export default CompanyInfoWindow;