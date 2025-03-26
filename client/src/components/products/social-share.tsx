import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Share, X, Copy, Check } from "lucide-react";
import { FaFacebook, FaTwitter, FaPinterest, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { Product } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type SocialShareProps = {
  product: Product;
};

export default function SocialShare({ product }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Use the product URL or the social preview URL for better sharing experience
  const previewUrl = `${window.location.origin}/social-preview/product/${product.id}`;
  const productUrl = `${window.location.origin}/products/${product.id}`;
  const shareMessage = `Check out ${product.title} - ${product.formattedPrice}`;
  
  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebook className="h-5 w-5" />,
      color: "#1877F2",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(previewUrl)}&quote=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="h-5 w-5" />,
      color: "#1DA1F2",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(previewUrl)}`,
    },
    {
      name: "Pinterest",
      icon: <FaPinterest className="h-5 w-5" />,
      color: "#E60023",
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(previewUrl)}&media=${encodeURIComponent(product.image)}&description=${encodeURIComponent(shareMessage)}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="h-5 w-5" />,
      color: "#25D366",
      url: `https://wa.me/?text=${encodeURIComponent(shareMessage + ' ' + previewUrl)}`,
    },
    {
      name: "Email",
      icon: <FaEnvelope className="h-5 w-5" />,
      color: "#D44638",
      url: `mailto:?subject=${encodeURIComponent('Check out this product')}&body=${encodeURIComponent(shareMessage + '\n\n' + productUrl)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      // Use the preview URL for better social media sharing
      await navigator.clipboard.writeText(previewUrl);
      setCopied(true);
      toast({
        title: "Link copied",
        description: "Product link copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 border-brand-lt-cyan text-brand-lt-cyan hover:bg-brand-lt-cyan/10"
      >
        <Share className="h-4 w-4" />
        <span>Share</span>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 bottom-12 z-50 bg-background rounded-lg shadow-lg border border-border p-4 w-72"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-heading text-sm">Share this product</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col space-y-2">
              {/* Preview */}
              <div className="bg-muted/30 rounded-lg p-3 mb-2">
                <div className="flex items-start space-x-3">
                  <div className="h-14 w-14 rounded overflow-hidden flex-shrink-0">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{product.title}</h4>
                    <p className="text-xs text-foreground/70 line-clamp-2 mt-1">{product.description.substring(0, 50)}...</p>
                    <p className="text-sm font-medium mt-1">{product.formattedPrice}</p>
                  </div>
                </div>
              </div>

              {/* Social platforms */}
              <div className="grid grid-cols-5 gap-2">
                {socialPlatforms.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors"
                    style={{ color: platform.color }}
                    onClick={(e) => {
                      if (platform.name === "Email") return; // Don't prevent default for email
                      e.preventDefault();
                      window.open(platform.url, '_blank', 'width=600,height=400');
                    }}
                  >
                    {platform.icon}
                    <span className="text-xs mt-1 text-foreground/70">{platform.name}</span>
                  </a>
                ))}
              </div>

              {/* Copy link */}
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full flex items-center justify-center gap-2"
                onClick={copyToClipboard}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Link</span>
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}