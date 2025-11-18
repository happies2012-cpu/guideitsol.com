// PayU utility functions

export const initializePayU = (amount: number, productInfo: string, firstName: string, email: string) => {
  return new Promise((resolve, reject) => {
    // Check if PayU is already loaded
    if (typeof (window as any).payu !== 'undefined') {
      resolve((window as any).payu);
      return;
    }

    // Load PayU SDK
    const script = document.createElement('script');
    script.src = 'https://secure.payu.in/_payment';
    script.onload = () => resolve((window as any).payu);
    script.onerror = () => reject(new Error('Failed to load PayU SDK'));
    document.head.appendChild(script);
  });
};

export const createPayUOrder = async (amount: number, productInfo: string, firstName: string, email: string, phone: string) => {
  try {
    // In a real implementation, you would call your backend to create a PayU order
    // This is a simplified version for demonstration
    const orderId = 'ORDER_' + Date.now();
    
    return {
      orderId: orderId,
      amount: amount,
      productInfo: productInfo,
      firstName: firstName,
      email: email,
      phone: phone
    };
  } catch (error) {
    console.error('Error creating PayU order:', error);
    throw error;
  }
};

export const generatePayUHash = async (data: any) => {
  try {
    // In a real implementation, this hash should be generated on your backend
    // for security reasons. This is a placeholder implementation.
    const response = await fetch('/api/payu/generate-hash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const hashData = await response.json();
    return hashData.hash;
  } catch (error) {
    console.error('Error generating PayU hash:', error);
    throw error;
  }
};

export const submitPayUPayment = (paymentData: any) => {
  // Create a form and submit to PayU
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = import.meta.env.VITE_PAYU_PAYMENT_URL || 'https://secure.payu.in/_payment';
  
  // Add all payment data as hidden inputs
  Object.keys(paymentData).forEach(key => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = paymentData[key];
    form.appendChild(input);
  });
  
  document.body.appendChild(form);
  form.submit();
};

export default {
  initializePayU,
  createPayUOrder,
  generatePayUHash,
  submitPayUPayment
};