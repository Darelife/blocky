import React from "react";

interface PlusButtonProps {
  onClick: () => void;
}

const PlusButton: React.FC<PlusButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        fontSize: "20px",
        backgroundColor: "#007BFF",
        color: "white",
        cursor: "pointer",
      }}
    >
      +
    </button>
  );
};

export default PlusButton;
