# Ciji Building Metallic Construction Industry LLC - Website

React + Vite + Tailwind CSS application configured for deployment on **Cloudflare Pages**.

---

## 🚀 Quick Start (Local Development)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

---

## ☁️ Hosting on Cloudflare Pages

### Option 1: Cloudflare Dashboard (Recommended / Easiest)

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Go to **Compute (Workers & Pages)** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository (`ciji-website`).
4. Set the build configurations:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (or leave blank if repository root is the project root)
5. Click **Save and Deploy**. Cloudflare will automatically build and deploy every commit pushed to `main`.

---

### Option 2: Wrangler CLI Deployment

You can deploy directly from your local terminal using Wrangler:

```bash
# Log in to Cloudflare (one-time)
npx wrangler login

# Build and deploy to Cloudflare Pages
npm run deploy
```

---

### Option 3: Automated GitHub Actions CI/CD

A ready-to-use GitHub Actions workflow is located at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

To enable it:
1. In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
2. Add the following repository secrets:
   - `CLOUDFLARE_API_TOKEN`: Cloudflare API token with Pages edit permissions.
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID.
3. Every push to `main` will automatically trigger a deployment.

---

## 📁 Key Cloudflare Pages Files

- [`public/_redirects`](public/_redirects): Single-page application (SPA) rewrite rule (`/* /index.html 200`) enabling client-side routing on page refreshes.
- [`public/_headers`](public/_headers): Security headers and long-term caching rules for `/assets/*` and `/images/*`.
- [`public/robots.txt`](public/robots.txt): Search engine crawler instructions.
- [`wrangler.toml`](wrangler.toml): Cloudflare Pages / Wrangler project configuration.

