import { Link } from "wouter";
import { FaCube, FaInstagram, FaTwitter, FaFacebook, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-muted/20 py-8 pb-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <FaCube className="text-brand-lt-cyan text-xl" />
              <span className="font-heading font-semibold text-xl">Rhinestoner</span>
            </Link>
            <p className="text-light/60 text-sm mt-2">Don't get caught with a boring lighter...</p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <div>
              <h4 className="font-heading font-medium mb-2">Shop</h4>
              <ul className="space-y-1 text-light/70">
                <li><Link href="/products" className="hover:text-brand-lt-cyan transition-colors">All Products</Link></li>
                <li><Link href="/new-arrivals" className="hover:text-brand-lt-green transition-colors">New Arrivals</Link></li>
                <li><Link href="#" className="hover:text-brand-lt-yellow transition-colors">Featured</Link></li>
                <li><Link href="#" className="hover:text-brand-lt-pink transition-colors">Sale</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-medium mb-2">Company</h4>
              <ul className="space-y-1 text-light/70">
                <li><Link href="#" className="hover:text-brand-lt-cyan transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-brand-lt-green transition-colors">Contact</Link></li>
                <li><Link href="#" className="hover:text-brand-lt-yellow transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-brand-lt-pink transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="relative border-t border-muted/20 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-light/60 text-sm">© {new Date().getFullYear()} Designed by 4twenty.dev | All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <a href="#" className="text-light/60 hover:text-brand-lt-cyan transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-light/60 hover:text-brand-lt-green transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-light/60 hover:text-brand-lt-yellow transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-light/60 hover:text-brand-lt-pink transition-colors">
                <FaPinterest />
              </a>
            </div>
          </div>
          
          {/* SVG Jewels decoration at the center */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 w-32 flex items-center justify-center">
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
