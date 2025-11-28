# Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)

### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

3. **Environment Variables** (if needed)
   - If you add a backend API for the contact form, add environment variables in Vercel dashboard
   - Go to Project Settings → Environment Variables
   - Add any required API keys or endpoints

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test navigation on mobile devices
- [ ] Check that project modals open and close properly
- [ ] Test contact form (currently uses mailto fallback)
- [ ] Verify social media links work
- [ ] Check that resume download works (if resume is uploaded)

## Custom Domain (Optional)

1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Contact Form Backend Setup

Currently, the contact form uses a `mailto:` fallback. To set up a proper backend:

1. **Option 1: Vercel Serverless Function**
   - Create `api/contact.ts` in your project
   - Use a service like SendGrid, Resend, or Nodemailer
   - Update `ContactForm.tsx` to call `/api/contact`

2. **Option 2: Third-party Service**
   - Use Formspree, Netlify Forms, or similar
   - Update the form action URL

Example serverless function structure:
```typescript
// api/contact.ts
export default async function handler(req, res) {
  // Handle form submission
  // Send email via service
  // Return success/error
}
```

