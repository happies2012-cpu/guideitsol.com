import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QRCodeSVG } from "qrcode.react";
import { 
  CreditCard, 
  Smartphone, 
  CheckCircle, 
  Loader2,
  AlertCircle,
  Copy,
  Check,
  ArrowRight,
  Lock,
  Shield
} from "lucide-react";

interface PaymentComponentProps {
  amount: number;
  description: string;
  onSuccess: (transactionId: string) => void;
  onError: (error: string) => void;
  onClose?: () => void;
}

export default function PaymentComponent({
  amount,
  description,
  onSuccess,
  onError,
  onClose
}: PaymentComponentProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success' | 'error'>('form');
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [copied, setCopied] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  // UPI State
  const [upiId, setUpIId] = useState('gsintelligence@cashfree');
  const [showQR, setShowQR] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUPIPayment = async () => {
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setStep('success');
      onSuccess(transactionId);
    }, 2000);
  };

  const handleCardPayment = async () => {
    setStep('processing');
    
    // Simulate card payment
    setTimeout(() => {
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setStep('success');
      onSuccess(transactionId);
    }, 3000);
  };

  const handleRetry = () => {
    setStep('form');
  };

  if (step === 'processing') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-muted-foreground text-center">
              Please wait while we process your payment...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'success') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
            <p className="text-muted-foreground text-center mb-4">
              Your payment of ₹{amount} has been processed successfully.
            </p>
            <div className="bg-muted rounded-lg p-3 w-full text-center">
              <p className="text-sm text-muted-foreground">Transaction ID</p>
              <p className="font-mono text-sm font-semibold">TXN_{Date.now()}</p>
            </div>
            <Button className="w-full mt-6 btn-primary" onClick={onClose}>
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (step === 'error') {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Payment Failed</h3>
            <p className="text-muted-foreground text-center mb-4">
              Something went wrong. Please try again.
            </p>
            <Button className="w-full btn-primary" onClick={handleRetry}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Complete Payment</span>
          <Badge className="bg-primary/20 text-primary">₹{amount}</Badge>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Security Badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <Shield className="w-4 h-4 text-green-500" />
          <span>Secured by Cashfree</span>
          <Lock className="w-4 h-4 ml-auto" />
        </div>

        <Tabs defaultValue="upi" onValueChange={(v) => setSelectedMethod(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upi" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              UPI
            </TabsTrigger>
            <TabsTrigger value="card" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Card
            </TabsTrigger>
            <TabsTrigger value="netbanking" className="flex items-center gap-2">
              <ArrowRight className="w-4 h-4" />
              Net Banking
            </TabsTrigger>
          </TabsList>

          {/* UPI Tab */}
          <TabsContent value="upi" className="space-y-4 mt-4">
            {/* Customer Details */}
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* UPI ID */}
            <div className="space-y-3">
              <Label>Pay using UPI ID</Label>
              <div className="flex gap-2">
                <Input
                  value={upiId}
                  onChange={(e) => setUpIId(e.target.value)}
                  placeholder="yourname@upi"
                />
                <Button variant="outline" onClick={handleCopyUPI} className="px-3">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* QR Code */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowQR(!showQR)}
              >
                {showQR ? 'Hide' : 'Show'} QR Code
              </Button>
              
              {showQR && (
                <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                  <QRCodeSVG
                    value={`upi://pay?pa=${upiId}&pn=GS%20Intelligence&am=${amount}&cu=INR&mode=04`}
                    size={200}
                    level="M"
                    includeMargin
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Scan QR code with any UPI app
                  </p>
                </div>
              )}
            </div>

            {/* UPI Apps */}
            <div className="grid grid-cols-4 gap-2">
              {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map((app) => (
                <Button
                  key={app}
                  variant="outline"
                  className="h-12 text-xs"
                  onClick={handleUPIPayment}
                >
                  {app}
                </Button>
              ))}
            </div>

            <Button className="w-full btn-primary" onClick={handleUPIPayment}>
              Pay ₹{amount} via UPI
            </Button>
          </TabsContent>

          {/* Card Tab */}
          <TabsContent value="card" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label>Card Number</Label>
                <Input placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Expiry</Label>
                  <Input placeholder="MM/YY" />
                </div>
                <div>
                  <Label>CVV</Label>
                  <Input placeholder="123" type="password" />
                </div>
              </div>
              <div>
                <Label>Cardholder Name</Label>
                <Input placeholder="Name on card" />
              </div>
            </div>
            <Button className="w-full btn-primary" onClick={handleCardPayment}>
              Pay ₹{amount}
            </Button>
          </TabsContent>

          {/* Net Banking Tab */}
          <TabsContent value="netbanking" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-2">
              {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map((bank) => (
                <Button
                  key={bank}
                  variant="outline"
                  className="h-12"
                  onClick={handleCardPayment}
                >
                  {bank}
                </Button>
              ))}
            </div>
            <Button className="w-full btn-primary" onClick={handleCardPayment}>
              Pay ₹{amount} via Net Banking
            </Button>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>By proceeding, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </CardContent>
    </Card>
  );
}