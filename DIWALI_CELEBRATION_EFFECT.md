# Diwali Celebration Effect Implementation

## Overview
This document describes the Diwali celebration effect that has been implemented for the Guidesoft website. The effect creates a festive atmosphere with animated particles that represent Diwali lights and fireworks.

## Features
1. **Animated Particles**: Colorful particles that move around the screen representing Diwali lights
2. **Multiple Shapes**: Particles appear as circles, squares, and stars
3. **Automatic Activation**: Effect automatically activates during Diwali season (October 20 - November 5)
4. **Performance Optimized**: Canvas-based rendering with efficient animation loop
5. **Non-Intrusive**: Overlay effect that doesn't interfere with website content

## Implementation Details

### Component: DiwaliCelebrationEffect.tsx
- Located in: `/src/components/DiwaliCelebrationEffect.tsx`
- Uses HTML5 Canvas for rendering
- Implements particle physics for natural movement
- Features three particle shapes: circles, squares, and stars
- Particles have varying colors in warm tones (yellows, oranges, reds)
- Particles gradually fade out for a natural effect

### Integration in App.tsx
- Automatically shown during Diwali season (October 20 - November 5)
- Positioned as a fixed overlay with high z-index
- Uses screen blend mode for better visual integration
- Pointer-events disabled so it doesn't interfere with user interaction

## How to Manually Enable/Disable

### Enable Year-Round:
To show the effect throughout the year, modify the `showDiwaliEffect()` function in App.tsx:

```typescript
// Change this function to always return true
const showDiwaliEffect = () => {
  return true; // Always show
};
```

### Enable via URL Parameter:
Add `?diwali=true` to any URL to temporarily enable the effect:

```
https://yoursite.com/?diwali=true
```

### Enable via localStorage:
Run this JavaScript in the browser console to enable the effect:

```javascript
localStorage.setItem('diwaliEffect', 'true');
```

To disable:
```javascript
localStorage.removeItem('diwaliEffect');
```

And modify the showDiwaliEffect function to check for this:

```typescript
const showDiwaliEffect = () => {
  // Check localStorage
  if (localStorage.getItem('diwaliEffect') === 'true') {
    return true;
  }
  
  // Check URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('diwali') === 'true') {
    return true;
  }
  
  // Check seasonal dates
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  
  return (month === 10 && day >= 20) || (month === 11 && day <= 5);
};
```

## Technical Details

### Particle System
- 150 particles rendered at any time
- Particles have random velocities, sizes, and colors
- Particles gradually fade out over time
- New particles are occasionally added for dynamic effect
- Excess particles are removed to maintain performance

### Performance Considerations
- Canvas is resized on window resize events
- Animation frame is properly canceled on component unmount
- Particles are efficiently updated and rendered
- Semi-transparent background creates trail effect without performance issues

## Customization Options

### Colors
Particle colors are generated in warm tones (yellows, oranges, reds):
```javascript
this.color = `hsl(${Math.random() * 60 + 30}, 100%, ${Math.random() * 30 + 70}%)`;
```

### Shapes
Three shapes are supported:
1. Circles
2. Squares
3. Stars (5-pointed)

### Particle Count
Adjust the particle count by changing:
```javascript
const particleCount = 150;
```

## Files Created
1. `/src/components/DiwaliCelebrationEffect.tsx` - Main component
2. `/DIWALI_CELEBRATION_EFFECT.md` - This documentation file

## Testing
The effect has been tested and verified to:
- Work on all modern browsers
- Not interfere with website functionality
- Maintain good performance
- Automatically activate during Diwali season