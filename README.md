# Guidesoft Website

This is the official website for Guidesoft, built with modern web technologies.

## Features

- Responsive design that works on all devices
- Modern UI with Tailwind CSS and Radix UI components
- Payment integration with PayPal, Razorpay, and UPI
- User authentication and management
- Course and AI tool listings
- Enrollment system with progress tracking
- Blog and content management
- Contact form with business information
- Cross-browser compatibility
- Desktop application with Electron

## Technology Stack

- **Frontend**: React 18 + TypeScript, Vite
- **Styling**: Tailwind CSS with `tailwindcss-animate`
- **UI Components**: Radix UI, Lucide React icons
- **State Management**: React Hook Form, Zod, TanStack Query
- **Backend**: Node.js with Express
- **Database**: Dual approach with SQLite (Prisma) and Supabase (PostgreSQL)
- **Authentication**: Custom JWT-based system
- **Payments**: PayPal, Razorpay, UPI
- **Deployment**: Static hosting with optional backend server

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/happies2012-cpu/guideitsol.com.git
   cd guideitsol.com
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. Run database migrations:
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```

### Development

Start the development servers:
```bash
npm run start:all
```

This will start both the frontend (Vite) and backend (Express) servers.

### Production Build

Build the application for production:
```bash
npm run build:prod
```

### Desktop Application

Build the Electron desktop application:
```bash
npm run electron:build
```

## Database Integration

The application supports two database backends:

### SQLite (Default)
- Used for local development
- Managed with Prisma ORM
- File-based storage

### Supabase (Optional)
- Cloud-based PostgreSQL database
- Real-time capabilities
- Authentication and storage services

To use Supabase:
1. Create a Supabase project at https://app.supabase.com/
2. Update the environment variables in `.env`
3. Set up the database schema by running the SQL in `supabase/schema.sql` in your Supabase SQL editor
4. Run the migration script: `npm run migrate:supabase`

For detailed setup instructions, see `SUPABASE_SETUP_INSTRUCTIONS.md`

## Payment Integration

The website supports multiple payment methods:
- **PayPal**: Integrated with Smart Payment Buttons
- **Razorpay**: Indian payment gateway
- **UPI**: Direct bank transfers

## Deployment

### Web Hosting
1. Build the application: `npm run build:prod`
2. Upload the contents of the `dist/` directory to your web server
3. Configure your server to serve `index.html` for all routes
4. Run the backend server: `npm run server`

### Desktop Application
1. Build the Electron app: `npm run electron:build`
2. Distribute the platform-specific installers

## Environment Variables

Key environment variables:
- `DATABASE_URL`: SQLite database connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `PORT`: Backend server port
- `FORCE_HTTPS`: Enable HTTPS in development
- `SUPABASE_URL`: Supabase project URL
- `SUPABASE_ANON_KEY`: Supabase anonymous key
- Payment gateway keys (PayPal, Razorpay)

## Scripts

- `npm run dev`: Start Vite development server
- `npm run build`: Build frontend for production
- `npm run server`: Start Express backend server
- `npm run start:all`: Start both frontend and backend
- `npm run prisma:migrate`: Run database migrations
- `npm run prisma:studio`: Open Prisma Studio
- `npm run electron:dev`: Start Electron app in development
- `npm run electron:build`: Build Electron desktop app
- `npm run migrate:supabase`: Migrate data to Supabase

## Additional Documentation

- `NO_CODE_SOLUTIONS_PLAN.md`: Comprehensive plan for addressing application gaps using no-code/low-code approaches
- `GITHUB_ACTIONS_SETUP.md`: Step-by-step guide for setting up GitHub Actions with Personal Access Token
- `COMPLETION_SUMMARY.md`: Summary of completed tasks and next steps

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is proprietary software developed for Guidesoft. All rights reserved.

## Support

For issues or questions, please contact the development team.
## Deployment Status

Website successfully deployed on Wed Nov 12 18:21:14 IST 2025

<--restore Deployment trigger -->
