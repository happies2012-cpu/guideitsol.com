import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

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

  const resetPayment = () => {
    setPaymentVerified(false);
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