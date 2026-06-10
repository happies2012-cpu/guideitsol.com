// Cashfree Payment Gateway Integration
// Environment: Vite + React + TypeScript

interface CashfreeConfig {
  env: 'sandbox' | 'production';
  clientId: string;
  clientSecret: string;
}

interface CashfreeOrderRequest {
  orderId: string;
  orderAmount: number;
  orderCurrency: string;
  orderNote?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl?: string;
  notifyUrl?: string;
}

interface CashfreeOrderResponse {
  cfOrderId: string;
  orderId: string;
  orderAmount: string;
  orderStatus: 'ACTIVE' | 'PAID' | 'EXPIRED' | 'CANCELLED';
  paymentLink?: string;
  createdAt: string;
}

interface CashfreeVerificationRequest {
  orderId: string;
  orderAmount: string;
}

interface CashfreeVerificationResponse {
  orderId: string;
  orderAmount: string;
  orderStatus: 'PAID' | 'NOT_PAID';
  referenceId: string;
  txTime: string;
}

// Initialize Cashfree configuration
const getConfig = (): CashfreeConfig => {
  const isProduction = import.meta.env.PROD;
  return {
    env: isProduction ? 'production' : 'sandbox',
    clientId: import.meta.env.VITE_CASHFREE_CLIENT_ID || '',
    clientSecret: import.meta.env.VITE_CASHFREE_CLIENT_SECRET || '',
  };
};

// Get the base API URL
const getBaseUrl = (): string => {
  const config = getConfig();
  return config.env === 'production'
    ? 'https://api.cashfree.com/api/v2'
    : 'https://sandbox.cashfree.com/api/v2';
};

// Generate a unique order ID
export const generateOrderId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `GS_${timestamp}_${random}`;
};

// Create a new order
export const createCashfreeOrder = async (
  orderData: CashfreeOrderRequest
): Promise<CashfreeOrderResponse> => {
  const config = getConfig();
  
  const response = await fetch(`${getBaseUrl()}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': config.clientId,
      'x-client-secret': config.clientSecret,
      'x-api-version': '2023-08-01',
    },
    body: JSON.stringify({
      order_id: orderData.orderId,
      order_amount: orderData.orderAmount,
      order_currency: orderData.orderCurrency,
      order_note: orderData.orderNote,
      customer_details: {
        customer_id: `cust_${orderData.customerEmail.replace(/[^a-zA-Z0-9]/g, '')}`,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_name: orderData.customerName,
      },
      return_url: orderData.returnUrl,
      notify_url: orderData.notifyUrl,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create order');
  }

  return response.json();
};

// Get order details
export const getCashfreeOrder = async (
  orderId: string
): Promise<CashfreeOrderResponse> => {
  const config = getConfig();

  const response = await fetch(`${getBaseUrl()}/orders/${orderId}`, {
    method: 'GET',
    headers: {
      'x-client-id': config.clientId,
      'x-client-secret': config.clientSecret,
      'x-api-version': '2023-08-01',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get order');
  }

  return response.json();
};

// Verify payment
export const verifyCashfreePayment = async (
  verificationData: CashfreeVerificationRequest
): Promise<CashfreeVerificationResponse> => {
  const config = getConfig();

  const response = await fetch(`${getBaseUrl()}/orders/${verificationData.orderId}/verification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': config.clientId,
      'x-client-secret': config.clientSecret,
      'x-api-version': '2023-08-01',
    },
    body: JSON.stringify({
      order_amount: verificationData.orderAmount,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to verify payment');
  }

  return response.json();
};

// Get payment link (for UPI/QR payments)
export const getPaymentLink = async (
  orderData: CashfreeOrderRequest
): Promise<{ link: string }> => {
  const config = getConfig();

  const response = await fetch(`${getBaseUrl()}/orders/create/link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': config.clientId,
      'x-client-secret': config.clientSecret,
      'x-api-version': '2023-08-01',
    },
    body: JSON.stringify({
      return_url: orderData.returnUrl,
      notify_url: orderData.notifyUrl,
      order_id: orderData.orderId,
      order_amount: orderData.orderAmount,
      order_currency: orderData.orderCurrency,
      order_note: orderData.orderNote,
      customer_details: {
        customer_id: `cust_${orderData.customerEmail.replace(/[^a-zA-Z0-9]/g, '')}`,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        customer_name: orderData.customerName,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to create payment link');
  }

  const data = await response.json();
  return { link: data.url };
};

// Refund an order
export const refundCashfreeOrder = async (
  orderId: string,
  refundAmount: number,
  refundId?: string
): Promise<{ refundId: string; status: string }> => {
  const config = getConfig();

  const response = await fetch(`${getBaseUrl()}/refunds`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-client-id': config.clientId,
      'x-client-secret': config.clientSecret,
      'x-api-version': '2023-08-01',
    },
    body: JSON.stringify({
      refund_id: refundId || `refund_${Date.now()}`,
      order_id: orderId,
      refund_amount: refundAmount,
      refund_currency: 'INR',
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to process refund');
  }

  return response.json();
};

// UPI Payment Helper
export const initiateUPIPayment = async (
  orderData: CashfreeOrderRequest
): Promise<{ upiLink: string }> => {
  const orderId = generateOrderId();
  const order = await createCashfreeOrder({
    ...orderData,
    orderId,
    orderCurrency: 'INR',
  });

  // For UPI, you can use the payment link or initiate via UPI deep link
  const upiLink = `upi://pay?pa=merchant@cashfree&pn=GS%20Intelligence&tr=${orderId}&am=${orderData.orderAmount}&cu=INR`;
  
  return { upiLink };
};

// Get UPI QR Code URL
export const getUPIQRCode = async (
  orderData: CashfreeOrderRequest
): Promise<{ qrCodeUrl: string }> => {
  const config = getConfig();
  const orderId = generateOrderId();

  const response = await fetch(`${getBaseUrl()}/orders/${orderId}/qr-code`, {
    method: 'GET',
    headers: {
      'x-client-id': config.clientId,
      'x-client-secret': config.clientSecret,
      'x-api-version': '2023-08-01',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to get QR code');
  }

  return response.json();
};

// Export types
export type {
  CashfreeConfig,
  CashfreeOrderRequest,
  CashfreeOrderResponse,
  CashfreeVerificationRequest,
  CashfreeVerificationResponse,
};

// Default export
export default {
  createOrder: createCashfreeOrder,
  getOrder: getCashfreeOrder,
  verifyPayment: verifyCashfreePayment,
  getPaymentLink,
  initiateUPIPayment,
  getUPIQRCode,
  refund: refundCashfreeOrder,
  generateOrderId,
};