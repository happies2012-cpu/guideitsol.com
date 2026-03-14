"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Calendar, MessageCircle, Mail, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import DOMPurify from 'dompurify';

import logoImg from "@/assets/guidesoft-logo.png";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  isHtml?: boolean;
}

const KNOWLEDGE_BASE = [
  {
    keywords: ["book", "meeting", "schedule", "call", "demo", "appointment", "calendly"],
    response: `
      To schedule a meeting with Guide IT Solutions:
      <br/><br/>
      📅 <a href="https://calendly.com/guideitsol" target="_blank" class="text-blue-400 font-semibold hover:underline">Book a meeting here</a>
      <br/><br/>
      You can also reach our team directly via WhatsApp for quick assistance.
    `
  },
  {
    keywords: ["contact", "whatsapp", "phone", "email", "reach", "support", "number", "chat"],
    response: `
      You can contact our team directly through the following channels:
      <br/><br/>
      📞 <a href="https://wa.me/918884162999" target="_blank" class="text-green-400 font-semibold hover:underline">WhatsApp: +91 8884162999</a>
      <br/>
      📧 <a href="mailto:info@guideitsol.com" class="text-blue-400 font-semibold hover:underline">Email: info@guideitsol.com</a>
      <br/><br/>
      Or schedule a call: <a href="https://calendly.com/guideitsol" target="_blank" class="text-blue-400 hover:underline">Book via Calendly</a>
    `
  },
  {
    keywords: ["service", "offerings", "develop", "build", "create", "what do you do"],
    response: `
      We provide a wide range of services:
      <ul class="list-disc ml-4 mt-2 space-y-1">
        <li>AI Chatbot Development & Machine Learning</li>
        <li>Web & Software Development (Next.js, Node.js)</li>
        <li>Cloud Solutions & DevOps engineering</li>
        <li>Mobile App Development (iOS/Android/Flutter)</li>
        <li>Digital Marketing & UI/UX Design</li>
        <li>Travel Tech & E-commerce platforms</li>
      </ul>
      <br/>
      Need something specific? <a href="https://wa.me/918884162999" target="_blank" class="text-green-400 font-semibold hover:underline">Chat with us on WhatsApp</a>.
    `
  },
  {
    keywords: ["pricing", "cost", "fee", "how much", "quote", "estimate"],
    response: `
      Our pricing depends entirely on the scope and complexity of your project. 
      <br/><br/>
      We offer flexible engagement models including fixed-price and dedicated offshore developer hiring.
      <br/><br/>
      Let's discuss your requirements! 
      <br/>
      👉 <a href="https://calendly.com/guideitsol" target="_blank" class="text-blue-400 font-semibold hover:underline">Schedule a free consultation</a>
    `
  },
  {
    keywords: ["about", "company", "guidesoft", "location", "address", "who are you"],
    response: `
      <strong>Guide IT Solutions (Guidesoft)</strong> is a leading IT integration and consulting firm.
      <br/><br/>
      We specialize in AI systems, Web/Mobile App Development, and modern Data Architecture with over 15+ years of combined expertise.
      <br/><br/>
      📍 <strong>Headquarters:</strong> 123 Tech Park, IT Hub, Hyderabad, Telangana, INDIA
    `
  },
  {
    keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
    response: `
      Hello! Welcome to Guide IT Solutions. 👋
      <br/><br/>
      How can I assist you today? 
      You can type things like <em>"book a meeting"</em>, <em>"what are your services?"</em>, or <em>"contact info"</em>.
    `
  }
];

const DEFAULT_RESPONSE = `
  Thanks for contacting Guide IT Solutions! 👋
  <br/><br/>
  We provide:
  <ul class="list-disc ml-4 mb-2">
    <li>AI chatbot development</li>
    <li>Web & software development</li>
    <li>Cloud solutions</li>
  </ul>
  
  Please let me know how I can help, or reach out directly:<br/><br/>
  📞 <a href="https://wa.me/918884162999" target="_blank" class="text-green-400 hover:underline">WhatsApp Us</a><br/>
  📧 <a href="mailto:info@guideitsol.com" class="text-blue-400 hover:underline">info@guideitsol.com</a><br/>
  📅 <a href="https://calendly.com/guideitsol" target="_blank" class="text-purple-400 hover:underline">Book a meeting</a>
`;

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        id: 1, 
        text: `Hello! I'm the Guidesoft AI Assistant. 👋<br/><br/>How can I help you accelerate your digital transformation today?`, 
        sender: 'bot',
        isHtml: true
      }]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();
    
    // Check knowledge base based on keywords matching
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.keywords.some(kw => q.includes(kw))) {
        return entry.response;
      }
    }
    
    return DEFAULT_RESPONSE;
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newUserMessage: Message = { id: Date.now(), text: inputValue, sender: 'user', isHtml: false };
    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    const botResponse = getBotResponse(inputValue);
    
    // Simulate smart thinking/RAG searching time
    setTimeout(() => {
      const newBotMessage: Message = { id: Date.now() + 1, text: botResponse, sender: 'bot', isHtml: true };
      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    // Slight timeout so UI updates before sending
    setTimeout(() => {
      handleSendMessage();
    }, 50);
  };

  return (
    <>
      {/* Quick Access Action Buttons if Chat is Closed */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-24 right-8 z-40 hidden md:flex flex-col gap-3"
          >
            <Button
              variant="secondary"
              className="rounded-full shadow-lg border border-primary/20 bg-background/90 backdrop-blur hover:bg-muted text-xs shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] font-medium"
              onClick={() => setIsOpen(true)}
            >
              📅 Schedule Demo
            </Button>
            <Button
              variant="secondary"
              className="rounded-full shadow-lg border border-primary/20 bg-background/90 backdrop-blur hover:bg-muted text-xs shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)] font-medium"
              onClick={() => {
                setIsOpen(true);
                setTimeout(() => handleQuickAction("contact"), 300);
              }}
            >
              💬 WhatsApp Support
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center cursor-pointer"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        aria-label="Toggle Chatbot"
      >
        <div className="relative group w-14 h-14 rounded-full shadow-2xl bg-gradient-to-tr from-primary to-blue-500 overflow-hidden border-2 border-primary/50 flex items-center justify-center hover:scale-105 transition-transform duration-300">
          {isOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <img src={logoImg} alt="Guidesoft AI" className="h-8 w-8 object-contain drop-shadow-lg" />
          )}
          
          <motion.span
            className="absolute inset-0 rounded-full bg-white opacity-20"
            animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-28 right-8 z-50 w-[340px] md:w-[400px] h-[520px] shadow-2xl"
          >
            <Card className="h-full flex flex-col bg-background/95 backdrop-blur-2xl border border-primary/30 shadow-[0_10px_40px_-15px_rgba(var(--primary-rgb),0.5)] overflow-hidden rounded-2xl">
              
              {/* Header */}
              <CardHeader className="flex flex-row items-center space-x-3 p-4 border-b border-primary/20 bg-gradient-to-r from-primary/10 to-transparent m-0">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border border-primary/40 shrink-0">
                  <img src={logoImg} alt="AI Logo" className="w-6 h-6 object-contain" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-md font-bold text-foreground leading-tight">
                    Guidesoft AI
                  </CardTitle>
                  <p className="text-xs text-green-400 font-medium flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Online | Replies instantly
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-primary/20 -mr-2">
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              </CardHeader>

              {/* Chat Area */}
              <CardContent className="flex-1 p-0 overflow-hidden flex flex-col bg-gradient-to-b from-transparent to-background/50">
                <ScrollArea className="flex-1 p-4 pb-2">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        key={message.id}
                        className={cn(
                          "flex overflow-hidden",
                          message.sender === 'user' ? "justify-end" : "justify-start"
                        )}
                      >
                        {message.sender === 'bot' && (
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mr-2 mt-1">
                            <Bot className="w-3.5 h-3.5 text-primary" />
                          </div>
                        )}
                        <div
                          className={cn(
                            "max-w-[78%] p-3 rounded-2xl text-sm leading-relaxed",
                            message.sender === 'user'
                              ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md"
                              : "bg-muted/80 text-foreground rounded-tl-sm border border-border shadow-sm"
                          )}
                        >
                          {message.isHtml ? (
                            <div 
                              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(message.text, { ADD_ATTR: ['target'] }) }} 
                              className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-a:text-primary max-w-none"
                            />
                          ) : (
                            message.text
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-start items-center"
                      >
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mr-2">
                          <Bot className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div className="bg-muted/80 p-3 rounded-2xl rounded-tl-sm border border-border shadow-sm flex space-x-1.5 h-10 items-center">
                          <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} className="h-1" />
                  </div>
                </ScrollArea>

                {/* Quick Actions Array */}
                <div className="px-4 py-2 flex gap-2 overflow-x-auto no-scrollbar border-t border-border/50 shrink-0 bg-background/50">
                   <button 
                     onClick={() => handleQuickAction("Book a demo meeting")}
                     className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 text-xs font-medium text-primary transition-colors"
                   >
                     <Calendar className="w-3.5 h-3.5" /> Book Demo
                   </button>
                   <button 
                     onClick={() => handleQuickAction("What are your services?")}
                     className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 text-xs font-medium text-primary transition-colors"
                   >
                     <Mail className="w-3.5 h-3.5" /> Services
                   </button>
                   <button 
                     onClick={() => handleQuickAction("Contact via WhatsApp")}
                     className="whitespace-nowrap flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary/20 text-xs font-medium text-primary transition-colors"
                   >
                     <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Sync
                   </button>
                </div>

                {/* Input Area */}
                <div className="p-3 border-t border-primary/20 bg-background flex items-end gap-2 shrink-0">
                  <Input
                    placeholder="Ask about AI, services, pricing..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-transparent rounded-xl text-sm min-h-[44px]"
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!inputValue.trim() || isTyping}
                    className="rounded-xl h-[44px] w-[44px] shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm transition-all flex items-center justify-center p-0 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </Button>
                </div>

              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;