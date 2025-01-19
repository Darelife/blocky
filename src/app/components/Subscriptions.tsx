import React, { useState } from "react";
import CompanyInfoWindow from "./CompanyInfoWindow";

export default function Subscriptions() {
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const handleToggle = (companyName: string) => {
    setActiveCompany(activeCompany === companyName ? null : companyName);
  };

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', width: "25rem", margin: "0 auto", border: "1px solid #ccc", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      {["Netflix", "Amazon", "Google", "Mozilla"].map((company) => (
        <CompanyInfoWindow
          key={company}
          companyName={company}
          since="1997"
          totalSpent={1000000}
          inUsd={true}
          col1="#121212"
          isActive={activeCompany === company}
          onToggle={() => handleToggle(company)}
        />
      ))}
    </div>
  );
}