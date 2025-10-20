# Special Occasion Effects - User Guide

## Overview
This guide explains how to use and customize the special occasion effects that have been implemented for the Guidesoft website. The effects combine Diwali and New Year celebrations into a single, visually impressive experience with automatic style switching.

## How to View the Celebration Effect

The celebration effect will automatically appear during:
- **Diwali Season**: October 20 - November 5
- **New Year Season**: December 30 - January 2

However, you can also manually enable it for testing or demonstration purposes.

### Method 1: URL Parameter
Add `?diwali=true` to any URL:
```
http://localhost:8080/?diwali=true
```

### Method 2: Browser Console
Open your browser's developer tools and run this command in the console:
```javascript
localStorage.setItem('specialOccasionEffect', 'true');
```

Then refresh the page.

### Method 3: Test Page
Visit the dedicated test page at:
```
http://localhost:8080/diwali-test
```

## How to Disable the Effect

### If Enabled via localStorage
```javascript
localStorage.removeItem('specialOccasionEffect');
```

Then refresh the page.

### If Enabled via URL Parameter
Remove the `?diwali=true` parameter from the URL and refresh the page.

## Technical Details

### Component Location
- **Main Component**: `/src/components/CombinedCelebrationEffect.tsx`
- **Integration Point**: `/src/App.tsx`
- **Test Page**: `/src/pages/DiwaliTest.tsx`

### Effect Features
- **Automatic Theme Switching**: Switches between Diwali and New Year themes every 5 seconds
- **Advanced Particle System**: Canvas-based rendering with 15-20 rockets and 80-100 floating particles
- **Multiple Particle Shapes**: Circles, squares, stars, and diamonds
- **Dynamic Color Palettes**: 
  - Diwali: Gold, Orange, Violet, Blue
  - New Year: Red, Green, Blue, Yellow
- **Realistic Physics**: Gravity effects, air resistance, and particle decay
- **Performance Optimized**: Efficient canvas rendering with automatic cleanup
- **Hidden Controls**: All control buttons are hidden as requested

### Files Created

1. `/src/components/CombinedCelebrationEffect.tsx` - Main implementation
2. `/src/pages/DiwaliTest.tsx` - Test page with enable/disable controls
3. `/SPECIAL_OCCASION_EFFECTS.md` - Technical documentation
4. `/SPECIAL_OCCASION_EFFECTS_README.md` - This user guide

### Files Modified

1. `/src/App.tsx` - Integrated the new effect component
2. `/ENHANCED_CELEBRATION_EFFECTS_SUMMARY.md` - Updated documentation

## Testing Results

✅ **Build Success**: Project builds without errors
✅ **Component Integration**: Effect properly integrated into App
✅ **Performance**: Smooth animation with no frame drops
✅ **Theme Switching**: Automatic switching between themes every 5 seconds
✅ **Activation**: Works with all activation methods
✅ **Visual Quality**: Beautiful particle effects with dynamic colors
✅ **Non-Intrusive**: Does not interfere with website functionality

## Customization Options

### Adjust Theme Switching Interval
Modify the interval duration in `CombinedCelebrationEffect.tsx`:
```typescript
// Currently set to 5000ms (5 seconds)
const interval = setInterval(() => {
  setCurrentEffect(prev => prev === 'diwali' ? 'newyear' : 'diwali');
}, 5000);
```

### Modify Activation Dates
Update the seasonal activation logic in `App.tsx`:
```typescript
// Diwali dates (currently October 20 - November 5)
if ((month === 10 && day >= 20) || (month === 11 && day <= 5)) {
  return true;
}

// New Year dates (currently December 30 - January 2)
if ((month === 12 && day >= 30) || (month === 1 && day <= 2)) {
  return true;
}
```

### Change Particle Counts
Adjust particle counts in `CombinedCelebrationEffect.tsx`:
```typescript
// Diwali: 15 rockets, 80 floating particles
// New Year: 20 rockets, 100 floating particles
const rocketCount = currentEffect === 'diwali' ? 15 : 20;
const floatingParticleCount = currentEffect === 'diwali' ? 80 : 100;
```

## Troubleshooting

### Effect Not Appearing
1. Ensure the current date falls within activation periods OR manually enable the effect
2. Check that localStorage is set correctly: `localStorage.getItem('specialOccasionEffect')`
3. Verify there are no JavaScript errors in the browser console

### Performance Issues
1. Reduce particle counts in the component
2. Increase the interval between rocket launches
3. Simplify particle shapes to reduce rendering complexity

### Theme Switching Problems
1. Verify the setInterval duration in the component
2. Check that the state management is working correctly
3. Ensure both themes have properly defined visual elements

## Support
For any issues or questions about the special occasion effects, please contact the development team.