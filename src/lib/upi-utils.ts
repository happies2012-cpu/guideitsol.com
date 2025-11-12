/**
 * UPI Utility Functions
 */

// Mask UPI ID for display (show only first 2 and last 4 digits)
export const maskUpiId = (upiId: string): string => {
  if (!upiId) return '';
  
  const [username, domain] = upiId.split('@');
  if (username.length > 6) {
    return `${username.substring(0, 2)}*****${username.substring(username.length - 4)}@${domain}`;
  } else {
    return `***@${domain}`;
  }
};

// Generate UPI payment link
export const generateUpiLink = (upiId: string, amount: number, name: string, transactionNote?: string): string => {
  const note = transactionNote || `Payment for ${name}`;
  return `upi://pay?pa=${upiId}&pn=Guidesoft&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
};

// Copy text to clipboard
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    return false;
  }
};

// Validate UPI ID format
export const isValidUpiId = (upiId: string): boolean => {
  // Basic UPI ID validation pattern
  const upiPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;
  return upiPattern.test(upiId);
};