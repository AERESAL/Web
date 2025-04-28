# Agricultural Nonprofit Website

A modern website for an agricultural nonprofit organization featuring:

## Features

- **Interactive Image Carousel**: Powered by Google Slides for easy content updates
- **Events Section**: Displays upcoming events sourced from Google Apps Script
- **Stories Section**: Integrates news from agricultural RSS feeds
- **Chapters Information**: Directory of local chapters with contact information
- **Newsletter Subscription**: Email subscription functionality
- **Responsive Design**: Mobile-friendly interface built with React and Tailwind CSS

## Technology Stack

- **Frontend**: React, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **External Integrations**: RSS Feeds, Google Apps Script

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your PostgreSQL connection string:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/dbname
     ```

4. Initialize the database:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:5000](http://localhost:5000) in your browser

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.