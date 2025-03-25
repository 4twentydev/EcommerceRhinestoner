import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaChevronDown } from "react-icons/fa";

export default function Home() {
  return (
    <section id="home" className="section relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark/70 z-10"></div>
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src="https://assets.mixkit.co/videos/preview/mixkit-fashion-model-with-a-yellow-background-34371-large.mp4" type="video/mp4" />
        </video>
      </div>
      
      {/* Hero Content */}
      <motion.div 
        className="relative z-20 text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="font-heading font-light text-4xl md:text-6xl lg:text-7xl mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover <span className="text-primary font-semibold">Modern</span> Essentials
        </motion.h1>
        <motion.h4 
          className="font-sans text-lg md:text-xl text-light/80 max-w-2xl mx-auto mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Curated collections designed for the contemporary lifestyle
        </motion.h4>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Link href="/new-arrivals">
            <Button className="px-8 py-3 bg-primary text-dark font-medium rounded-full hover:bg-primary/90 transition-colors">
              Explore New Arrivals
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="px-8 py-3 bg-transparent border border-light text-light font-medium rounded-full hover:bg-light/10 transition-colors">
              Browse All Products
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <FaChevronDown className="text-light/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
