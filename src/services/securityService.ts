/**
 * Security Service for preventing unauthorized access to website content
 * Implements multiple layers of protection against right-click, copy, inspect, etc.
 */

class SecurityService {
  private isActive: boolean = false;
  private cleanupFunctions: Array<() => void> = [];

  /**
   * Initialize all security measures
   */
  public init() {
    if (this.isActive) return;
    
    this.isActive = true;
    
    // Apply CSS styles to prevent selection
    this.applyCSSProtection();
    
    // Add event listeners for various security measures
    this.addEventListeners();
    
    // Monitor for developer tools
    this.monitorDevTools();
    
    // Protect images from dragging
    this.protectImages();
    
    console.log('Security measures initialized');
  }

  /**
   * Apply CSS styles to prevent text selection and right-click
   */
  private applyCSSProtection() {
    const style = document.createElement('style');
    style.innerHTML = `
      body, body * {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
      }
      
      img, picture, video {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
      }
    `;
    
    document.head.appendChild(style);
    this.cleanupFunctions.push(() => document.head.removeChild(style));
  }

  /**
   * Add event listeners for security measures
   */
  private addEventListeners() {
    // Disable context menu (right-click)
    const disableContextMenu = (e: Event) => {
      e.preventDefault();
      return false;
    };
    
    document.addEventListener('contextmenu', disableContextMenu);
    this.cleanupFunctions.push(() => 
      document.removeEventListener('contextmenu', disableContextMenu)
    );
    
    // Disable text selection events
    const disableSelection = (e: Event) => {
      e.preventDefault();
      return false;
    };
    
    document.addEventListener('selectstart', disableSelection);
    document.addEventListener('dragstart', disableSelection);
    this.cleanupFunctions.push(() => {
      document.removeEventListener('selectstart', disableSelection);
      document.removeEventListener('dragstart', disableSelection);
    });
    
    // Disable keyboard shortcuts
    const disableKeyboard = (e: KeyboardEvent) => {
      // List of forbidden key combinations
      const forbiddenKeys = [
        // Developer tools
        { key: 123 }, // F12
        { ctrl: true, shift: true, key: 73 }, // Ctrl+Shift+I
        { ctrl: true, shift: true, key: 74 }, // Ctrl+Shift+J
        { ctrl: true, key: 85 }, // Ctrl+U
        
        // Copy/paste/cut
        { ctrl: true, key: 65 }, // Ctrl+A
        { ctrl: true, key: 67 }, // Ctrl+C
        { ctrl: true, key: 86 }, // Ctrl+V
        { ctrl: true, key: 88 }, // Ctrl+X
        
        // Other potentially harmful keys
        { key: 116 }, // F5 (refresh)
        { ctrl: true, key: 82 }, // Ctrl+R (refresh)
      ];
      
      const isForbidden = forbiddenKeys.some(forbidden => {
        return (
          (forbidden.key === e.keyCode) &&
          (forbidden.ctrl === undefined || forbidden.ctrl === e.ctrlKey) &&
          (forbidden.shift === undefined || forbidden.shift === e.shiftKey)
        );
      });
      
      if (isForbidden) {
        e.preventDefault();
        return false;
      }
    };
    
    document.addEventListener('keydown', disableKeyboard);
    this.cleanupFunctions.push(() => 
      document.removeEventListener('keydown', disableKeyboard)
    );
  }

  /**
   * Monitor for developer tools
   */
  private monitorDevTools() {
    let devtools = {
      open: false,
      orientation: null
    };
    
    const threshold = 160;
    
    const checkDevTools = setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          // Optionally take action when dev tools are detected
          // For example, you could log this event or take other measures
          console.warn('Developer tools detected');
        }
      } else {
        devtools.open = false;
      }
    }, 500);
    
    this.cleanupFunctions.push(() => clearInterval(checkDevTools));
  }

  /**
   * Protect images from being dragged
   */
  private protectImages() {
    // Protect existing images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
      img.addEventListener('dragstart', e => e.preventDefault());
    });
    
    // Watch for new images added to the DOM
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            if ((node as Element).tagName === 'IMG') {
              (node as HTMLImageElement).setAttribute('draggable', 'false');
              (node as HTMLImageElement).addEventListener('dragstart', e => e.preventDefault());
            }
            
            // Also check for images within the added node
            const childImages = (node as Element).querySelectorAll('img');
            childImages.forEach(img => {
              img.setAttribute('draggable', 'false');
              img.addEventListener('dragstart', e => e.preventDefault());
            });
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    this.cleanupFunctions.push(() => observer.disconnect());
  }

  /**
   * Clean up all security measures
   */
  public destroy() {
    if (!this.isActive) return;
    
    // Run all cleanup functions
    this.cleanupFunctions.forEach(cleanup => cleanup());
    
    this.cleanupFunctions = [];
    this.isActive = false;
    
    console.log('Security measures removed');
  }
}

// Create and export a singleton instance
export const securityService = new SecurityService();

// Auto-initialize security measures when the module is imported
securityService.init();