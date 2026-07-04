'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Message } from './ChatInterface';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface ChatMessagesProps {
  messages: Message[];
  isLoading?: boolean;
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages, isLoading }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4 p-6 max-w-4xl mx-auto w-full">
      {messages.length === 0 && !isLoading && (
        <motion.div
          className="flex flex-col items-center justify-center h-96 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mb-4">
            <span className="text-3xl">🤖</span>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Start a Conversation</h3>
          <p className="text-gray-400">Ask anything. I&apos;m here to help with your questions and tasks.</p>
        </motion.div>
      )}

      <div className="space-y-4">
        {messages.map((message, idx) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-2xl px-4 py-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                  : 'bg-slate-800 text-gray-100 rounded-bl-none border border-slate-700'
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>

              {message.role === 'assistant' && (
                <button
                  onClick={() => handleCopy(message.content, message.id)}
                  className="mt-2 text-xs text-gray-400 hover:text-gray-300 flex items-center gap-1 transition-colors"
                >
                  {copiedId === message.id ? (
                    <>
                      <Check size={14} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-slate-800 text-gray-100 px-4 py-3 rounded-lg rounded-bl-none border border-slate-700">
              <div className="flex gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-purple-400"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  className="w-2 h-2 rounded-full bg-purple-400"
                />
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 rounded-full bg-purple-400"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
