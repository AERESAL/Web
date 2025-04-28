import type { Express } from "express";
import { createServer, type Server } from "http";
import Parser from 'rss-parser';
import { storage } from "./storage";

// RSS parser instance
const parser = new Parser();

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Events API using Google Apps Script
  app.get('/api/events', async (req, res) => {
    try {
      // Fetch events from Google Apps Script
      const response = await fetch('https://script.googleapis.com/macros/s/AehSKLhyjzIJtXXqiX9kyT4hWZrdmvO6e-AqPsu_5Ey0fl1UrQ6V59n2l2JODMrKWQoIGh6kbIVqPJNZtszMC649Pu-h2NZdYCx36ACNN1fA7c2WCvqKlb2kVUro-rsK7-f6KrZ0qGXG1sf3r_jlAmZnrK4I6UAo80hAN70i1B2DU2GYZAhOlZ7tfMepvTas0KM8njXzF3LqhuboOgIqhR88zbtf6ygH4J_4f4RIkg9tLWXt1YJEejZXONh8sE-ru98aB4ggCXcpQjugOtADBoQzWuSQPmcpETn_5iCoyV_m', {
        method: 'GET'
      });
      
      if (!response.ok) {
        // Fallback to storage if the API is not available
        console.warn('Google Apps Script API not available, using fallback data');
        const events = await storage.getEvents();
        return res.json(events);
      }
      
      const data = await response.json();
      
      // Map the data to our Event type
      const events = data.map((item: any, index: number) => ({
        id: index + 1,
        name: item.name || 'Unnamed Event',
        state: item.state || 'Unknown',
        date: new Date(item.date),
        email: item.email || 'events@agriculturalnonprofit.org',
        link: item.link || '#'
      }));
      
      res.json(events);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to storage data
      const events = await storage.getEvents();
      res.json(events);
    }
  });
  
  // Stories API from RSS Feeds
  app.get('/api/stories', async (req, res) => {
    try {
      const morningAgStories = [];
      const modernFarmerStories = [];
      
      // Fetch stories from Morning Ag Clips
      try {
        const feed = await parser.parseURL('https://www.morningagclips.com/feed/');
        morningAgStories.push(...feed.items.slice(0, 3).map((item, index) => ({
          id: index + 1,
          title: item.title || 'Untitled',
          author: item.creator || 'Morning Ag Clips',
          date: new Date(item.pubDate || new Date()),
          description: item.contentSnippet || 'No description available',
          imageUrl: item.enclosure?.url || 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          sourceLink: item.link || 'https://www.morningagclips.com'
        })));
      } catch (error) {
        console.error('Error fetching Morning Ag Clips RSS:', error);
      }
      
      // Fetch stories from Modern Farmer
      try {
        const feed = await parser.parseURL('https://modernfarmer.com/feed/');
        modernFarmerStories.push(...feed.items.slice(0, 3).map((item, index) => ({
          id: morningAgStories.length + index + 1,
          title: item.title || 'Untitled',
          author: item.creator || 'Modern Farmer',
          date: new Date(item.pubDate || new Date()),
          description: item.contentSnippet || 'No description available',
          imageUrl: item.enclosure?.url || 'https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          sourceLink: item.link || 'https://modernfarmer.com'
        })));
      } catch (error) {
        console.error('Error fetching Modern Farmer RSS:', error);
      }
      
      // Combine stories from both sources
      const stories = [...morningAgStories, ...modernFarmerStories];
      
      // Fallback to storage if no stories were fetched
      if (stories.length === 0) {
        console.warn('No stories fetched from RSS, using fallback data');
        const storageStories = await storage.getStories();
        return res.json(storageStories);
      }
      
      res.json(stories);
    } catch (error) {
      console.error('Error fetching stories:', error);
      // Fallback to storage data
      const stories = await storage.getStories();
      res.json(stories);
    }
  });
  
  // Chapters API
  app.get('/api/chapters', async (req, res) => {
    try {
      const chapters = await storage.getChapters();
      res.json(chapters);
    } catch (error) {
      console.error('Error fetching chapters:', error);
      res.status(500).json({ message: 'Failed to fetch chapters' });
    }
  });
  
  // Newsletter subscription
  app.post('/api/subscribe', async (req, res) => {
    try {
      const { email } = req.body;
      
      if (!email || typeof email !== 'string') {
        return res.status(400).json({ message: 'Valid email address is required' });
      }
      
      // Store the email subscription
      await storage.addSubscriber(email);
      res.json({ success: true, message: 'Successfully subscribed to newsletter' });
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      res.status(500).json({ message: 'Failed to subscribe to newsletter' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
