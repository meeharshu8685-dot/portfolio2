# Deployment Error Fixes for Swiper.js

## Common Swiper.js Deployment Errors

### 1. Module Not Found: 'swiper/react' or 'swiper/modules'

**Error**: `Cannot find module 'swiper/react'` or `Cannot find module 'swiper/modules'`

**Solution**: 
- Swiper v11 includes types by default, but if you get this error:
- Ensure `swiper` is in `dependencies` (not `devDependencies`)
- Check that version matches: `"swiper": "^11.0.5"`

### 2. CSS Import Errors

**Error**: `Cannot resolve 'swiper/css'`

**Solution**: 
- CSS imports in `src/index.css` should be at the top:
```css
@import 'swiper/css';
@import 'swiper/css/effect-coverflow';
@import 'swiper/css/navigation';
@import 'swiper/css/pagination';
```

### 3. TypeScript Type Errors

**Error**: `Property 'Swiper' does not exist` or module type errors

**Solution**: 
- Added `src/types/swiper.d.ts` with type definitions
- If still failing, add to `tsconfig.json`:
```json
{
  "compilerOptions": {
    "skipLibCheck": true
  }
}
```

### 4. Build Fails with Swiper

**Error**: Build fails during `npm run build`

**Quick Fix**: Temporarily modify build script to skip type checking:
```json
"build": "vite build"  // Remove 'tsc &&' temporarily
```

Then fix TypeScript errors and restore.

### 5. Runtime Error: Swiper not initialized

**Error**: Swiper doesn't render or throws runtime errors

**Solution**: 
- Ensure CSS is imported BEFORE Tailwind in `index.css`
- Check that modules are imported correctly:
```typescript
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
```

### 6. Vercel Build Timeout

**Error**: Build times out during `npm install`

**Solution**:
- Swiper is a large package, ensure Vercel has enough build time
- Check `package-lock.json` is committed
- Clear Vercel build cache: Settings → General → Clear Build Cache

## Verification Checklist

- [ ] `swiper` is in `dependencies` in `package.json`
- [ ] CSS imports are at top of `src/index.css`
- [ ] Type definitions exist in `src/types/swiper.d.ts`
- [ ] `tsconfig.json` has `"skipLibCheck": true`
- [ ] All files are committed to Git
- [ ] Build works locally: `npm run build`

## Quick Test Locally

```bash
npm install
npm run build
npm run preview
```

If local build works, the issue is likely Vercel-specific (timeout, cache, etc.)

