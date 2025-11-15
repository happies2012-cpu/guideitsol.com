import React from "react";

interface BackgroundPatternProps {
  className?: string;
}

const BackgroundPattern: React.FC<BackgroundPatternProps> = ({ className = "" }) => {
  return (
    <div 
      className={`fixed inset-0 ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M36 18c3.314 0 6 2.686 6 6s-2.686 6-6 6-6-2.686-6-6 2.686-6 6-6z' stroke='hsl(var(--gradient-primary-start)/0.1)' stroke-width='1'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px'
      }}
    />
  );
};

export default BackgroundPattern;