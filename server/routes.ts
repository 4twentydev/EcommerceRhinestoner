import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import express from "express";
import path from "path";
import fs from "fs";
import { storage } from "./storage";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable. Using test mode with a dummy key.');
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-02-24.acacia",
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve static files from the public directory
  app.use(express.static(path.join(process.cwd(), 'public')));
  
  // API Routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Stripe payment route
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      
      // Validate the amount
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
      }
      
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "usd",
        // Additional options like receipt_email could be added here
      });
      
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Create order route
  app.post("/api/orders", async (req, res) => {
    try {
      const { userId, total, items, stripeSessionId } = req.body;
      
      // Create the order
      const order = await storage.createOrder({
        userId: userId || null,
        total,
        status: "pending",
        stripeSessionId: stripeSessionId || null,
        createdAt: new Date().toISOString(),
      });
      
      // Add order items
      const orderItems = [];
      for (const item of items) {
        const orderItem = await storage.addOrderItem({
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          size: item.size || null,
          color: item.color || null,
        });
        orderItems.push(orderItem);
      }
      
      res.status(201).json({ order, items: orderItems });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Dynamic Open Graph meta tags for social media sharing
  app.get("/social-preview/product/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(Number(req.params.id));
      
      if (!product) {
        return res.status(404).send("Product not found");
      }
      
      const productUrl = `${req.protocol}://${req.get('host')}/products/${product.id}`;
      
      // Read the index.html file to modify with our meta tags
      let htmlContent;
      const indexPath = path.resolve(process.cwd(), 'client', 'dist', 'index.html');
      
      try {
        htmlContent = fs.readFileSync(indexPath, 'utf8');
      } catch (error) {
        // If the file doesn't exist (during development), create a basic HTML template
        htmlContent = `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${product.title} - Preview</title>
          </head>
          <body>
            <div style="display: flex; max-width: 600px; margin: 0 auto; padding: 20px; font-family: system-ui, -apple-system, sans-serif;">
              <div style="margin-right: 20px;">
                <img src="${product.image}" alt="${product.title}" style="max-width: 200px; border-radius: 8px;">
              </div>
              <div>
                <h1 style="margin-top: 0; color: #333;">${product.title}</h1>
                <p style="color: #666;">${product.description}</p>
                <p style="font-weight: bold; color: #0891B2;">$${product.price.toFixed(2)}</p>
                <a href="${productUrl}" style="display: inline-block; background-color: #0891B2; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px;">View Product</a>
              </div>
            </div>
          </body>
          </html>
        `;
      }
      
      // Generate meta tags for this product
      const metaTags = `
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="product" />
        <meta property="og:url" content="${req.protocol}://${req.get('host')}/products/${product.id}" />
        <meta property="og:title" content="${product.title}" />
        <meta property="og:description" content="${product.description}" />
        <meta property="og:image" content="${product.image}" />
        <meta property="product:price:amount" content="${product.price}" />
        <meta property="product:price:currency" content="USD" />
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="${req.protocol}://${req.get('host')}/products/${product.id}" />
        <meta property="twitter:title" content="${product.title}" />
        <meta property="twitter:description" content="${product.description}" />
        <meta property="twitter:image" content="${product.image}" />
      `;
      
      // Insert meta tags before the closing </head> tag
      htmlContent = htmlContent.replace('</head>', `${metaTags}\n</head>`);
      
      // Send the modified HTML content
      res.set('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error: any) {
      console.error("Error generating social preview:", error);
      res.status(500).send("Error generating preview");
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
