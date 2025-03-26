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
  { path: "/", name: "Home", icon: <FaHome className="w-6 h-6" /> },
  { path: "/new-arrivals", name: "New Arrivals", icon: <FaStar className="w-6 h-6" /> },
  { path: "/products", name: "Products", icon: <FaTshirt className="w-6 h-6" /> },
  { path: "/contact", name: "Contact", icon: <FaEnvelope className="w-6 h-6" /> },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle menu open/close
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Menu Toggle Button - For all screen sizes */}
      <Button 
        onClick={toggleMenu}
        variant="ghost" 
        className="fixed top-4 left-4 z-50 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground shadow-md hover:bg-primary/10 transition-all duration-200"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <FaTimes className="h-5 w-5" />
        ) : (
          <FaBars className="h-5 w-5" />
        )}
      </Button>
      
      {/* Full Screen Menu with Spiral Animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMenu}
            />
            
            {/* Menu Container with Spiral Animation */}
            <motion.div 
              className="fixed top-0 left-0 w-full h-full bg-background z-50 overflow-hidden"
              initial={{ 
                clipPath: "circle(0% at 2rem 2rem)",
                opacity: 0
              }}
              animate={{ 
                clipPath: "circle(150% at 2rem 2rem)",
                opacity: 1
              }}
              exit={{ 
                clipPath: "circle(0% at 2rem 2rem)",
                opacity: 0
              }}
              transition={{ 
                type: "spring", 
                damping: 20,
                stiffness: 150,
                duration: 0.5
              }}
            >
              <div className="flex flex-col h-full">
                {/* Menu Header */}
                <div className="flex justify-between items-center p-6">
                  <Link href="/" onClick={handleLinkClick} className="flex items-center space-x-3">
                    <FaCube className="text-green-500 text-3xl" />
                    <h1 className="text-2xl font-heading font-bold">Rhinestoner</h1>
                  </Link>
                  <Button 
                    onClick={toggleMenu}
                    variant="ghost" 
                    size="icon"
                    className="rounded-full hover:bg-accent/10"
                    aria-label="Close menu"
                  >
                    <FaTimes className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Navigation */}
                <nav className="flex-1 p-6">
                  <div className="space-y-4">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link 
                          href={item.path}
                          onClick={handleLinkClick}
                          className={cn(
                            "flex items-center space-x-4 p-4 rounded-lg text-lg transition-colors",
                            location === item.path 
                              ? "bg-green-500/20 text-green-500 font-medium" 
                              : "text-foreground hover:bg-green-500/10"
                          )}
                        >
                          <span className="text-2xl">{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Login Button */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: navItems.length * 0.05 }}
                      className="mt-8"
                    >
                      <Link 
                        href="#login" 
                        onClick={handleLinkClick}
                        className="flex items-center space-x-4 p-4 rounded-lg text-lg font-medium text-white bg-green-500 hover:bg-green-600 transition-colors"
                      >
                        <span className="text-2xl"><FaSignInAlt /></span>
                        <span>Login</span>
                      </Link>
                    </motion.div>
                  </div>
                </nav>
                
                {/* Footer */}
                <div className="p-6 border-t border-muted/10">
                  <p className="text-light/60 text-sm">
                    © {new Date().getFullYear()} Rhinestoner. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}