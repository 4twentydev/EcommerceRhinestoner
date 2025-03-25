import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FaHome,
  FaStar,
  FaTshirt,
  FaEnvelope,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaCube
} from "react-icons/fa";

const navItems = [
  { path: "/", name: "Home", icon: <FaHome className="w-6 text-center" /> },
  { path: "/new-arrivals", name: "New Arrivals", icon: <FaStar className="w-6 text-center" /> },
  { path: "/products", name: "Products", icon: <FaTshirt className="w-6 text-center" /> },
  { path: "/contact", name: "Contact", icon: <FaEnvelope className="w-6 text-center" /> },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed top-0 left-0 h-full z-40 flex">
      {/* Toggle Button for Mobile */}
      <Button 
        onClick={toggleSidebar}
        variant="ghost" 
        className="absolute top-4 right-4 z-50 p-2 text-light bg-dark/30 backdrop-blur-sm rounded-full hover:bg-dark/50 transition-colors duration-200 lg:hidden"
      >
        {isExpanded ? <FaTimes /> : <FaBars />}
      </Button>
      
      {/* Toggle Button for Desktop */}
      <Button 
        onClick={toggleSidebar}
        variant="ghost" 
        className="fixed top-4 left-4 ml-12 z-50 p-2 text-foreground bg-background/80 backdrop-blur-sm rounded-full hover:bg-accent/10 transition-colors duration-200 hidden lg:flex"
      >
        {isExpanded ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <motion.div 
        className={cn(
          "h-full bg-primary/10 dark:bg-primary/5 backdrop-blur-md shadow-xl transition-all duration-300 ease-in-out overflow-hidden border-r border-border/50",
          isExpanded ? "w-64" : "w-16"
        )}
        initial={{ width: "4rem" }}
        animate={{ width: isExpanded ? "16rem" : "4rem" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="p-5">
          <Link href="/" className="flex items-center space-x-4">
            <div className="flex-shrink-0 text-primary text-2xl">
              <FaCube />
            </div>
            <AnimatePresence>
              {isExpanded && (
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-xl font-heading font-bold whitespace-nowrap"
                >
                  ShadowVault
                </motion.h1>
              )}
            </AnimatePresence>
          </Link>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                href={item.path}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg transition-colors",
                  location === item.path 
                    ? "bg-primary/20 text-primary" 
                    : "text-foreground hover:bg-primary/10"
                )}
              >
                {item.icon}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
            
            <Link 
              href="#login" 
              className="flex items-center space-x-3 p-3 rounded-lg text-primary-foreground bg-primary hover:bg-primary/80 transition-colors mt-8"
            >
              <FaSignInAlt className="w-6 text-center" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="whitespace-nowrap"
                  >
                    Login
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </nav>
      </motion.div>
    </div>
  );
}
