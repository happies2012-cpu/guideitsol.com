import axios from 'axios';

// PayU utility functions

export const initializePayU = (amount: number, productInfo: string, firstName: string, email: string) => {
  return new Promise((resolve, reject) => {
    // Check if PayU is already loaded
    if (typeof (window as any).payu !== 'undefined') {
      resolve((window as any).payu);
      return;
    }

    // Load PayU SDK based on environment
    const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';
    const script = document.createElement('script');
    script.src = isProduction 
      ? 'https://secure.payu.in/_payment' 
      : 'https://test.payu.in/_payment';
    script.onload = () => resolve((window as any).payu);
    script.onerror = () => reject(new Error('Failed to load PayU SDK'));
    document.head.appendChild(script);
  });
};

export const createPayUOrder = async (amount: number, productInfo: string, firstName: string, email: string, phone: string, userId?: string) => {
  try {
    const response = await axios.post('/api/payu-v2/create-order', {
      amount,
      productinfo: productInfo,
      firstname: firstName,
      email,
      phone,
      udf1: userId || ''
    });
    
    if (response.data.success) {
      return response.data; // contains orderId, order
    } else {
      throw new Error(response.data.error || 'Failed to create order');
    }
  } catch (error) {
    console.error('Error creating PayU order:', error);
    throw error;
  }
};

export const generatePayUHash = async (data: any) => {
  // In V2 flow, hash is generated during initiate-payment call
  // Keeping this for backward compatibility if needed, but returning null
  return null;
};

export const initiatePayUPayment = async (orderId: string, amount: number, productInfo: string, firstName: string, email: string, phone: string) => {
    try {
        const response = await axios.post('/api/payu-v2/initiate-payment', {
            orderId,
            amount,
            productinfo: productInfo,
            firstname: firstName,
            email,
            phone
        });

        if (response.data.success) {
            // Submit form
            submitPayUPayment(response.data.paymentData, response.data.payuUrl);
            return response.data;
        } else {
            throw new Error(response.data.error || 'Failed to initiate payment');
        }
    } catch (error) {
        console.error('Error initiating PayU payment:', error);
        throw error;
    }
}

export const submitPayUPayment = (paymentData: any, actionUrl?: string) => {
  // Create a form and submit to PayU
  const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = actionUrl || (isProduction 
    ? 'https://secure.payu.in/_payment' 
    : 'https://test.payu.in/_payment');
  
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
  initiatePayUPayment,
  submitPayUPayment
};
