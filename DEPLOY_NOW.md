# Quick Deploy to Vercel - Step by Step

## Option 1: Deploy via Vercel Dashboard (Recommended - Easiest)

### Step 1: Install Dependencies Locally (if you haven't)
```bash
npm install
```

### Step 2: Test Build Locally (Optional but Recommended)
```bash
npm run build
```
This ensures everything compiles correctly before deploying.

### Step 3: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Portfolio website"
   ```

2. **Create a GitHub Repository**:
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it (e.g., "portfolio" or "harsh-vishwakarma-portfolio")
   - Don't initialize with README (we already have one)
   - Click "Create repository"

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```
   Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### Step 4: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login (you can use GitHub to sign in)
3. Click **"Add New..."** → **"Project"**
4. Click **"Import Git Repository"**
5. Select your repository from the list
6. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
7. Click **"Deploy"**
8. Wait 1-2 minutes for deployment
9. Your site will be live at: `https://your-project-name.vercel.app`

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name? (Press Enter for default or enter custom name)
- Directory? (Press Enter for `./`)
- Override settings? **No**

### Step 4: Deploy to Production
```bash
vercel --prod
```

## Post-Deployment

### Verify Deployment
1. Visit your Vercel URL
2. Test all pages (Home, About, Projects, Contact)
3. Test on mobile device
4. Check that project modals work
5. Verify contact form

### Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment Variables (If Needed)
If you add a backend API later:
1. Go to Project Settings → Environment Variables
2. Add your API keys/endpoints
3. Redeploy

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Run `npm install` locally first
- Check Vercel build logs for specific errors

### Pages Not Loading
- Ensure `vercel.json` has the rewrite rules (already configured)
- Check that React Router is set up correctly

### Images Not Showing
- Verify image paths in `public/assets/`
- Check that images are committed to Git
- Use absolute paths starting with `/assets/`

## Quick Commands Reference

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Vercel (CLI)
vercel

# Deploy to production (CLI)
vercel --prod
```

---

**Your portfolio is ready to deploy!** 🚀

