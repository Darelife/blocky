import React from "react";

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
  onClose,
}) => {
  const domain = `${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "300px",
        height: "300px",
        backgroundColor: "white",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src={logoUrl}
        alt={`${companyName} logo`}
        style={{ width: "80px", height: "80px", marginBottom: "10px" }}
      />
      <h2 style={{ fontSize: "18px", margin: "5px 0" }}>{companyName}</h2>
      <p style={{ fontSize: "14px", color: "#666" }}>{domain}</p>
      <div style={{ marginTop: "10px", fontSize: "14px" }}>
        <p><strong>Since:</strong> {since}</p>
        <p><strong>Total Spent:</strong> ${totalSpent.toFixed(2)}</p>
        <p><strong>In USD:</strong> {inUsd ? "Yes" : "No"}</p>
      </div>
      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default CompanyInfoWindow;
