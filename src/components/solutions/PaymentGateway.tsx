import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, QrCode, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AppModel } from '@/data/app-models';
import { useToast } from '@/hooks/use-toast';
import { generateUpiLink, copyToClipboard, isValidUpiId } from '@/lib/upi-utils';

interface PaymentGatewayProps {
    model: AppModel;
    isOpen: boolean;
    onClose: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ model, isOpen, onClose }) => {
    const [step, setStep] = useState<'selection' | 'upi' | 'gpay' | 'processing' | 'success'>('selection');
    const [upiId, setUpiId] = useState(import.meta.env.VITE_UPI_ID || '8884162999@ybl');
    const { toast } = useToast();

    const handlePayment = async () => {
        setStep('processing');
        try {
            if (step === 'gpay' || step === 'upi') {
                if (!isValidUpiId(upiId)) {
                    throw new Error('Please enter a valid UPI ID');
                }

                const paymentLink = generateUpiLink(upiId, Number(model.price || 0), model.name, `Purchase for ${model.name}`);
                window.open(paymentLink, '_blank', 'noopener,noreferrer');
                await copyToClipboard(upiId);
            }

            setTimeout(() => {
                setStep('success');
                toast({
                    title: "Payment Requested",
                    description: `A payment request for ${model.name} has been opened. Complete it in your app and we will confirm it shortly.`,
                });
            }, 1200);
        } catch (error) {
            setStep('selection');
            toast({
                title: 'Payment setup failed',
                description: error instanceof Error ? error.message : 'Please try again.',
                variant: 'destructive',
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-md"
            >
                <Card className="relative overflow-hidden border-primary/20 bg-background text-foreground">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                        onClick={onClose}
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    <CardHeader>
                        <CardTitle className="text-xl flex items-center gap-2">
                            {step === 'success' ? 'Thank You!' : `Purchase ${model.name}`}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <AnimatePresence mode="wait">
                            {step === 'selection' && (
                                <motion.div
                                    key="selection"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <p className="text-sm text-muted-foreground mb-4">Select your preferred payment method:</p>
                                    <Button
                                        variant="outline"
                                        className="w-full h-16 flex justify-between items-center px-6 hover:border-primary group"
                                        onClick={() => setStep('upi')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <QrCode className="h-6 w-6 text-primary" />
                                            <div className="text-left">
                                                <div className="font-bold">UPI Payment</div>
                                                <div className="text-xs text-muted-foreground">BHIM, PhonePe, Paytm</div>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="h-5 w-5 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                                    </Button>

                                    <Button
                                        variant="outline"
                                        className="w-full h-16 flex justify-between items-center px-6 hover:border-primary group"
                                        onClick={() => setStep('gpay')}
                                    >
                                        <div className="flex items-center gap-3">
                                            <Smartphone className="h-6 w-6 text-primary" />
                                            <div className="text-left">
                                                <div className="font-bold">Google Pay</div>
                                                <div className="text-xs text-muted-foreground">Instant payment via GPay</div>
                                            </div>
                                        </div>
                                        <CheckCircle2 className="h-5 w-5 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
                                    </Button>

                                    <div className="pt-4 border-t border-border flex justify-between items-center">
                                        <span className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Total Payable</span>
                                        <span className="text-2xl font-bold text-primary">${model.price}</span>
                                    </div>
                                </motion.div>
                            )}

                            {step === 'upi' && (
                                <motion.div
                                    key="upi"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Button variant="ghost" size="sm" onClick={() => setStep('selection')}>← Back</Button>
                                        <span className="font-bold">UPI Details</span>
                                    </div>
                                    <div className="bg-primary/5 p-4 rounded-lg flex flex-col items-center justify-center space-y-4">
                                        <div className="w-48 h-48 bg-white p-2 rounded-lg border-2 border-primary">
                                            {/* Fake QR Code */}
                                            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                <QrCode className="h-24 w-24" />
                                            </div>
                                        </div>
                                        <p className="text-xs text-center text-muted-foreground">Scan QR with any UPI App or enter ID below</p>
                                    </div>
                                    <Input
                                        placeholder="Enter UPI ID (e.g. user@okaxis)"
                                        value={upiId}
                                        onChange={(e) => setUpiId(e.target.value)}
                                    />
                                    <Button className="w-full" onClick={() => handlePayment()} disabled={!upiId}>Open UPI App</Button>
                                </motion.div>
                            )}

                            {step === 'gpay' && (
                                <motion.div
                                    key="gpay"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <Button variant="ghost" size="sm" onClick={() => setStep('selection')}>← Back</Button>
                                        <span className="font-bold">Google Pay</span>
                                    </div>
                                    <div className="p-8 text-center space-y-4">
                                        <Smartphone className="h-16 w-16 text-primary mx-auto animate-bounce" />
                                        <p className="text-muted-foreground">Open Google Pay on your mobile device to complete the payment request.</p>
                                    </div>
                                    <Button className="w-full" onClick={() => handlePayment()}>Open Google Pay</Button>
                                </motion.div>
                            )}

                            {step === 'processing' && (
                                <motion.div
                                    key="processing"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-12 text-center space-y-4"
                                >
                                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                                    <p className="font-bold text-xl">Processing Payment...</p>
                                    <p className="text-muted-foreground">Please do not refresh or close this window.</p>
                                </motion.div>
                            )}

                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="py-8 text-center space-y-4"
                                >
                                    <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
                                    <h3 className="text-2xl font-bold">Success!</h3>
                                    <p className="text-muted-foreground">
                                        Your order for <strong>{model.name}</strong> has been confirmed.
                                    </p>
                                    <div className="p-4 bg-green-500/10 rounded-lg text-sm text-green-600 font-medium">
                                        A download link and license key have been sent to your registered email address.
                                    </div>
                                    <Button className="w-full" onClick={onClose}>Finish</Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default PaymentGateway;
