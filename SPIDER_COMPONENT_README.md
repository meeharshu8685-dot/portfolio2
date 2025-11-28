# SpiderBlinkClimbLook Component

A production-ready React + TypeScript component that renders an animated SVG spider with blinking eyes, scroll-based climbing, and mouse-following rotation.

## Features

- **Blinking Animation**: Eyes blink at random intervals (1.5s - 4s) with natural timing
- **Scroll Climbing**: Spider climbs up when scrolling down, descends when scrolling up
- **Mouse Look**: Subtle rotation (max 12°) to follow mouse cursor horizontally
- **Accessibility**: Respects `prefers-reduced-motion` and includes screen reader support
- **Performance**: Uses `requestAnimationFrame` and debounced scroll handling
- **Responsive**: Scales cleanly on mobile and desktop

## Installation

The component uses Framer Motion, which should already be installed:

```bash
npm install framer-motion
```

## Usage

### Basic Integration in Hero Section

```tsx
import SpiderBlinkClimbLook from '../components/SpiderBlinkClimbLook';

export const Home = () => {
  return (
    <section className="relative min-h-screen">
      {/* Spider positioned at top */}
      <div className="absolute top-0 left-0 right-0 h-[300px] z-10 pointer-events-none">
        <SpiderBlinkClimbLook size={96} maxClimb={220} />
      </div>
      
      {/* Your hero content */}
      <div className="relative z-20">
        {/* Hero content here */}
      </div>
    </section>
  );
};
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `96` | SVG spider size in pixels (width & height) |
| `maxClimb` | `number` | `220` | Maximum vertical climb distance in pixels |
| `minY` | `number` | `40` | Minimum Y position (top boundary) |
| `maxY` | `number` | `260` | Maximum Y position (bottom boundary) |

### Example with Custom Props

```tsx
<SpiderBlinkClimbLook 
  size={120}        // Larger spider
  maxClimb={300}    // More climbing range
  minY={20}         // Start closer to top
  maxY={400}        // Can go further down
/>
```

## Accessibility

- **Screen Readers**: Component includes `aria-hidden="true"` and descriptive screen reader text
- **Reduced Motion**: Automatically detects `prefers-reduced-motion` and:
  - Disables blinking animations
  - Removes spring motion (spider stays static)
  - Disables mouse rotation
  - Spider remains visible but non-animated

## Styling

The component uses Tailwind CSS utility classes. Ensure Tailwind is configured in your `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Customization

You can customize the spider appearance by modifying the SVG paths in the component:
- **Spider color**: Change `fill="#1a1a1a"` to your preferred color
- **Thread color**: Modify `stroke="#ffffff"` and `strokeOpacity="0.3"`
- **Eye color**: Adjust `fill="#ffffff"` for eyes

## Performance

- Uses `requestAnimationFrame` for scroll handling
- Debounced mouse tracking
- Minimal DOM updates
- Spring physics for smooth motion

## Browser Support

Works in all modern browsers that support:
- CSS `prefers-reduced-motion` media query
- `requestAnimationFrame` API
- SVG rendering

## Alternative Spider Designs

If you want a different visual style, consider:

1. **Emoji Spider**: Replace SVG with `🕷️` emoji (simpler but less customizable)
2. **Custom SVG**: Import your own spider SVG and replace the inline SVG
3. **Icon Library**: Use an icon from a library like Heroicons or React Icons

Example with emoji:
```tsx
<div style={{ fontSize: '96px' }}>🕷️</div>
```

## Troubleshooting

### Spider not moving on scroll
- Ensure the component is within a scrollable container
- Check that `prefers-reduced-motion` is not enabled
- Verify Framer Motion is properly installed

### Spider not rotating
- Check mouse event listeners are working
- Verify `prefers-reduced-motion` is disabled
- Ensure the spider container has proper positioning

### Performance issues
- The component uses `requestAnimationFrame` for optimal performance
- If issues persist, reduce the `maxClimb` value to limit animation range

