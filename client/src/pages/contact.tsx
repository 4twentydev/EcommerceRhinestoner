import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }).optional(),
  phone: z.string().min(7, {
    message: "Please enter a valid phone number.",
  }).optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email"],
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(data);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  }

  return (
    <section id="contact" className="section min-h-screen w-full bg-dark flex flex-col md:flex-row">
      {/* Map/Image Side */}
      <div className="w-full md:w-1/2 h-72 md:h-screen relative">
        <div className="absolute inset-0 bg-dark/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1551739440-5dd934d3a94a?auto=format&fit=crop&q=80&w=1200" 
          alt="Contact us" 
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 flex items-center justify-center z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center max-w-md px-6 bg-dark/50 backdrop-blur-md py-10 rounded-lg">
            <h2 className="font-heading text-3xl mb-4">Get in <span className="text-primary">Touch</span></h2>
            <p className="text-light/80 mb-6">We're here to help with any questions about our products or services.</p>
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>123 Design Street, Creative City</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span>hello@shadowvault.com</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Contact Form Side */}
      <motion.div 
        className="w-full md:w-1/2 px-6 py-16 md:py-0 flex items-center justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light/80">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        className="bg-dark/60 backdrop-blur-sm border border-muted rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary transition-colors" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light/80">
                      Email <span className="text-primary">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your email" 
                        className="bg-dark/60 backdrop-blur-sm border border-muted rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary transition-colors" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light/80">Phone</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your phone number" 
                        className="bg-dark/60 backdrop-blur-sm border border-muted rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary transition-colors" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-light/80">Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message..." 
                        className="bg-dark/60 backdrop-blur-sm border border-muted rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary transition-colors resize-none" 
                        rows={4}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-primary text-dark font-medium py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-light/60 text-xs mt-2">
                  <span className="text-primary">*</span> Either email or phone is required
                </p>
              </div>
            </form>
          </Form>
        </div>
      </motion.div>
    </section>
  );
}
