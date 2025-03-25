import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('Missing STRIPE_SECRET_KEY environment variable. Using test mode with a dummy key.');
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key';
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

export async function registerRoutes(app: Express): Promise<Server> {
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

  const httpServer = createServer(app);

  return httpServer;
}
