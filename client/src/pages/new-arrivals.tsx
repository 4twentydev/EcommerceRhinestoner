import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import { featuredProducts } from "@/lib/utils";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function NewArrivals() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="new-arrivals" className="section relative h-screen w-full overflow-hidden">
      <Header title="New Arrivals" highlight="New" />
      
      {/* Carousel */}
      <div className="h-full w-full relative">
        <AnimatePresence mode="wait">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ zIndex: currentSlide === index ? 10 : 0 }}
            >
              <div className="absolute inset-0 bg-dark/50 z-10"></div>
              <img 
                src={product.images?.[0] || product.image} 
                alt={product.title} 
                className="h-full w-full object-cover"
              />
              <motion.div 
                className="absolute bottom-16 left-16 z-20 max-w-md"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="font-heading text-3xl mb-2">{product.title}</h3>
                <p className="text-light/80 mb-6">{product.description.slice(0, 80)}...</p>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => document.dispatchEvent(new CustomEvent('open-product-modal', { detail: product.id }))}
                    className="px-6 py-2 bg-primary text-dark rounded-full hover:bg-primary/90 transition-colors"
                  >
                    View Product
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" className="px-6 py-2 border border-light text-light rounded-full hover:bg-light/10 transition-colors">
                      See All Products
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Carousel controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-dark/40 backdrop-blur-sm text-light hover:bg-primary hover:text-dark transition-colors flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-dark/40 backdrop-blur-sm text-light hover:bg-primary hover:text-dark transition-colors flex items-center justify-center"
        >
          <FaChevronRight />
        </button>
        
        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {featuredProducts.map((_, index) => (
            <button 
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? "bg-primary" : "bg-light/40 hover:bg-primary"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
