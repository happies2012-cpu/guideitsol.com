# Diwali Celebration Effect - User Guide

## Overview
This guide explains how to use and customize the Diwali celebration effect that has been implemented for the Guidesoft website.

## How to View the Diwali Effect

The Diwali effect will automatically appear during the Diwali season (October 20 - November 5). However, you can also manually enable it for testing or demonstration purposes.

### Method 1: URL Parameter
Add `?diwali=true` to any URL:
```
http://localhost:8080/?diwali=true
```

### Method 2: Browser Console
Open your browser's developer tools and run this command in the console:
```javascript
localStorage.setItem('diwaliEffect', 'true');
```

Then refresh the page.

### Method 3: Permanent Enable (Development Only)
Modify the `showDiwaliEffect()` function in `/src/App.tsx` to always return `true`:
```typescript
const showDiwaliEffect = () => {
  return true; // Always show
};
```

## How to Disable the Effect

### If Enabled via localStorage
```javascript
localStorage.removeItem('diwaliEffect');
```

### If Enabled via URL Parameter
Remove the `?diwali=true` parameter from the URL.

## Technical Details

### Component Location
- **Main Component**: `/src/components/DiwaliCelebrationEffect.tsx`
- **Integration Point**: `/src/App.tsx`

### Effect Features
- Animated particle system with 200 particles
- Three particle shapes: circles, squares, and stars
- Warm color palette (yellows, oranges, reds)
- Natural physics-based movement
- **Rocket particles** that launch from bottom to top with trails
- **Increased spark frequency** for more vibrant effects
- Performance-optimized canvas rendering

## Customization Options

### Adjust Particle Count
In `DiwaliCelebrationEffect.tsx`, modify:
```javascript
const particleCount = 200; // Increase for more particles, decrease for better performance
const rocketCount = 15; // Number of rockets with trails
```

### Change Colors
In the Particle class constructor, modify:
```typescript
// Warm colors (Diwali-appropriate)
this.color = `hsl(${Math.random() * 60 + 30}, 100%, ${Math.random() * 30 + 70}%)`;

// Cool colors (for winter holidays)
// this.color = `hsl(${Math.random() * 60 + 180}, 100%, ${Math.random() * 30 + 70}%)`;
```

### Modify Activation Dates
In `App.tsx`, modify the date range:
```typescript
// Diwali dates (October 20 - November 5)
return (month === 10 && day >= 20) || (month === 11 && day <= 5);

// Christmas dates (December 20 - January 5)
// return (month === 12 && day >= 20) || (month === 1 && day <= 5);
```

## Documentation Files

1. `/DIWALI_CELEBRATION_EFFECT.md` - Detailed technical documentation
2. `/DIWALI_EFFECT_IMPLEMENTATION_SUMMARY.md` - Implementation summary
3. `/README_DIWALI_EFFECT.md` - This user guide

## Testing the Effect

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:8080/?diwali=true

3. You should see animated particles floating around the screen with warm colors, including rockets launching from the bottom with trails.

## Performance Notes

- The effect uses efficient canvas rendering
- Animation automatically stops when the component unmounts
- Particle count is optimized for good performance
- Blend mode is set to "screen" for a glowing effect without performance impact

## Support

For any issues or questions about the Diwali effect, please refer to the documentation files or contact the development team.