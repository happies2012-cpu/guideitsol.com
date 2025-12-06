// PayPal utility functions
export const initializePayPal = (amount: number, currency: string = 'INR') => {
  return new Promise((resolve, reject) => {
    // Check if PayPal is already loaded
    if (typeof (window as any).paypal !== 'undefined') {
      resolve((window as any).paypal);
      return;
    }

    // Load PayPal SDK based on environment
    const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';
    const clientId = isProduction 
      ? import.meta.env.VITE_PAYPAL_CLIENT_ID_PROD || import.meta.env.VITE_PAYPAL_CLIENT_ID
      : import.meta.env.VITE_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_SANDBOX_CLIENT_ID';
      
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.onload = () => resolve((window as any).paypal);
    script.onerror = () => reject(new Error('Failed to load PayPal SDK'));
    document.head.appendChild(script);
  });
};

export const createPayPalOrder = async (amount: number, toolName: string) => {
  try {
    const response = await fetch('/api/paypal/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        toolName: toolName,
      }),
    });
    
    const orderData = await response.json();
    return orderData.id;
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    throw error;
  }
};

export const capturePayPalOrder = async (orderId: string) => {
  try {
    const response = await fetch('/api/paypal/capture-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    });
    
    const captureData = await response.json();
    return captureData;
  } catch (error) {
    console.error('Error capturing PayPal order:', error);
    throw error;
  }
};

export default {
  initializePayPal,
  createPayPalOrder,
  capturePayPalOrder,
};