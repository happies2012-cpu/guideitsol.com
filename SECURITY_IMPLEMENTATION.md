# Website Security Implementation

This document describes the security measures implemented to prevent unauthorized access to website content, including right-click, copy, and inspect functionality.

## Overview

We have implemented multiple layers of security to protect the website content from unauthorized access. These measures work together to provide comprehensive protection against common methods of content theft and inspection.

## Security Layers

### 1. HTML Level Protection

Implemented in `index.html`:
- CSS styles to prevent text selection
- Inline event handlers to block context menu, copy, cut, and paste operations
- Body attributes to prevent selection and context menu

### 2. CSS Protection

Added to `index.html`:
- Global CSS rules to disable text selection across all elements
- Specific rules for images and media elements to prevent dragging
- Vendor-specific prefixes for maximum browser compatibility

### 3. JavaScript Event Blocking

Implemented in `index.html`:
- Keyboard event listeners to block developer tools shortcuts (F12, Ctrl+Shift+I, etc.)
- Context menu event listeners to prevent right-click
- Text selection event listeners to prevent content selection
- Drag and drop event listeners to prevent content dragging

### 4. Developer Tools Detection

Implemented in `index.html`:
- Periodic checks for developer tools by monitoring window dimensions
- Detection of console opening through size changes

### 5. React Application Security

Implemented through:
- `src/services/securityService.ts` - Centralized security service
- `src/hooks/useSecurity.ts` - React hook for easy integration
- `src/main.tsx` - Initialization of security service
- `src/App.tsx` - Usage of security hook in main application component

### 6. Image Protection

Implemented in security service:
- Automatic protection of all images from dragging
- Mutation observer to protect dynamically added images
- Setting draggable attribute to false on all images

## Files Modified

1. `index.html` - Added HTML, CSS, and JavaScript security measures
2. `src/main.tsx` - Integrated security service
3. `src/App.tsx` - Added security hook
4. `src/services/securityService.ts` - Created comprehensive security service
5. `src/hooks/useSecurity.ts` - Created React hook for security integration

## Security Features

### Right-Click Prevention
- Blocks context menu on all elements
- Prevents access to browser context menu

### Copy Prevention
- Blocks text selection across entire document
- Prevents keyboard shortcuts for copying (Ctrl+C)
- Blocks clipboard events (copy, cut, paste)

### Inspect Prevention
- Blocks developer tools shortcuts (F12, Ctrl+Shift+I, Ctrl+U)
- Detects when developer tools are opened
- Blocks refresh shortcuts (F5, Ctrl+R)

### Image Protection
- Prevents image dragging and saving
- Protects both static and dynamically loaded images
- Sets draggable attribute to false

### Text Selection Prevention
- Disables text selection globally
- Blocks select start events
- Prevents keyboard shortcuts for text selection (Ctrl+A)

## Implementation Details

### Security Service
The security service (`src/services/securityService.ts`) provides a centralized approach to security implementation:

1. **Initialization**: `init()` method applies all security measures
2. **Cleanup**: `destroy()` method removes all security measures
3. **CSS Protection**: Applies styles to prevent selection and dragging
4. **Event Listeners**: Adds listeners for context menu, keyboard, and selection events
5. **Developer Tools Detection**: Monitors for developer tools opening
6. **Image Protection**: Protects images from dragging

### React Integration
The React hook (`src/hooks/useSecurity.ts`) provides easy integration with React components:

1. **Automatic Initialization**: Security measures are automatically applied when the hook is used
2. **Cleanup**: Security measures are automatically removed when the component unmounts
3. **Singleton Pattern**: Uses a singleton instance to ensure consistent security state

## Browser Compatibility

The security measures are designed to work across all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## Limitations

It's important to note that client-side security measures can be bypassed by determined users. These measures provide a deterrent but not absolute protection. For sensitive content, server-side protection should also be implemented.

## Testing

To verify the security measures are working:
1. Right-click anywhere on the page - context menu should be blocked
2. Try to select text - text selection should be prevented
3. Try Ctrl+C, Ctrl+V, Ctrl+X - clipboard operations should be blocked
4. Try F12, Ctrl+Shift+I - developer tools should be blocked
5. Try to drag images - images should not be draggable

## Maintenance

When adding new features or components:
1. Ensure they don't conflict with security measures
2. Test security features after implementation
3. Update security service if new protection measures are needed

## Conclusion

These security measures provide comprehensive protection against common methods of unauthorized content access. While they can be bypassed by technical users, they serve as an effective deterrent against casual content theft and unauthorized inspection.