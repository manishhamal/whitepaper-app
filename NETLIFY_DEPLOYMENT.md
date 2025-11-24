# Deployment Guide: Host Your Whitepaper on Netlify (Free)

This guide will walk you through deploying your whitepaper application to Netlify for free hosting.

## Prerequisites

- A GitHub account (to connect your repository)
- Your code pushed to a GitHub repository

## Option 1: Deploy via Netlify UI (Recommended for Beginners)

### Step 1: Push Your Code to GitHub

If you haven't already, initialize a git repository and push to GitHub:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 2: Sign Up for Netlify

1. Go to [netlify.com](https://www.netlify.com/)
2. Click **Sign Up** and choose **Sign up with GitHub**
3. Authorize Netlify to access your GitHub account

### Step 3: Deploy Your Site

1. Click **Add new site** → **Import an existing project**
2. Choose **Deploy with GitHub**
3. Select your whitepaper repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 20.15.1 (set in Environment variables if needed)
5. Click **Deploy site**

### Step 4: Configure Environment Variables (If Needed)

If your app uses environment variables (like `GEMINI_API_KEY`):

1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Add your variables (e.g., `GEMINI_API_KEY`)
4. Redeploy your site

### Step 5: Custom Domain (Optional)

- Netlify provides a free subdomain: `your-site-name.netlify.app`
- You can customize it: **Site settings** → **Domain management** → **Change site name**
- Or add your own custom domain

---

## Option 2: Deploy via Netlify CLI

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Build Your Project

```bash
npm run build
```

### Step 4: Deploy

For a draft deploy:
```bash
netlify deploy
```

For production deploy:
```bash
netlify deploy --prod
```

---

## Option 3: Deploy via Netlify Drop

1. Build your project locally: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag and drop your `dist` folder
4. Your site is live instantly!

---

## Configuration Files Created

I've created a `netlify.toml` file in your project with the following configuration:

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Redirects**: All routes redirect to `index.html` for client-side routing (React Router)
- **Node version**: 20.15.1

---

## Important Notes

### Client-Side Routing

Your app uses React Router with hash routing (`#/`). The `netlify.toml` includes redirects to handle this properly.

### Environment Variables

If your app requires API keys or environment variables:
- **Never commit** `.env.local` to GitHub
- Set them in Netlify UI: **Site settings** → **Environment variables**
- Prefix with `VITE_` to make them available in your Vite app (e.g., `VITE_GEMINI_API_KEY`)

### Build Optimization

Your current build setup is ready for Netlify. The build process will:
1. Install dependencies (`npm install`)
2. Run the build command (`npm run build`)
3. Publish the `dist` folder

---

## Troubleshooting

### Build Fails

- Check the build logs in Netlify dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### Routes Don't Work

- The `netlify.toml` redirects should handle this
- If using hash routing (`#/`), routes should work automatically

### Environment Variables Not Working

- Ensure they're prefixed with `VITE_` for Vite apps
- Redeploy after adding environment variables

---

## Next Steps

1. Push your code to GitHub (including the new `netlify.toml` file)
2. Follow **Option 1** above to deploy via Netlify UI
3. Your site will be live at `https://your-site-name.netlify.app`
4. Every push to your main branch will automatically trigger a new deployment

**Free Tier Includes:**
- ✅ Unlimited personal and commercial projects
- ✅ HTTPS enabled by default
- ✅ Continuous deployment from Git
- ✅ 100 GB bandwidth/month
- ✅ Custom domain support

Enjoy your free hosting! 🚀
