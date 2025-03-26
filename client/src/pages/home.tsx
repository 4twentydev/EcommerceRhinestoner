import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FaChevronDown, FaChevronRight, FaStar, FaTimes } from "react-icons/fa";
import Section from "@/components/layout/section";
import ProductCard from "@/components/products/product-card";
import ProductModal from "@/components/products/product-modal";
import { products, featuredProducts, Product } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

// Simplified Product Modal that doesn't depend on cart context
function SimpleProductModal({
  product,
  isOpen,
  onClose,
}: {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!product || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-dark border border-muted/20 rounded-lg shadow-2xl w-full max-w-5xl mx-4 overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-dark/60 text-light hover:bg-primary hover:text-dark transition-colors"
        >
          <FaTimes />
        </Button>

        <div className="flex flex-col md:flex-row">
          {/* Product Image */}
          <div className="w-full md:w-1/2 h-80 md:h-auto">
            <img
              src={product.image}
              className="h-full w-full object-cover"
              alt={product.title}
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 p-6 md:p-8">
            {product.isNew && (
              <span className="inline-block bg-secondary/20 text-secondary text-xs font-semibold px-2 py-1 rounded">
                NEW ARRIVAL
              </span>
            )}
            <h2 className="font-heading text-2xl md:text-3xl mt-2">
              {product.title}
            </h2>

            <div className="mb-6 mt-4">
              <h3 className="font-heading text-3xl font-semibold">
                {product.formattedPrice}
              </h3>
              <p className="text-light/60 text-sm">
                Free shipping on orders over $100
              </p>
            </div>

            <p className="text-light/80 mb-6">{product.description}</p>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-all duration-300"
              >
                View Details
              </Button>
              <Link href="/products">
                <Button className="flex-1 py-3 rounded-lg bg-primary text-dark font-medium hover:bg-primary/90 transition-colors">
                  See All Products
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  // Handle cart functionality safely
  let cartFunctions = { addToCart: (cartItem: any) => {} };
  try {
    cartFunctions = useCart();
  } catch (error) {
    console.warn("Cart context not available in Home:", error);
  }

  // Show only 4 products on home page
  const limitedProducts = products.slice(0, 4);
  // Show only 3 featured products
  const limitedFeaturedProducts = featuredProducts.slice(0, 3);

  const handleAddToCart = (
    product: Product,
    quantity: number,
    size?: string,
    color?: string,
  ) => {
    try {
      cartFunctions.addToCart({
        product,
        quantity,
        size,
        color,
      });

      toast({
        title: "Added to cart",
        description: `${product.title} has been added to your cart.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "There was a problem adding this item to your cart.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory max-w-full">
      <Section id="hero" className="relative overflow-hidden w-screen">
        {/* Video Background with Dark Overlay */}
        <div className="absolute inset-0 z-0 w-screen">
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <video
            className="absolute inset-0 min-w-full min-h-full w-auto h-auto object-fill max-w-none"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/BG.mp4" type="video/mp4" />
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
            Welcome to <span className="text-primary font-semibold">Rhinestoner</span>{" "}
          </motion.h1>
          <motion.h4
            className="font-sans text-lg md:text-xl text-light/80 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Designed for the contemporary lifestyle
          </motion.h4>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/new-arrivals">
              <Button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors">
                Explore New Arrivals
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                className="px-8 py-3 bg-transparent border border-light text-light font-medium rounded-full hover:bg-light/10 transition-colors"
              >
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
          <motion.a
            href="#new-arrivals"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <FaChevronDown className="text-light/70" />
          </motion.a>
        </motion.div>
      </Section>

      {/* New Arrivals Section */}
      <Section id="new-arrivals" className="bg-background">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-heading flex items-center">
                <FaStar className="text-primary mr-2" /> New Arrivals
              </h2>
              <Link href="/new-arrivals">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-primary hover:bg-primary/10"
                >
                  View All <FaChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {limitedFeaturedProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
                className="bg-primary/5 border border-border/40 rounded-lg overflow-hidden group"
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </div>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-xl">{product.title}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2 mt-1 mb-3">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-lg font-medium">
                      {product.formattedPrice}
                    </span>
                    <Button
                      onClick={() => {
                        setSelectedProduct(product);
                        setIsModalOpen(true);
                      }}
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-sm"
                      size="sm"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      {/* Featured Products Section */}
      <Section id="products" className="bg-muted/30">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-3xl md:text-4xl font-heading">
                Featured Products
              </h2>
              <Link href="/products">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-primary hover:bg-primary/10"
                >
                  View All <FaChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {limitedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() => {
                  setSelectedProduct(product);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </motion.div>
        </div>
      </Section>

      {/* About Section */}
      <Section id="about" className="bg-background">
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-heading mb-8">
              Our Story
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto mb-10">
              We curate timeless pieces that blend modern aesthetics with
              enduring quality. Each product is thoughtfully designed to elevate
              your everyday experience.
            </p>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Learn More About Us
            </Button>
          </motion.div>
        </div>
      </Section>

      {/* Get in Touch Section */}
      <Section id="contact" className="relative">
        {/* Background with SVG */}
        <div
          className="absolute inset-0 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: 'url("/BG.svg")' }}
        >
          {/* Add a slight overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 to-primary/20"></div>
        </div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-background/90 backdrop-blur-sm p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl md:text-4xl font-heading mb-6 text-center">
                Get in Touch
              </h2>
              <p className="text-foreground/80 text-center mb-8">
                Have questions about our products or need assistance with your
                order? We're here to help.
              </p>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <div className="text-center">
                  <Button className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-full hover:bg-primary/90 transition-colors">
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Product Detail Modal with cart functionality */}
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
