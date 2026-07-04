'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, LogOut, Settings, Mail, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
        whileHover={{ scale: 1.05 }}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-semibold">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <span className="text-sm font-medium text-white hidden sm:inline">{user.name}</span>
      </motion.button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden"
        >
          {/* User Info */}
          <div className="p-4 border-b border-slate-700">
            <p className="font-semibold text-white">{user.name}</p>
            <p className="text-sm text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1 capitalize">{user.role}</p>
          </div>

          {/* Menu Items */}
          <nav className="py-2">
            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-slate-800 flex items-center gap-2 transition-colors">
              <User size={16} />
              View Profile
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-slate-800 flex items-center gap-2 transition-colors">
              <Settings size={16} />
              Settings
            </button>
            <button className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-slate-800 flex items-center gap-2 transition-colors">
              <Lock size={16} />
              Change Password
            </button>
          </nav>

          {/* Divider */}
          <div className="border-t border-slate-700" />

          {/* Logout */}
          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;
