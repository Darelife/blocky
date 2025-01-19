import React, { useState } from "react";
import CompanyInfoWindow from "./CompanyInfoWindow";
import database from "../../app/database.json";

export default function Subscriptions() {
  const [activeCompany, setActiveCompany] = useState<string | null>(null);

  const handleToggle = (companyName: string) => {
    setActiveCompany(activeCompany === companyName ? null : companyName);
  };

  return (
    <div style={{ borderRadius: '10px', overflow: 'hidden', width: "25rem", margin: "0 auto", border: "1px solid #ccc", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
      {database.map((subscription) => (
        <CompanyInfoWindow
          key={subscription.id}
          companyName={subscription.companyName}
          since={subscription.dateSince}
          totalSpent={subscription.Amount}
          subscriber={subscription.subscriber}
          beneficiary={subscription.beneficiary}
          interval={subscription.Interval}
          inUsd={true}
          col1="#121212"
          isActive={activeCompany === subscription.companyName}
          onToggle={() => handleToggle(subscription.companyName)}
        />
      ))}
    </div>
  );
}