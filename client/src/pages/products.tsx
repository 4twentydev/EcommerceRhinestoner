import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/header";
import ProductCard from "@/components/products/product-card";
import ProductModal from "@/components/products/product-modal";
import { products, Product } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const handleOpenProductModal = (e: Event) => {
      const productId = (e as CustomEvent).detail;
      const product = products.find((p) => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
      }
    };

    document.addEventListener('open-product-modal', handleOpenProductModal);

    return () => {
      document.removeEventListener('open-product-modal', handleOpenProductModal);
    };
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }

    // Filter by price range
    if (priceRange !== "all") {
      switch (priceRange) {
        case "under-50":
          result = result.filter((product) => product.price < 50);
          break;
        case "50-100":
          result = result.filter((product) => product.price >= 50 && product.price <= 100);
          break;
        case "100-200":
          result = result.filter((product) => product.price > 100 && product.price <= 200);
          break;
        case "over-200":
          result = result.filter((product) => product.price > 200);
          break;
      }
    }

    // Sort products
    switch (sortBy) {
      case "newest":
        // In a real app, would sort by date - here we keep the default order
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        // In a real app, would sort by popularity - here we sort by ID as a placeholder
        result.sort((a, b) => a.id - b.id);
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, priceRange, sortBy]);

  const categories = ["all", ...Array.from(new Set(products.map((product) => product.category)))];

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleAddToCart = (product: Product, quantity: number, size?: string, color?: string) => {
    try {
      addToCart({
        product,
        quantity,
        size,
        color
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
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <section id="products" className="section min-h-screen w-full bg-dark py-20 px-4 md:px-8 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* Header and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <Header title="Our Products" highlight="Products" className="relative static md:absolute" />

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 mt-16 md:mt-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px] bg-dark/80 text-light border border-muted rounded-lg">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.filter(c => c !== "all").map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Price Filter */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-[180px] bg-dark/80 text-light border border-muted rounded-lg">
                  <SelectValue placeholder="Price: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Price: All</SelectItem>
                  <SelectItem value="under-50">Under $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="over-200">$200+</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort Filter */}
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger className="w-[180px] bg-dark/80 text-light border border-muted rounded-lg">
                  <SelectValue placeholder="Newest First" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>
          </div>

          {/* Products Grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <AnimatePresence>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onQuickView={() => {
                      setSelectedProduct(product);
                      setIsModalOpen(true);
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full py-10 text-center">
                  <p className="text-light/70">No products match your filters. Try adjusting your criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Pagination */}
          {filteredProducts.length > productsPerPage && (
            <motion.div 
              className="mt-12 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex space-x-2">
                <Button 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  variant="outline"
                  className="w-10 h-10 p-0 flex items-center justify-center rounded-full border border-muted text-light hover:bg-primary hover:text-dark hover:border-primary transition-colors"
                >
                  <FaChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }).map((_, index) => (
                  <Button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    className={`w-10 h-10 p-0 rounded-full ${
                      currentPage === index + 1 
                        ? "bg-primary text-dark" 
                        : "bg-dark/60 backdrop-blur-sm border border-muted text-light hover:bg-primary hover:text-dark hover:border-primary"
                    }`}
                  >
                    {index + 1}
                  </Button>
                ))}

                <Button 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  variant="outline"
                  className="w-10 h-10 p-0 flex items-center justify-center rounded-full border border-muted text-light hover:bg-primary hover:text-dark hover:border-primary transition-colors"
                >
                  <FaChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      <ProductModal 
        product={selectedProduct} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}