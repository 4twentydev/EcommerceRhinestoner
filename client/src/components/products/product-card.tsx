import { Product } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

type ProductCardProps = {
  product: Product;
  onQuickView: () => void;
};

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  return (
    <motion.div 
      className="product-card bg-dark/60 backdrop-blur-sm rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -8 }}
    >
      <div className="relative h-60 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
        {product.isNew && (
          <div className="absolute top-2 right-2 bg-secondary text-dark text-xs font-bold px-2 py-1 rounded">
            NEW
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-heading font-medium text-lg mb-1">{product.title}</h3>
        <p className="text-light/70 text-sm mb-2">
          {product.description.substring(0, 30)}...
        </p>
        <div className="flex justify-between items-center">
          <span className="font-heading font-semibold">{product.formattedPrice}</span>
          <Button 
            variant="ghost" 
            onClick={onQuickView}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            <FaEye className="mr-1 h-4 w-4" /> Quick View
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
