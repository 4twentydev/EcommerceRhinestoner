import { motion } from "framer-motion";

type HeaderProps = {
  title: string;
  highlight?: string;
  className?: string;
};

export default function Header({ title, highlight, className }: HeaderProps) {
  // Split title to apply highlight to specific word
  let titleParts: React.ReactNode[] = [title];
  
  if (highlight && title.includes(highlight)) {
    const parts = title.split(highlight);
    titleParts = [
      parts[0],
      <span key="highlight" className="text-primary">{highlight}</span>,
      parts[1]
    ];
  }

  return (
    <motion.h2 
      className={`absolute top-8 left-8 z-30 font-heading text-3xl md:text-4xl ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {titleParts}
    </motion.h2>
  );
}
