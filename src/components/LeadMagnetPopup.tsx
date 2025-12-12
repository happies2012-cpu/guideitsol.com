"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";

export function LeadMagnetPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 15 seconds
    const timer = setTimeout(() => {
      const hasSeenPopup = localStorage.getItem("hasSeenLeadMagnet");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 15000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    console.log("Lead captured:", email);
    setSubmitted(true);
    localStorage.setItem("hasSeenLeadMagnet", "true");
    
    // Simulate download trigger
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = '/downloads/Travel_Portal_Checklist_2025.pdf';
      link.download = 'Travel_Portal_Checklist_2025.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            🚀 Launching a Travel Business?
          </DialogTitle>
          <DialogDescription className="text-center pt-2">
            Get our exclusive <strong>50-Point Travel Portal Checklist</strong> used by top agencies. Free for a limited time!
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your work email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full bg-gradient-to-r from-gradient-primary-start to-gradient-primary-end">
                <Download className="mr-2 h-4 w-4" />
                Send Me the Checklist
              </Button>
            </DialogFooter>
            <p className="text-xs text-center text-muted-foreground">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="text-4xl">🎉</div>
            <h3 className="text-xl font-semibold">Check your inbox!</h3>
            <p className="text-muted-foreground">
              Your checklist is on its way. The download should start automatically.
            </p>
            <Button onClick={() => setIsOpen(false)} variant="outline">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
