import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface CompanyInfoWindowProps {
  companyName: string;
  since: string;
  amount: number;
  inUsd: boolean;
  col1: string;
  isActive: boolean;
  beneficiary: string;
  interval: string;
  nextPayment: string;
  onToggle: () => void;
}

const CompanyInfoWindow: React.FC<CompanyInfoWindowProps> = ({
  companyName,
  since,
  amount,
  inUsd,
  col1,
  isActive,
  beneficiary,
  interval,
  nextPayment,
  onToggle,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsDarkMode(document.body.classList.contains("dark"));
    }
  }, []);

  // since : 2025-01-01
  // nextPayment : 2025-02-01
  let totalSpent = 0;
  if (interval === "Monthly") {
    // const months = Math.floor((new Date().getTime() - new Date(since).getTime()) / (1000 * 60 * 60 * 24 * 30))+2;
    // totalSpent = months * amount;
    const sinceSplit = since.split('-');
    const nextPaymentSplit = nextPayment.split('-');
    const months = (parseInt(nextPaymentSplit[0]) - parseInt(sinceSplit[0])) * 12 + (parseInt(nextPaymentSplit[1]) - parseInt(sinceSplit[1]));
    totalSpent = months * amount;
  } else {
    // const years = Math.floor((new Date().getTime() - new Date(since).getTime()) / (1000 * 60 * 60 * 24 * 365))+2;
    // totalSpent = years * amount;
    const sinceSplit = since.split('-');
    const nextPaymentSplit = nextPayment.split('-');
    const years = (parseInt(nextPaymentSplit[0]) - parseInt(sinceSplit[0]));
    totalSpent = years * amount;
  }

  const domain = `${companyName.toLowerCase().replace(/\s+/g, "")}.com`;
  const logoUrl = `https://logo.clearbit.com/${domain}`;

  return (
    <div className="company-window">
      <div className="company-header"
        onClick={onToggle}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src={logoUrl} alt={`${companyName} logo`} width={50} height={50} />
          <h2 style={{ marginLeft: "10px" }}>{companyName}</h2>
        </div>
        <div>
          <h2>{amount} {inUsd ? "USD" : "Other Currency"}</h2>
        </div>
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
          <p>
            Since: {since} | Total Spent: {totalSpent} {inUsd ? "USD" : "Other Currency"}
          </p>
          <p>
            Interval: {interval} | Next Payment: {nextPayment}
          </p>
          <p style={{ fontSize: "12px", color: "gray" }}>Beneficiary: {beneficiary}</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoWindow;