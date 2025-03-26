import { Link } from "wouter";
import { FaCube, FaInstagram, FaTwitter, FaFacebook, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-dark border-t border-muted/20 py-8 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <FaCube className="text-primary text-xl" />
              <span className="font-heading font-semibold text-xl">ShadowVault</span>
            </Link>
            <p className="text-light/60 text-sm mt-2">Premium lifestyle products for the modern consumer</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <div>
              <h4 className="font-heading font-medium mb-2">Shop</h4>
              <ul className="space-y-1 text-light/70">
                <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
                <li><Link href="/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Featured</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Sale</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-medium mb-2">Company</h4>
              <ul className="space-y-1 text-light/70">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="relative border-t border-muted/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-light/60 text-sm">© {new Date().getFullYear()} ShadowVault. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-light/60 hover:text-primary transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-light/60 hover:text-primary transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-light/60 hover:text-primary transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-light/60 hover:text-primary transition-colors">
                <FaPinterest />
              </a>
            </div>
          </div>
          
          {/* SVG Jewels decoration at the bottom center */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-48 flex items-center justify-center">
            <img 
              src="/images/footer-jewels.svg" 
              alt="Crystal jewels" 
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
