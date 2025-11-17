import { useEffect } from 'react';
import { securityService } from '@/services/securityService';

/**
 * React hook for initializing security measures
 * This hook should be used in the main App component
 */
export const useSecurity = () => {
  useEffect(() => {
    // Initialize security service
    securityService.init();

    // Cleanup function
    return () => {
      securityService.destroy();
    };
  }, []);
};