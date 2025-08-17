import type { Express } from "express";
import { createServer, type Server } from "http";
import Stripe from "stripe";
import { storage } from "./storage";
import { createOrderSchema } from "@shared/schema";
import { z } from "zod";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY. Please add your Stripe secret key to environment variables.');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-07-30.basil",
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all active stories
  app.get("/api/stories", async (req, res) => {
    try {
      const stories = await storage.getActiveStories();
      res.json(stories);
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao carregar histórias: " + error.message });
    }
  });

  // Get story by ID
  app.get("/api/stories/:id", async (req, res) => {
    try {
      const story = await storage.getStoryById(req.params.id);
      if (!story) {
        return res.status(404).json({ message: "História não encontrada" });
      }
      res.json(story);
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao carregar história: " + error.message });
    }
  });

  // Generate personalized story preview
  app.post("/api/stories/:id/personalize", async (req, res) => {
    try {
      const storyId = req.params.id;
      const { childName, childAge } = req.body;

      if (!childName || !childAge) {
        return res.status(400).json({ message: "Nome e idade da criança são obrigatórios" });
      }

      const story = await storage.getStoryById(storyId);
      if (!story) {
        return res.status(404).json({ message: "História não encontrada" });
      }

      // Personalize the story content
      const personalizedContent = (story.content as any[]).map((page: any) => ({
        ...page,
        text: page.text
          .replace(/\[CHILD_NAME\]/g, childName)
          .replace(/\[CHILD_AGE\]/g, childAge.toString())
      }));

      res.json({
        storyId,
        title: story.title.replace(/\[CHILD_NAME\]/g, childName),
        description: story.description.replace(/\[CHILD_NAME\]/g, childName),
        content: personalizedContent,
        childName,
        childAge
      });
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao personalizar história: " + error.message });
    }
  });

  // Create order and payment intent
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = createOrderSchema.parse(req.body);
      
      const story = await storage.getStoryById(orderData.storyId);
      if (!story) {
        return res.status(404).json({ message: "História não encontrada" });
      }

      // Personalize story content
      const personalizedContent = (story.content as any[]).map((page: any) => ({
        ...page,
        text: page.text
          .replace(/\[CHILD_NAME\]/g, orderData.childName)
          .replace(/\[CHILD_AGE\]/g, orderData.childAge.toString())
      }));

      // Calculate price based on format
      const digitalPrice = 3900; // R$ 39.00 in cents
      const printPrice = 8900; // R$ 89.00 in cents
      const price = orderData.format === 'digital' ? digitalPrice : printPrice;

      // Create order
      const order = await storage.createOrder({
        childName: orderData.childName,
        childAge: orderData.childAge,
        childPhotoUrl: orderData.childPhotoUrl,
        storyId: orderData.storyId,
        personalizedContent,
        format: orderData.format,
        price,
        customerEmail: orderData.customerInfo.email,
        customerName: orderData.customerInfo.name,
        shippingAddress: orderData.format === 'print' ? orderData.shippingInfo : null,
        status: "pending"
      });

      // Create Stripe payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: price,
        currency: "brl",
        metadata: {
          orderId: order.id,
          childName: orderData.childName,
          format: orderData.format
        }
      });

      // Update order with payment intent ID
      await storage.updateOrderPaymentIntent(order.id, paymentIntent.id);

      res.json({
        orderId: order.id,
        clientSecret: paymentIntent.client_secret,
        amount: price
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Dados inválidos", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Erro ao criar pedido: " + error.message });
    }
  });

  // Get order by ID
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrderById(req.params.id);
      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }
      res.json(order);
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao carregar pedido: " + error.message });
    }
  });

  // Stripe webhook to handle payment completion
  app.post("/api/webhooks/stripe", async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'];
      // In a real app, you'd verify the webhook signature
      // const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      
      const event = req.body;
      
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata.orderId;
        
        if (orderId) {
          await storage.updateOrderStatus(orderId, 'completed');
        }
      }
      
      res.json({ received: true });
    } catch (error: any) {
      res.status(400).json({ message: "Webhook error: " + error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
