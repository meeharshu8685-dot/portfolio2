# Vercel Deployment Fixes & Troubleshooting Guide

## 🔧 Common Issues and Solutions

### 1. Build Fails - TypeScript Errors

**Problem**: Build fails with TypeScript compilation errors

**Solution**: The build command includes TypeScript checking. If you have non-critical type errors, you can modify the build script:

```json
// package.json
"build": "vite build"  // Remove 'tsc &&' if TypeScript errors are blocking
```

Or fix the TypeScript errors in your code.

---

### 2. 404 Errors on Routes (React Router)

**Problem**: Direct navigation to routes like `/about` or `/projects` returns 404

**Solution**: The `vercel.json` already includes rewrite rules, but if it's not working:

**Option A**: Update `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Option B**: If using Vercel CLI, ensure the file is committed and pushed.

---

### 3. Assets Not Loading (Images, Fonts, etc.)

**Problem**: Images or other assets return 404

**Solutions**:
- Ensure all assets are in the `public/` directory
- Use absolute paths starting with `/` (e.g., `/assets/profile.jpg`)
- Check that files are committed to Git (Vercel only deploys committed files)
- Verify file names match exactly (case-sensitive)

---

### 4. Environment Variables Not Working

**Problem**: Environment variables are undefined

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your variables (e.g., `VITE_API_URL`, `VITE_API_KEY`)
3. **Important**: Restart/redeploy after adding variables
4. In code, access via `import.meta.env.VITE_API_URL`

**Note**: Only variables prefixed with `VITE_` are exposed to the client in Vite.

---

### 5. Build Timeout

**Problem**: Build exceeds Vercel's timeout limit

**Solutions**:
- Optimize dependencies (remove unused packages)
- Check for large files in the repository
- Use Vercel Pro plan for longer build times (if needed)
- Optimize images before committing

---

### 6. Module Not Found Errors

**Problem**: `Cannot find module 'X'` during build

**Solutions**:
- Ensure all dependencies are in `package.json` (not just `devDependencies`)
- Run `npm install` locally to verify all packages install correctly
- Check that `node_modules` is in `.gitignore` (it should be)
- Clear Vercel build cache: Settings → General → Clear Build Cache

---

### 7. TailwindCSS Styles Not Applied

**Problem**: Styles are missing in production

**Solutions**:
- Verify `tailwind.config.js` includes all content paths:
  ```js
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
  ```
- Ensure `postcss.config.js` is present
- Check that `index.css` imports Tailwind directives:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

---

### 8. Framer Motion Animations Not Working

**Problem**: Animations don't appear or are broken

**Solutions**:
- Verify `framer-motion` is in `dependencies` (not `devDependencies`)
- Check browser console for errors
- Ensure React StrictMode isn't causing double renders (if needed, remove from `main.tsx`)

---

### 9. Contact Form Not Working

**Problem**: Form submission fails or doesn't send emails

**Current Setup**: Uses `mailto:` fallback

**Solutions**:
- **Option 1**: Set up a Vercel Serverless Function (see below)
- **Option 2**: Use a third-party service (Formspree, Netlify Forms)
- **Option 3**: Update the form to use your backend API

---

### 10. Slow Page Loads

**Problem**: Site loads slowly

**Solutions**:
- Optimize images (use WebP format, compress)
- Enable Vercel's automatic image optimization
- Check bundle size: `npm run build` and review output
- Use code splitting if needed
- Enable Vercel Analytics to monitor performance

---

## 🚀 Setting Up Contact Form Backend (Serverless Function)

### Create API Endpoint

1. Create `api/contact.ts`:
```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Add your email sending logic here
  // Example: Use Resend, SendGrid, or Nodemailer
  
  try {
    // Send email logic
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
```

2. Install dependencies:
```bash
npm install @vercel/node
```

3. Update `ContactForm.tsx`:
```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
});
```

---

## 🔍 Debugging Tips

### Check Build Logs
1. Go to Vercel Dashboard → Your Project → Deployments
2. Click on a deployment
3. View "Build Logs" tab for detailed error messages

### Test Build Locally
```bash
npm run build
npm run preview
```

### Verify Configuration
- Check `vercel.json` syntax is valid JSON
- Ensure `package.json` has correct scripts
- Verify all required files are committed

### Common Build Log Errors

**Error**: `Command "npm run build" exited with 1`
- Check the build logs for specific error
- Usually TypeScript errors or missing dependencies

**Error**: `Module not found: Can't resolve './X'`
- Check file paths (case-sensitive)
- Verify imports are correct

**Error**: `Cannot find module 'react'`
- Dependencies not installed
- Check `package.json` has all required packages

---

## ✅ Pre-Deployment Checklist

Before deploying, ensure:
- [ ] `npm run build` succeeds locally
- [ ] All TypeScript errors are fixed
- [ ] All assets are in `public/` directory
- [ ] `vercel.json` is present and valid
- [ ] `.gitignore` includes `node_modules` and `dist`
- [ ] All changes are committed and pushed to GitHub
- [ ] Environment variables are set in Vercel dashboard (if needed)

---

## 🆘 Still Having Issues?

1. **Check Vercel Status**: https://www.vercel-status.com/
2. **Vercel Documentation**: https://vercel.com/docs
3. **Vercel Community**: https://github.com/vercel/vercel/discussions
4. **Review Build Logs**: Most issues are visible in deployment logs

---

## 📝 Quick Fixes Reference

```bash
# Clear build cache (in Vercel Dashboard)
Settings → General → Clear Build Cache

# Force redeploy
git commit --allow-empty -m "Force redeploy"
git push

# Check build locally
npm run build

# Verify dependencies
npm install
npm run build
```

---

**Most common fix**: Clear build cache and redeploy! 🔄

