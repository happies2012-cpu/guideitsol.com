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

  const loadRazorpay = (): Promise<any> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        resolve((window as any).Razorpay);
      };
      script.onerror = () => {
        toast.error('Failed to load payment gateway. Please try again.');
      };
      document.body.appendChild(script);
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

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_1234567890', // Test key
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
      const orderData = await payuUtils.createPayUOrder(
        amount,
        toolName,
        'Customer',
        'customer@example.com',
        '9999999999'
      );

      // Generate hash for security
      const hashData = {
        txnid: orderData.orderId,
        amount: orderData.amount,
        productinfo: orderData.productInfo,
        firstname: orderData.firstName,
        email: orderData.email
      };

      const hashResponse = await payuUtils.generatePayUHash(hashData);

      // Prepare payment data
      const paymentData = {
        key: hashResponse.key,
        txnid: orderData.orderId,
        amount: orderData.amount,
        productinfo: orderData.productInfo,
        firstname: orderData.firstName,
        email: orderData.email,
        phone: orderData.phone,
        surl: `${window.location.origin}/api/payu/success`,
        furl: `${window.location.origin}/api/payu/failure`,
        hash: hashResponse.hash,
        // Add enrollment ID as UDF field for tracking
        udf1: enrollmentId || ''
      };

      // Submit payment
      payuUtils.submitPayUPayment(paymentData);
    } catch (error) {
      console.error('PayU Payment error:', error);
      toast.error('Failed to initiate PayU payment. Please try again.');
    }
  };

  const handleClose = () => {
    resetPayment();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
        </DialogHeader>
        
        {!paymentVerified ? (
          <div className="space-y-6">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Complete your payment of ₹{amount} to enroll in {toolName}
              </AlertDescription>
            </Alert>
            
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Payment Details</h3>
              <p className="text-sm">Course: {toolName}</p>
              <p className="text-lg font-bold">Amount: ₹{amount}/-</p>
            </div>
            
            {/* Payment Method Selection */}
            <div className="flex space-x-2">
              <Button 
                variant={paymentMethod === 'razorpay' ? 'default' : 'outline'} 
                onClick={() => setPaymentMethod('razorpay')}
                className="flex-1"
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Card/Wallet
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
                  <p className="mt-1">All major cards, UPI, and wallets accepted</p>
                </div>
              </div>
            )}
            
            {/* UPI Payment */}
            {paymentMethod === 'upi' && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pay via UPI</h3>
                  <div className="flex justify-center my-4">
                    <UpiQrCode upiId={upiId} amount={amount} name={toolName} note={`Enrollment for ${toolName}`} />
                  </div>
                  <p className="text-sm mb-2">Or use UPI ID:</p>
                  <p className="font-mono text-center py-2 bg-white rounded">{maskedUpiId}</p>
                  <p className="text-xs text-center mt-2 text-muted-foreground">
                    Amount: ₹{amount}
                  </p>
                </div>
                
                <Button onClick={handleUPIPayment} className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Open UPI App
                </Button>
                
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
                  <p className="text-sm mb-4">Complete your payment of ₹{amount} using your PayPal account</p>
                  
                  <div className="flex justify-center">
                    <div>
                      <style>{`.pp-JRBG2VWXUBBVL{text-align:center;border:none;border-radius:0.25rem;min-width:11.625rem;padding:0 2rem;height:2.625rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer;}`}</style>
                      <form action="https://www.sandbox.paypal.com/ncp/payment/JRBG2VWXUBBVL" method="post" target="_blank" style={{display:'inline-grid',justifyItems:'center',alignContent:'start',gap:'0.5rem'}}>
                        <input className="pp-JRBG2VWXUBBVL" type="submit" value="Buy Now" />
                        <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
                        <section style={{fontSize: '0.75rem'}}> Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style={{height:'0.875rem',verticalAlign:'middle'}}/></section>
                      </form>
                    </div>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Secure payment powered by PayPal</p>
                </div>
              </div>
            )}
            {/* PayPal Payment */}
            {paymentMethod === 'paypal' && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">Pay with PayPal</h3>
                  <p className="text-sm mb-4">Complete your payment of ₹{amount} using your PayPal account</p>
                  
                  <div className="flex justify-center">
                    <div>
                      <style>{`.pp-JRBG2VWXUBBVL{text-align:center;border:none;border-radius:0.25rem;min-width:11.625rem;padding:0 2rem;height:2.625rem;font-weight:bold;background-color:#FFD140;color:#000000;font-family:"Helvetica Neue",Arial,sans-serif;font-size:1rem;line-height:1.25rem;cursor:pointer;}`}</style>
                      <form action="https://www.sandbox.paypal.com/ncp/payment/JRBG2VWXUBBVL" method="post" target="_blank" style={{display:'inline-grid',justifyItems:'center',alignContent:'start',gap:'0.5rem'}}>
                        <input className="pp-JRBG2VWXUBBVL" type="submit" value="Buy Now" />
                        <img src="https://www.paypalobjects.com/images/Debit_Credit_APM.svg" alt="cards" />
                        <section style={{fontSize: '0.75rem'}}> Powered by <img src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-wordmark-color.svg" alt="paypal" style={{height:'0.875rem',verticalAlign:'middle'}}/></section>
                      </form>
                    </div>
                  </div>
                </div>
                
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