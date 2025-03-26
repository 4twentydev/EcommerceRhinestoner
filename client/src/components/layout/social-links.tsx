import { motion } from "framer-motion";
import {
  FaInstagram,
  FaTwitter,
  FaPinterest,
  FaGithub,
  FaFacebook,
} from "react-icons/fa";

export default function SocialLinks() {
  const socialLinks = [
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaPinterest />, href: "#" },
    { icon: <FaGithub />, href: "#" },
    { icon: <FaFacebook />, href: "#" },
  ];

  return (
    <div className="fixed bottom-12 right-4 z-40 flex flex-col space-y-3">
      {socialLinks.map((link, index) => (
        <motion.a
          key={index}
          href={link.href}
          className="w-10 h-10 rounded-full bg-dark/40 backdrop-blur-sm hover:bg-primary text-light hover:text-dark flex items-center justify-center bottom-12 transition-colors duration-200"
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          {link.icon}
        </motion.a>
      ))}
    </div>
  );
}
