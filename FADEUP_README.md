# Scroll Fade-Up Animation Component

A production-ready, reusable scroll-triggered fade-up animation component built with React, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✅ Scroll-triggered animations
- ✅ Respects `prefers-reduced-motion`
- ✅ TypeScript support with full type safety
- ✅ Configurable delay, duration, and offset
- ✅ Hydration-safe (no SSR mismatches)
- ✅ Performance optimized with `viewport.once`
- ✅ Reusable animation variants exported

## Installation

Ensure you have the required dependencies:

```bash
npm install framer-motion
npm install -D tailwindcss
```

## Usage

### Basic Example

```tsx
import FadeUp from '@/components/FadeUp';

function MyComponent() {
  return (
    <FadeUp>
      <h1>This will fade up when scrolled into view</h1>
    </FadeUp>
  );
}
```

### With Custom Props

```tsx
<FadeUp delay={0.2} duration={0.8} y={60} once={false}>
  <div>Custom animation settings</div>
</FadeUp>
```

### Staggered Animations

```tsx
{items.map((item, index) => (
  <FadeUp key={item.id} delay={index * 0.1}>
    <Card>{item.content}</Card>
  </FadeUp>
))}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Content to animate |
| `delay` | `number` | `0` | Animation delay in seconds |
| `duration` | `number` | `0.6` | Animation duration in seconds |
| `y` | `number` | `40` | Vertical offset in pixels |
| `once` | `boolean` | `true` | Whether to animate only once |

## Viewport Threshold

The component uses `viewport.amount: 0.28`, meaning the element must be **28% visible** in the viewport before the animation triggers. This value provides a good balance:

- **Lower values (0.1-0.2)**: Trigger earlier, more aggressive
- **Higher values (0.3-0.5)**: Trigger later, more conservative
- **0.28**: Sweet spot for most use cases

You can adjust this in the component if needed.

## Accessibility

The component automatically respects `prefers-reduced-motion`:

- If the user prefers reduced motion, animations are disabled
- Content is still rendered normally
- No visual disruption for accessibility users

## Testing Reduced Motion

### Browser DevTools

**Chrome/Edge:**
1. Open DevTools (F12)
2. More Tools > Rendering
3. Emulate CSS media feature: `prefers-reduced-motion: reduce`

**Firefox:**
1. Open DevTools (F12)
2. Settings > Rendering
3. Check "prefers-reduced-motion"

### OS Settings

- **Windows**: Settings > Ease of Access > Display > Show animations
- **macOS**: System Preferences > Accessibility > Display > Reduce motion
- **Linux**: Varies by desktop environment

## Example Pages

Visit `/fadeup-example` to see the component in action with:
- About section with staggered text
- Skills grid with incremental delays
- Feature cards with varying animation settings

## Exported Variants

You can also use the animation variants directly:

```tsx
import { fadeUpVariants } from '@/components/FadeUp';

<motion.div
  variants={fadeUpVariants}
  initial="hidden"
  animate="visible"
  custom={50} // y offset
>
  Content
</motion.div>
```

## Performance Notes

- Uses `viewport.once={true}` by default to prevent re-animations
- Minimal re-renders with optimized Framer Motion hooks
- No heavy computations or unnecessary effects
- Smooth 60fps animations with hardware acceleration

## Browser Support

- Chrome/Edge: ✅
- Firefox: ✅
- Safari: ✅
- Mobile browsers: ✅

Requires modern browser with CSS transforms and Intersection Observer support.

