import { 
  users, type User, type InsertUser, 
  type Event, type Story, type Chapter, 
  events, stories, chapters, subscribers,
  type InsertSubscriber
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getEvents(): Promise<Event[]>;
  getStories(): Promise<Story[]>;
  getChapters(): Promise<Chapter[]>;
  addSubscriber(email: string): Promise<void>;
}

// Database implementation of storage
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async getEvents(): Promise<Event[]> {
    return await db.select().from(events);
  }
  
  async getStories(): Promise<Story[]> {
    return await db.select().from(stories);
  }
  
  async getChapters(): Promise<Chapter[]> {
    return await db.select().from(chapters);
  }
  
  async addSubscriber(email: string): Promise<void> {
    const subscriber: InsertSubscriber = { email };
    await db.insert(subscribers).values(subscriber);
  }
}

// Initialize database with sample data
async function initializeDatabase() {
  try {
    // Check if we have any events
    const existingEvents = await db.select().from(events);
    
    if (existingEvents.length === 0) {
      console.log('Initializing database with sample data');
      
      // Add sample events
      await db.insert(events).values([
        {
          name: "Sustainable Farming Workshop",
          state: "CA",
          date: new Date("2025-05-15"),
          email: "events@agriculturalnonprofit.org",
          link: "https://example.com/events/farming-workshop"
        },
        {
          name: "Annual Farmers Market",
          state: "NY",
          date: new Date("2025-06-10"),
          email: "events@agriculturalnonprofit.org",
          link: "https://example.com/events/farmers-market"
        },
        {
          name: "Soil Health Conference",
          state: "TX",
          date: new Date("2025-07-22"),
          email: "events@agriculturalnonprofit.org",
          link: "https://example.com/events/soil-conference"
        }
      ]);
      
      // Add sample stories
      await db.insert(stories).values([
        {
          title: "Local Farmers Adopt Innovative Water Conservation Techniques",
          author: "Jane Smith",
          date: new Date("2025-04-05"),
          description: "Farmers in the Midwest are implementing new methods to reduce water usage while maintaining crop yields.",
          imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          sourceLink: "https://example.com/stories/water-conservation"
        },
        {
          title: "Community Gardens Transform Urban Neighborhoods",
          author: "Michael Johnson",
          date: new Date("2025-03-28"),
          description: "Urban communities are coming together to create gardens that provide fresh produce and educational opportunities.",
          imageUrl: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          sourceLink: "https://example.com/stories/community-gardens"
        },
        {
          title: "New Policy Supports Sustainable Agricultural Practices",
          author: "Robert Williams",
          date: new Date("2025-04-10"),
          description: "Recent legislation aims to incentivize farmers who implement environmentally friendly farming methods.",
          imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
          sourceLink: "https://example.com/stories/sustainable-policy"
        }
      ]);
      
      // Add sample chapters
      await db.insert(chapters).values([
        {
          name: "Bay Area Chapter",
          location: "San Francisco, CA",
          email: "bayarea@agriculturalnonprofit.org",
          socials: {
            facebook: "https://facebook.com/agrinonprofit-bayarea",
            instagram: "https://instagram.com/agrinonprofit-bayarea",
            twitter: "https://twitter.com/agrinonprofit-bayarea"
          },
          volunteerLink: "https://example.com/volunteer/bayarea"
        },
        {
          name: "Midwest Chapter",
          location: "Chicago, IL",
          email: "midwest@agriculturalnonprofit.org",
          socials: {
            facebook: "https://facebook.com/agrinonprofit-midwest",
            instagram: "https://instagram.com/agrinonprofit-midwest"
          },
          volunteerLink: "https://example.com/volunteer/midwest"
        },
        {
          name: "Northeast Chapter",
          location: "Boston, MA",
          email: "northeast@agriculturalnonprofit.org",
          socials: {
            facebook: "https://facebook.com/agrinonprofit-northeast",
            twitter: "https://twitter.com/agrinonprofit-northeast",
            youtube: "https://youtube.com/agrinonprofit-northeast"
          },
          volunteerLink: "https://example.com/volunteer/northeast"
        }
      ]);
      
      console.log('Database initialized with sample data');
    }
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Initialize the database and export the storage instance
initializeDatabase().catch(console.error);
export const storage = new DatabaseStorage();
