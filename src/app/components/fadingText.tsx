import React, { useEffect, useRef, useState } from 'react';

interface FadingTextProps {
  text: string;
}

const FadingText: React.FC<FadingTextProps> = ({ text }) => {
  const textRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Define styles as objects
  const baseStyle = {
    opacity: 0,
    transform: 'translateY(20px)',
    transition: 'opacity 3s ease, transform 3s ease',
  };

  const visibleStyle = {
    opacity: 1,
    transform: 'translateY(0)',
  };

  const hiddenStyle = {
    opacity: 0,
    transform: 'translateY(-20px)',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: [0, 0.5, 1] } // Triggers at different visibility percentages
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={textRef}
      style={{
        ...baseStyle,
        ...(visible ? visibleStyle : hiddenStyle),
      }}
    >
      {text}
    </div>
  );
};

export default FadingText;
