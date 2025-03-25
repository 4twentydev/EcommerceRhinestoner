import React from "react";

interface SectionProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export default function Section({ id, className = "", children }: SectionProps) {
  return (
    <section 
      id={id}
      className={`section min-h-screen w-full flex flex-col items-center justify-center py-16 ${className}`}
    >
      {children}
    </section>
  );
}