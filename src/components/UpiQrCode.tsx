import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

interface UpiQrCodeProps {
  upiId: string;
  amount: number;
  name: string;
  note?: string;
}

const UpiQrCode: React.FC<UpiQrCodeProps> = ({ upiId, amount, name, note }) => {
  const transactionNote = note || `Payment for ${name}`;
  
  // Generate UPI payment link
  const upiLink = `upi://pay?pa=${upiId}&pn=Guidesoft&am=${amount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  return (
    <div className="flex flex-col items-center">
      <QRCodeCanvas 
        value={upiLink} 
        size={200} 
        level="H"
        includeMargin={true}
        className="border-4 border-white rounded-lg"
      />
      <p className="mt-2 text-sm text-center text-muted-foreground">
        Scan with any UPI app
      </p>
    </div>
  );
};

export default UpiQrCode;