import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, CreditCard, QrCode, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { maskUpiId, generateUpiLink, copyToClipboard } from '@/lib/upi-utils';
import UpiQrCode from '@/components/UpiQrCode';
import * as payuUtils from '@/lib/payu-utils';

interface PaymentComponentProps {
  toolName: string;
  amount: number;
  enrollmentId?: string;
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: (transactionId?: string) => void;
}

const PaymentComponent: React.FC<PaymentComponentProps> = ({ 
  toolName, 
  amount, 
  enrollmentId,
  isOpen, 
  onClose, 
  onPaymentSuccess 
}) => {
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'upi' | 'paypal' | 'payu'>('payu');
  const [upiId] = useState(import.meta.env.VITE_UPI_ID || '8884162999@ybl'); // Get from env or use default
  const [maskedUpiId, setMaskedUpiId] = useState('');

  // Mask the UPI ID for display
  useEffect(() => {
    setMaskedUpiId(maskUpiId(upiId));
  }, [upiId]);

  // Load external scripts
  const loadRazorpay = async () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve((window as any).Razorpay);
      };
      script.onerror = () => {
        reject(new Error('Failed to load Razorpay SDK'));
      };
      document.head.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    try {
      // Load Razorpay script if not already loaded
      const Razorpay = (window as any).Razorpay || await loadRazorpay();
      
      if (!Razorpay) {
        toast.error('Payment gateway is not available. Please try again.');
        return;
      }

      // Use test key for development, production key for production
      const isProduction = import.meta.env.PROD;
      const razorpayKeyId = isProduction 
        ? import.meta.env.VITE_RAZORPAY_KEY_ID_PROD 
        : import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890';

      const options = {
        key: razorpayKeyId,
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "Guidesoft",
        description: `Enrollment for ${toolName}`,
        image: "/guidesoft-favicon.png",
        handler: function (response: any) {
          // Payment successful
          setPaymentVerified(true);
          toast.success('Payment successful!');
          setTimeout(() => {
            onPaymentSuccess(response.razorpay_payment_id);
            onClose();
          }, 1500);
        },
        prefill: {
          name: "",
          email: "",
          contact: ""
        },
        notes: {
          toolName: toolName,
          amount: amount,
          enrollmentId: enrollmentId
        },
        theme: {
          color: "#3B82F6"
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Failed to initiate payment. Please try again.');
    }
  };

  const handleUPIPayment = () => {
    // Create UPI payment link
    const upiLink = generateUpiLink(upiId, amount, toolName, `Enrollment for ${toolName}`);
    
    // Try to open UPI app directly
    window.open(upiLink, '_blank');
    
    // Show instructions for manual payment
    toast.info('If UPI app did not open, please pay manually using the UPI ID shown below', {
      duration: 10000
    });
  };

  const resetPayment = () => {
    setPaymentVerified(false);
  };

  const handlePayUPayment = async () => {
    try {
      // Create PayU order
      const orderResponse = await payuUtils.createPayUOrder(
        amount,
        toolName,
        'Customer', // TODO: Get from auth context
        'customer@example.com', // TODO: Get from auth context
        '9999999999', // TODO: Get from auth context
        enrollmentId
      );

      // Initiate payment (generates hash and submits form)
      await payuUtils.initiatePayUPayment(
        orderResponse.orderId,
        amount,
        toolName,
        'Customer',
        'customer@example.com',
        '9999999999'
      );
      
    } catch (error) {
      console.error('PayU payment error:', error);
      toast.error('Failed to initiate PayU payment. Please try again.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>
        
        {!paymentVerified ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Button 
                variant={paymentMethod === 'razorpay' ? 'default' : 'outline'} 
                onClick={() => setPaymentMethod('razorpay')}
                className="flex-1"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Razorpay
              </Button>
              <Button 
                variant={paymentMethod === 'upi' ? 'default' : 'outline'} 
                onClick={() => setPaymentMethod('upi')}
                className="flex-1"
              >
                <QrCode className="h-4 w-4 mr-2" />
                UPI/GPay
              </Button>
              <Button 
                variant={paymentMethod === 'paypal' ? 'default' : 'outline'} 
                onClick={() => setPaymentMethod('paypal')}
                className="flex-1"
              >
                <Wallet className="h-4 w-4 mr-2" />
                PayPal
              </Button>
              <Button 
                variant={paymentMethod === 'payu' ? 'default' : 'outline'} 
                onClick={() => setPaymentMethod('payu')}
                className="flex-1"
              >
                <Wallet className="h-4 w-4 mr-2" />
                PayU
              </Button>
            </div>
            
            {/* Razorpay Payment */}
            {paymentMethod === 'razorpay' && (
              <div className="space-y-4">
                <Button onClick={handleRazorpayPayment} className="w-full">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay with Razorpay
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure payment powered by Razorpay</p>
                </div>
              </div>
            )}
            
            {/* UPI Payment */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pay with UPI</h3>
                  <p className="text-sm mb-4">Scan the QR code or pay manually using the UPI ID</p>
                  
                  <div className="flex justify-center my-4">
                    <UpiQrCode upiId={upiId} amount={amount} toolName={toolName} />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium">UPI ID:</p>
                    <p className="font-mono text-lg">{maskedUpiId}</p>
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  onClick={async () => {
                    // Copy UPI ID to clipboard
                    const success = await copyToClipboard(upiId);
                    if (success) {
                      toast.success('UPI ID copied to clipboard');
                    } else {
                      toast.error('Failed to copy UPI ID');
                    }
                  }}
                  className="w-full"
                >
                  Copy UPI ID
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>After payment, please click the button below to confirm</p>
                </div>
                
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    setPaymentVerified(true);
                    toast.success('Payment marked as successful! Please wait for verification.');
                    setTimeout(() => {
                      onPaymentSuccess('UPI_MANUAL');
                      onClose();
                    }, 1500);
                  }}
                  className="w-full"
                >
                  I've Paid via UPI
                </Button>
              </div>
            )}
            
            {/* PayPal Payment */}
            {paymentMethod === 'paypal' && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pay with PayPal</h3>
                  <p className="text-sm mb-4">Complete your payment of ₹{amount} using PayPal</p>
                  
                  <div className="flex justify-center my-4">
                    <div className="bg-white p-2 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" className="h-8">
                        <path fill="#253b80" d="M1.252 20.502c-.176-.384-.305-.807-.374-1.252-.145-.93.056-1.85.568-2.635 1.597-2.44 5.29-5.93 8.24-8.174.347-.263.764-.42.955-.42.264 0 .374.13.44.417.08.35.102.703.066 1.053-.04.39-.13.77-.266 1.13-.69 1.84-2.2 4.92-2.2 7.26 0 1.09.31 1.86.92 2.33.58.45 1.36.68 2.33.68 1.76 0 3.1-.7 3.99-2.1.44-.69.66-1.5.66-2.44 0-.55-.07-1.08-.2-1.58-.16-.61-.45-1.17-.85-1.66-.34-.42-.56-.74-.56-.95 0-.14.08-.26.23-.37.35-.25.88-.24 1.23.02.69.51 1.04 1.25 1.04 2.22 0 .79-.2 1.53-.59 2.22-.79 1.39-2.25 2.46-4.36 3.2-1.21.42-2.5.64-3.86.64-1.29 0-2.52-.19-3.66-.56-1.44-.46-2.73-1.23-3.82-2.3-.7-.69-1.26-1.53-1.67-2.51zm20.654-7.21c-.1-.48-.38-.91-.8-1.25-.42-.34-.94-.51-1.54-.51-.84 0-1.54.33-2.08.99-.55.66-.82 1.57-.82 2.73 0 .74.13 1.42.38 2.03.25.61.62 1.13 1.1 1.55.48.42 1.06.74 1.73.96.67.22 1.4.33 2.19.33.7 0 1.35-.09 1.94-.28.59-.19 1.11-.46 1.55-.82.44-.36.78-.8.99-1.33.21-.53.32-1.11.32-1.75 0-.46-.06-.9-.17-1.32-.11-.42-.28-.81-.5-1.16-.22-.35-.5-.65-.83-.89-.33-.24-.72-.42-1.15-.54-.43-.12-.9-.18-1.4-.18-.35 0-.69.03-1.02.09-.33.06-.64.15-.93.27-.29.12-.55.27-.78.45-.23.18-.42.39-.57.63-.15.24-.26.51-.33.8-.07.29-.1.6-.1.93 0 .26.02.51.06.75.04.24.1.47.18.69.08.22.18.42.3.6.12.18.26.34.42.48.16.14.34.25.54.33.2.08.42.12.66.12.32 0 .6-.06.84-.18.24-.12.44-.28.6-.48.16-.2.28-.44.36-.72.08-.28.12-.58.12-.9 0-.2-.01-.39-.04-.57-.03-.18-.08-.35-.15-.51-.07-.16-.16-.3-.27-.42-.11-.12-.24-.22-.39-.3-.15-.08-.32-.14-.51-.18-.19-.04-.39-.06-.6-.06-.16 0-.31.01-.45.04-.14.03-.27.07-.39.12-.12.05-.23.12-.33.2-.1.08-.18.17-.25.27-.07.1-.13.22-.17.35-.04.13-.06.27-.06.42 0 .22.04.42.11.6.07.18.17.34.3.48.13.14.29.25.48.33.19.08.4.12.63.12.18 0 .35-.03.5-.09.15-.06.28-.14.39-.24.11-.1.2-.22.27-.36.07-.14.12-.29.15-.45.03-.16.05-.33.05-.51 0-.14-.01-.27-.03-.39-.02-.12-.05-.23-.09-.33-.04-.1-.09-.19-.15-.27-.06-.08-.13-.15-.21-.21-.08-.06-.17-.11-.27-.15-.1-.04-.21-.06-.33-.06-.14 0-.27.02-.39.06-.12.04-.23.09-.33.15-.1.06-.19.14-.27.24-.08.1-.14.21-.18.33-.04.12-.06.25-.06.39 0 .16.02.31.06.45.04.14.1.27.18.39.08.12.18.22.3.3.12.08.25.14.4.18.15.04.3.06.46.06.2 0 .38-.03.55-.09.17-.06.32-.14.45-.24.13-.1.24-.22.33-.36.09-.14.16-.29.21-.45.05-.16.07-.33.07-.51 0-.2-.02-.39-.06-.57-.04-.18-.1-.35-.18-.51-.08-.16-.18-.3-.3-.42-.12-.12-.26-.22-.42-.3-.16-.08-.33-.14-.52-.18-.19-.04-.39-.06-.6-.06z"/>
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground mb-4">
                    Secure online payment
                  </p>
                </div>
                
                <Button 
                  onClick={() => {
                    // In a real implementation, this would integrate with PayPal
                    toast.success('Redirecting to PayPal...');
                    setTimeout(() => {
                      setPaymentVerified(true);
                      toast.success('Payment successful!');
                      setTimeout(() => {
                        onPaymentSuccess('PAYPAL_DEMO');
                        onClose();
                      }, 1500);
                    }, 1500);
                  }} 
                  className="w-full"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  Pay with PayPal
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure payment powered by PayPal</p>
                </div>
              </div>
            )}
            
            {/* PayU Payment */}
            {paymentMethod === 'payu' && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pay with PayU</h3>
                  <p className="text-sm mb-4">Complete your payment of ₹{amount} using PayU</p>
                  
                  <div className="flex justify-center my-4">
                    <div className="bg-white p-2 rounded">
                      <img src="https://payu.in/assets/images/payu-logo.svg" alt="PayU" className="h-8" />
                    </div>
                  </div>
                  
                  <p className="text-xs text-center text-muted-foreground mb-4">
                    India's leading payment gateway provider
                  </p>
                </div>
                
                <Button onClick={handlePayUPayment} className="w-full">
                  <Wallet className="h-4 w-4 mr-2" />
                  Pay with PayU
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure payment powered by PayU</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground mb-4">
              You now have access to {toolName}
            </p>
            <Button onClick={onClose} className="w-full">
              Continue to Tool
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentComponent;