'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Plus, MessageSquare, Trash2 } from 'lucide-react';
import { Conversation } from './ChatInterface';

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onCreateNew: () => void;
  onDelete: (id: string) => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onCreateNew,
  onDelete,
}) => {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <motion.button
          onClick={onCreateNew}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={20} />
          New Chat
        </motion.button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-2">
          {conversations.map((conversation) => (
            <motion.div
              key={conversation.id}
              className="group"
              whileHover={{ x: 2 }}
            >
              <button
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                  currentConversationId === conversation.id
                    ? 'bg-purple-600/20 text-white border border-purple-500/30'
                    : 'text-gray-300 hover:bg-slate-800/50'
                }`}
              >
                <MessageSquare size={16} className="flex-shrink-0" />
                <span className="text-sm truncate flex-1">{conversation.title}</span>
              </button>

              {currentConversationId === conversation.id && (
                <motion.button
                  onClick={() => onDelete(conversation.id)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-600/20 rounded transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <Trash2 size={14} className="text-red-400" />
                </motion.button>
              )}
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-800 p-4 text-xs text-gray-400 text-center">
        <p>Powered by Advanced AI</p>
      </div>
    </div>
  );
};

export default ChatSidebar;
