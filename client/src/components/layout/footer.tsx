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
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-48 flex items-center justify-center">
            <svg width="100%" height="100%" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
              {/* Background shimmer effect */}
              <ellipse cx="100" cy="50" rx="95" ry="40" fill="url(#shimmerGradient)" opacity="0.3" />
              
              {/* Scattered tiny gems */}
              <g>
                <circle cx="40" cy="35" r="2" fill="#a78bfa" className="animate-pulse" style={{ animationDuration: '3.5s' }} />
                <circle cx="35" cy="50" r="1.5" fill="#93c5fd" className="animate-pulse" style={{ animationDuration: '2.7s' }} />
                <circle cx="50" cy="60" r="2" fill="#f9a8d4" className="animate-pulse" style={{ animationDuration: '4.2s' }} />
                <circle cx="155" cy="45" r="2" fill="#a78bfa" className="animate-pulse" style={{ animationDuration: '3.1s' }} />
                <circle cx="165" cy="55" r="1.5" fill="#93c5fd" className="animate-pulse" style={{ animationDuration: '2.9s' }} />
                <circle cx="145" cy="65" r="2" fill="#f9a8d4" className="animate-pulse" style={{ animationDuration: '3.8s' }} />
              </g>
              
              {/* Main diamond jewel group */}
              <g>
                {/* Large center diamond */}
                <polygon 
                  points="100,10 120,50 100,90 80,50" 
                  fill="url(#diamondGradient)" 
                  className="drop-shadow-lg"
                  style={{ filter: 'url(#glow)' }}
                />
                
                {/* Smaller diamonds */}
                <polygon 
                  points="65,30 75,50 65,70 55,50" 
                  fill="url(#purpleGradient)" 
                  className="drop-shadow-md opacity-90"
                />
                <polygon 
                  points="135,30 145,50 135,70 125,50" 
                  fill="url(#blueGradient)" 
                  className="drop-shadow-md opacity-90"
                />
                <polygon 
                  points="40,40 45,50 40,60 35,50" 
                  fill="url(#pinkGradient)" 
                  className="drop-shadow-sm opacity-80"
                />
                <polygon 
                  points="160,40 165,50 160,60 155,50" 
                  fill="url(#greenGradient)" 
                  className="drop-shadow-sm opacity-80"
                />
                
                {/* Inner gem facets for depth */}
                <line x1="100" y1="10" x2="100" y2="90" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
                <line x1="80" y1="50" x2="120" y2="50" stroke="#fff" strokeWidth="0.5" opacity="0.5" />
                
                {/* Tiny sparkles */}
                <circle cx="50" cy="40" r="1.5" fill="white" className="animate-ping" style={{ animationDuration: '2s' }} />
                <circle cx="150" cy="40" r="1.5" fill="white" className="animate-ping" style={{ animationDuration: '3s' }} />
                <circle cx="85" cy="70" r="1" fill="white" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                <circle cx="115" cy="70" r="1" fill="white" className="animate-ping" style={{ animationDuration: '1.8s' }} />
                <circle cx="75" cy="30" r="1" fill="white" className="animate-ping" style={{ animationDuration: '2.2s' }} />
                <circle cx="125" cy="30" r="1" fill="white" className="animate-ping" style={{ animationDuration: '3.2s' }} />
                <circle cx="100" cy="20" r="1.2" fill="white" className="animate-ping" style={{ animationDuration: '1.5s' }} />
                <circle cx="100" cy="80" r="1.2" fill="white" className="animate-ping" style={{ animationDuration: '1.7s' }} />
              
                {/* Starburst highlights */}
                <path d="M100,25 L102,22 L98,22 Z" fill="white" opacity="0.7" />
                <path d="M100,75 L102,78 L98,78 Z" fill="white" opacity="0.7" />
                <path d="M85,50 L82,52 L82,48 Z" fill="white" opacity="0.7" />
                <path d="M115,50 L118,52 L118,48 Z" fill="white" opacity="0.7" />
              </g>
              
              {/* Gradients */}
              <defs>
                <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0f9ff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#e0f2fe" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#bae6fd" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f0f9ff" />
                  <stop offset="25%" stopColor="#e0f2fe" />
                  <stop offset="50%" stopColor="#a5f3fc" />
                  <stop offset="75%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#faf5ff" />
                  <stop offset="50%" stopColor="#e9d5ff" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eff6ff" />
                  <stop offset="50%" stopColor="#bfdbfe" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
                <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fdf2f8" />
                  <stop offset="50%" stopColor="#fbcfe8" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
                <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ecfdf5" />
                  <stop offset="50%" stopColor="#a7f3d0" />
                  <stop offset="100%" stopColor="#34d399" />
                </linearGradient>
                
                {/* Glow filter */}
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
