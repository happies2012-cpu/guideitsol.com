# Environment Variables

## Required for Stripe

- STRIPE_SECRET_KEY: Secret key from Stripe Dashboard.
- STRIPE_PUBLIC_KEY: Publishable key from Stripe Dashboard.
- STRIPE_WEBHOOK_SECRET: Signing secret from the webhook endpoint.
- NEXT_PUBLIC_SITE_URL: Public site URL, such as https://your-app.vercel.app.

## Required for the app

- DATABASE_URL: SQLite or Postgres database connection string.
- JWT_SECRET: Strong random JWT secret.
- PORT: Server port (default 3000).
- NODE_ENV: production or development.
- ALLOWED_ORIGINS: Comma-separated origins.
