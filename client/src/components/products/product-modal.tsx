import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/lib/utils";
import { FaMinus, FaPlus, FaTimes, FaStar, FaStarHalfAlt } from "react-icons/fa";

type ProductModalProps = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      product,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
    
    onClose();
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    const maxStock = product?.stock || 10;
    setQuantity((prev) => Math.min(maxStock, prev + 1));
  };

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  if (!product) return null;

  const productImages = product.images || [product.image];
  const stockCount = product.stock || 10;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" onClick={onClose}></div>
          
          <motion.div 
            className="relative bg-dark border border-muted/20 rounded-lg shadow-2xl w-full max-w-5xl mx-4 overflow-hidden"
            variants={contentVariants}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-dark/60 text-light hover:bg-primary hover:text-dark transition-colors"
            >
              <FaTimes />
            </Button>
            
            <div className="flex flex-col md:flex-row">
              {/* Product Images */}
              <div className="w-full md:w-1/2 h-80 md:h-auto flex">
                <div className="w-1/4 bg-dark/80 hidden md:block">
                  {productImages.map((image, index) => (
                    <div 
                      key={index}
                      className={`h-24 p-2 cursor-pointer ${activeImage === index ? 'border-l-4 border-primary' : ''}`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        className="h-full w-full object-cover" 
                        alt={`${product.title} view ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
                
                <div className="flex-1">
                  <img 
                    src={productImages[activeImage]} 
                    className="h-full w-full object-cover" 
                    alt={product.title}
                  />
                </div>
              </div>
              
              {/* Product Details */}
              <div className="w-full md:w-1/2 p-6 md:p-8">
                {product.isNew && (
                  <span className="inline-block bg-secondary/20 text-secondary text-xs font-semibold px-2 py-1 rounded">
                    NEW ARRIVAL
                  </span>
                )}
                <h2 className="font-heading text-2xl md:text-3xl mt-2">{product.title}</h2>
                <div className="flex items-center mt-2 mb-4">
                  <div className="flex text-primary">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStarHalfAlt />
                  </div>
                  <span className="text-light/60 text-sm ml-2">4.5 (128 reviews)</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-heading text-3xl font-semibold">{product.formattedPrice}</h3>
                  <p className="text-light/60 text-sm">Free shipping on orders over $100</p>
                </div>
                
                <p className="text-light/80 mb-6">
                  {product.description}
                </p>
                
                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-heading font-medium mb-2">Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <Button 
                          key={size}
                          variant="outline"
                          className={`w-12 h-10 border ${
                            selectedSize === size
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-muted text-light/80 hover:border-primary hover:text-primary'
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                
                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-heading font-medium mb-2">Color</h4>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <button 
                          key={color}
                          className={`w-8 h-8 rounded-full ${
                            selectedColor === color ? 'ring-2 ring-primary' : ''
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => setSelectedColor(color)}
                          aria-label={`Select color ${color}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center border border-muted rounded-md">
                    <Button 
                      variant="ghost"
                      className="px-3 py-2 text-light/80 hover:text-primary transition-colors"
                      onClick={decreaseQuantity}
                      disabled={quantity <= 1}
                    >
                      <FaMinus />
                    </Button>
                    <span className="quantity-display px-4 py-2 border-x border-muted">{quantity}</span>
                    <Button 
                      variant="ghost"
                      className="px-3 py-2 text-light/80 hover:text-primary transition-colors"
                      onClick={increaseQuantity}
                      disabled={quantity >= stockCount}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                  <span className="text-light/60 text-sm">{stockCount} items left</span>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    variant="outline"
                    className="flex-1 py-3 rounded-lg border border-primary text-primary font-medium hover:bg-primary/10 transition-all duration-300"
                  >
                    Add to Wishlist
                  </Button>
                  <Button 
                    onClick={handleAddToCart}
                    className="flex-1 py-3 rounded-lg bg-primary text-dark font-medium hover:bg-primary/90 transition-colors"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
