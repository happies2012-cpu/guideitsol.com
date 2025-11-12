import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import PaymentComponent from '@/components/PaymentComponent';
import { aiEnrollmentsAPI } from '@/lib/api';

interface EnrollFormProps {
  toolId: string;
  toolName: string;
  isOpen: boolean;
  onClose: () => void;
  onEnrollSuccess: () => void;
}

const EnrollForm: React.FC<EnrollFormProps> = ({ toolId, toolName, isOpen, onClose, onEnrollSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    aadhar: '',
    pan: '',
    message: ''
  });
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationError, setVerificationError] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationError('');
    
    try {
      // Validate Aadhar (12 digits)
      if (formData.aadhar.length !== 12 || !/^\d+$/.test(formData.aadhar)) {
        throw new Error('Aadhar must be a 12-digit number');
      }

      // Validate PAN (10 characters: 5 letters, 4 digits, 1 letter)
      if (formData.pan.length !== 10 || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(formData.pan)) {
        throw new Error('PAN must be 10 characters: 5 letters, 4 digits, 1 letter');
      }

      // Create enrollment first
      const enrollmentData = {
        toolId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin || undefined,
        aadhar: formData.aadhar,
        pan: formData.pan.toUpperCase(),
        message: formData.message || undefined
      };

      const response = await aiEnrollmentsAPI.create(enrollmentData);
      setEnrollmentId(response.data.id);
      
      // Simulate verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mark as verified
      await aiEnrollmentsAPI.verify(response.data.id);
      
      setIsVerified(true);
      toast.success('Verification successful!');
    } catch (error: any) {
      setVerificationError(error.response?.data?.error || error.message || 'Verification failed. Please try again.');
      console.error('Verification error:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePaymentSuccess = async (transactionId?: string) => {
    try {
      // Update payment status
      await aiEnrollmentsAPI.updatePayment(enrollmentId, transactionId);
      onEnrollSuccess();
      toast.success('Payment successful! You now have access to the tool.');
    } catch (error) {
      console.error('Payment update error:', error);
      toast.error('Failed to update payment status');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      aadhar: '',
      pan: '',
      message: ''
    });
    setIsVerified(false);
    setVerificationError('');
    setShowPayment(false);
    setEnrollmentId('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showPayment} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Enroll in {toolName}</DialogTitle>
          </DialogHeader>
          
          {!isVerified ? (
            <div className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Please verify your identity with Aadhar and PAN to enroll in this course.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aadhar">Aadhar Number</Label>
                <Input
                  id="aadhar"
                  name="aadhar"
                  value={formData.aadhar}
                  onChange={handleInputChange}
                  placeholder="Enter 12-digit Aadhar number"
                  maxLength={12}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pan">PAN Number</Label>
                <Input
                  id="pan"
                  name="pan"
                  value={formData.pan}
                  onChange={handleInputChange}
                  placeholder="Enter 10-character PAN number"
                  maxLength={10}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message (Optional)</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Any additional information"
                />
              </div>
              
              {verificationError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{verificationError}</AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={handleVerify} 
                disabled={isVerifying || !formData.name || !formData.email || !formData.phone}
                className="w-full"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Identity'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  Identity verified successfully! Please proceed with payment to access {toolName}.
                </AlertDescription>
              </Alert>
              
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Payment Details</h3>
                <p className="text-sm">Course: {toolName}</p>
                <p className="text-lg font-bold">Amount: ₹499/-</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <Button 
                  onClick={() => setShowPayment(true)} 
                  className="w-full"
                >
                  Proceed to Payment
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setIsVerified(false)}
                >
                  Edit Information
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <PaymentComponent
        toolName={toolName}
        amount={499}
        enrollmentId={enrollmentId}
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default EnrollForm;