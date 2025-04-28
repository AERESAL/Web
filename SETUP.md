# Setup Guide

## Database Setup

This project uses PostgreSQL with Drizzle ORM. Follow these steps to set up your database:

1. **Create a PostgreSQL database**
   - You can use a local PostgreSQL installation or a cloud provider like Neon Database

2. **Set environment variables**
   - Create a `.env` file with your database connection string:
   ```
   DATABASE_URL=postgresql://username:password@hostname:port/database
   ```

3. **Run database migrations**
   ```bash
   npm run db:push
   ```
   This will create all required tables in your database.

## External Integrations

### Google Apps Script for Events

The events section fetches data from a Google Apps Script. To set up your own:

1. Create a Google Apps Script that returns event data in the following format:
   ```json
   [
     {
       "name": "Event Name",
       "state": "CA",
       "date": "2025-05-15",
       "email": "contact@example.com",
       "link": "https://example.com/event"
     }
   ]
   ```

2. Deploy the script as a web app with public access
3. Update the API endpoint in `server/routes.ts`

### RSS Feeds

The stories section pulls content from agricultural RSS feeds:
- Morning Ag Clips: https://www.morningagclips.com/feed/
- Modern Farmer: https://modernfarmer.com/feed/

You can update these in `server/routes.ts` to use different RSS sources.

### Google Slides for Carousel

The image carousel is an embedded Google Slides presentation:
1. Create a Google Slides presentation
2. Make it publicly viewable
3. Embed it in the `Home.tsx` file

## Deployment Considerations

When deploying to production:

1. **Environment Variables**
   - Set `NODE_ENV=production`
   - Ensure `DATABASE_URL` points to your production database

2. **Build Process**
   ```bash
   npm run build
   ```

3. **Starting the Server**
   ```bash
   npm start
   ```

4. **Database Security**
   - Ensure your database is properly secured
   - Consider using connection pooling for production environments