import { useState, useEffect } from "react";
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
  FaCube,
  FaShoppingCart
} from "react-icons/fa";

const navItems = [
  { path: "/", name: "Home", icon: <FaHome className="w-6 h-6" /> },
  { path: "/new-arrivals", name: "New Arrivals", icon: <FaStar className="w-6 h-6" /> },
  { path: "/products", name: "Products", icon: <FaTshirt className="w-6 h-6" /> },
  { path: "/contact", name: "Contact", icon: <FaEnvelope className="w-6 h-6" /> },
];

export default function Sidebar() {
  const [location] = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Initial check
    checkIsMobile();
    
    // Listen for window resize events
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // Toggle desktop sidebar
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'auto';
  };

  // Close mobile menu when a link is clicked
  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <Button 
        onClick={toggleMobileMenu}
        variant="ghost" 
        className="fixed top-4 left-4 z-50 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground shadow-md hover:bg-primary/10 transition-all duration-200 lg:hidden"
        aria-label="Toggle mobile menu"
      >
        <FaBars className="h-5 w-5" />
      </Button>
      
      {/* Mobile Full Screen Menu with Spiral Animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Background Overlay */}
            <motion.div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={toggleMobileMenu}
            />
            
            {/* Menu Container with Spiral Animation */}
            <motion.div 
              className="fixed top-0 left-0 w-full h-full bg-background z-50 lg:hidden overflow-hidden"
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
                {/* Simplified Mobile Menu Header */}
                <div className="flex justify-between items-center p-4">
                  <h1 className="text-xl font-heading font-bold">Menu</h1>
                  <Button 
                    onClick={toggleMobileMenu}
                    variant="ghost" 
                    size="icon"
                    className="rounded-full hover:bg-accent/10"
                    aria-label="Close menu"
                  >
                    <FaTimes className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Simplified Navigation */}
                <nav className="flex-1 p-4">
                  <div className="space-y-2">
                    {navItems.map((item, index) => (
                      <motion.div
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link 
                          href={item.path}
                          onClick={handleMobileLinkClick}
                          className={cn(
                            "flex items-center space-x-3 p-3 rounded-lg",
                            location === item.path 
                              ? "text-primary font-medium" 
                              : "text-foreground"
                          )}
                        >
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar - Only visible on large screens */}
      {!isMobile && (
        <div className="fixed top-0 left-0 h-full z-40 hidden lg:flex">
          {/* Desktop Sidebar Toggle Button */}
          <Button 
            onClick={toggleSidebar}
            variant="ghost" 
            className="fixed top-4 left-4 ml-12 z-50 p-2 text-foreground bg-background/80 backdrop-blur-sm rounded-full hover:bg-accent/10 transition-colors duration-200"
          >
            {isExpanded ? <FaTimes className="h-4 w-4" /> : <FaBars className="h-4 w-4" />}
          </Button>

          {/* Desktop Sidebar Content */}
          <motion.div 
            className={cn(
              "h-full bg-primary/5 backdrop-blur-md shadow-xl transition-all overflow-hidden border-r border-border/50",
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
                <AnimatePresence mode="wait">
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
                    <AnimatePresence mode="wait">
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
                  <AnimatePresence mode="wait">
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
      )}
    </>
  );
}
