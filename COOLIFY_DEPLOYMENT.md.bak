# Coolify Deployment Guide

## Understanding the Configuration

This project is configured to run on **Port 3000** as a Node.js application.

The error logs previously indicated that Coolify might have been deploying with Caddy improperly. We have renamed `Caddyfile` to `Caddyfile.unused` to force Coolify to use the standard Node.js/Docker deployment method configured in `coolify.json` and `Dockerfile`.

## Deployment Options

### Option 1: Coolify Auto-Deployment (Recommended)

1.  **Push Changes**: Ensure you have pushed the latest changes (including `coolify.json` with port 3000) to GitHub.
2.  **Coolify Dashboard**:
    - Go to your application in Coolify.
    - Go to **Settings**.
    - Ensure **Build Pack** is set to **Nixpacks** or **Dockerfile**.
    - If using **Dockerfile**, ensure the *Docker Compose Location* points to `docker-compose.yml` or *Dockerfile Location* points to `Dockerfile`.
3.  **Port Configuration**:
    - In **Settings** -> **General**, ensure **Port** is set to `3000`.
    - If you see `80` anywhere, change it to `3000`.
4.  **Deploy**: Click **Deploy**.

### Option 2: Automatic Integration (Webhooks)

To enable automatic deployment whenever you push to GitHub:

1.  **Coolify Dashboard**:
    - Go to your application.
    - Navigate to **Webhooks**.
    - Copy the **Github Webhook Secret** (or similar webhook URL provided by Coolify).
2.  **GitHub Repository**:
    - Go to your repository settings on GitHub.
    - Go to **Webhooks** -> **Add webhook**.
    - Paste the **Payload URL** from Coolify.
    - Set **Content type** to `application/json`.
    - Select **Just the push event**.
    - Click **Add webhook**.

Now, every time you push to the `main` branch, Coolify will automatically redeploy your application.

## Troubleshooting

### "Bad Gateway" (502) or "Gateway Timeout" (504)
- This usually means Coolify is pointing to the wrong port.
- Check the **Logs** in Coolify to see what port the application started on (it should say `Backend server running on http://localhost:3000`).
- Ensure the **Ports Exposes** setting in Coolify matches `3000`.

### "Caddy" Errors
- If you see errors related to Caddy in the build logs, ensure `Caddyfile` is renamed to `Caddyfile.unused` in your repository.
- Force a rebuild without cache in Coolify if the problem persists.

### Health Check Issues
- Ensure the health check path is set to `/api/health` or `/` in Coolify settings.
- The application responds to `/api/health` with `{"status": "ok", ...}`.

## Environment Variables

Ensure these are set in Coolify:
- `NODE_ENV=production`
- `PORT=3000`
- `DATABASE_URL` (if using a database)
- `VITE_SITE_URL` (e.g., `https://guideitsol.com`)