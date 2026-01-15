# Vistrike - Static Site Deployment Guide

This guide covers deploying Vistrike as a static site to various hosting platforms.

## Prerequisites

- Your code pushed to a GitHub, GitLab, or Bitbucket repository
- Node.js and npm installed locally

## Build Your App

Before deploying, test the production build locally:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview the build locally
npm run preview
```

The build creates a `dist/` folder with optimized production files.

---

## Deploy to Render (Free Tier Available)

### Step 1: Create a Static Site

1. Log in to [Render Dashboard](https://dashboard.render.com)
2. Click **"New +"** and select **"Static Site"**
3. Connect your GitHub/GitLab account
4. Select your repository

### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Name** | `tactiq-spar` |
| **Branch** | `main` |
| **Build Command** | `npm run build` |
| **Publish Directory** | `dist` |

### Step 3: Configure SPA Routing

For client-side routing to work (ensuring pages like `/privacy` and `/about` are accessible):

1. Go to your Static Site settings in the Render Dashboard.
2. Navigate to **"Redirects/Rewrites"**.
3. Add a rewrite rule:

| Source | Destination | Action |
|--------|-------------|--------|
| `/*` | `/index.html` | Rewrite |

*Note: This is critical for React apps using React Router. Without this, refreshing the page on a sub-route will result in a 404 error.*

### Step 4: Deploy

Click **"Create Static Site"** and Render will build and deploy your app.

Your site will be live at: `https://tactiq-spar.onrender.com`

---

## Deploy to Netlify (Free Tier Available)

### Option A: Git Integration (Recommended)

1. Go to [Netlify Dashboard](https://app.netlify.com/)
2. Click **"Add new site"** > **"Import an existing project"**
3. Connect your Git provider and select your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **"Deploy site"**

### Option B: CLI Deployment

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### SPA Routing Configuration

Create a `netlify.toml` file in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Your site will be live at: `https://your-site-name.netlify.app`

---

## Deploy to Vercel (Free Tier Available)

### Option A: Git Integration (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/new)
2. Click **"Import Project"**
3. Select your Git repository
4. Vercel auto-detects Vite settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**

### Option B: CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

### SPA Routing Configuration

Create a `vercel.json` file in your project root:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

Your site will be live at: `https://your-project.vercel.app`

---

## Deploy to GitHub Pages (Free)

### Step 1: Configure Vite for GitHub Pages

Update `vite.config.js` to set the base path:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/your-repo-name/', // Replace with your repository name
})
```

### Step 2: Install gh-pages

```bash
npm install --save-dev gh-pages
```

### Step 3: Add Deploy Script

Add to your `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### Step 4: Deploy

```bash
npm run deploy
```

Your site will be live at: `https://yourusername.github.io/your-repo-name/`

### SPA Routing on GitHub Pages

Create a `public/404.html` file that redirects to `index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>TACTIQ Spar</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
  <body></body>
</html>
```

---

## Deploy to Cloudflare Pages (Free Tier Available)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Pages**
2. Click **"Create a project"** > **"Connect to Git"**
3. Select your repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
5. Click **"Save and Deploy"**

Your site will be live at: `https://your-project.pages.dev`

---

## Environment Variables

If your app uses environment variables, add them in each platform's dashboard:

- **Render:** Settings > Environment
- **Netlify:** Site settings > Environment variables
- **Vercel:** Project Settings > Environment Variables
- **Cloudflare:** Settings > Environment variables

Remember: Variables must be prefixed with `VITE_` to be accessible in the frontend:

```bash
VITE_API_URL=https://api.example.com
```

Access in code:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Custom Domains

All platforms support custom domains:

1. Add your domain in the platform's dashboard
2. Update your DNS records (usually CNAME or A records)
3. Enable HTTPS (automatic on all platforms)

---

## Comparison Table

| Platform | Free Tier | Build Time | Custom Domain | Auto HTTPS |
|----------|-----------|------------|---------------|------------|
| Render | Yes | ~1-3 min | Yes | Yes |
| Netlify | Yes | ~30-60 sec | Yes | Yes |
| Vercel | Yes | ~30-60 sec | Yes | Yes |
| GitHub Pages | Yes | ~1-2 min | Yes | Yes |
| Cloudflare | Yes | ~1-2 min | Yes | Yes |

---

## Troubleshooting

### Build Fails
- Ensure `npm run build` works locally
- Check Node.js version compatibility
- Review build logs for specific errors

### 404 on Page Refresh
- Add the SPA routing configuration for your platform (see above)

### Assets Not Loading
- Verify the `base` path in `vite.config.js`
- Check that publish directory is set to `dist`

### Slow Initial Load
- Enable gzip/brotli compression (automatic on most platforms)
- Check bundle size with `npm run build`

---

## Recommended Platform

For most users, **Netlify** or **Vercel** offer the best experience:
- Fastest build times
- Best auto-detection of Vite projects
- Generous free tiers
- Easy custom domain setup
- Automatic preview deployments for pull requests
