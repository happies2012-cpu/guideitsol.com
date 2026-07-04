import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Activity, Zap, Clock } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps & { delay: number }> = ({
  label,
  value,
  change,
  icon,
  positive,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors"
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
        <p className={`text-sm mt-2 ${positive ? 'text-green-500' : 'text-red-500'}`}>
          {positive ? '↑' : '↓'} {change} from last month
        </p>
      </div>
      <div className="text-slate-600">{icon}</div>
    </div>
  </motion.div>
);

export const StatsCards: React.FC = () => {
  const stats: (StatCardProps & { delay: number })[] = [
    {
      label: 'API Calls',
      value: '45,231',
      change: '+12.5%',
      icon: <Zap size={24} />,
      positive: true,
      delay: 0,
    },
    {
      label: 'Active Conversations',
      value: '234',
      change: '+8.2%',
      icon: <Activity size={24} />,
      positive: true,
      delay: 0.1,
    },
    {
      label: 'Uptime',
      value: '99.99%',
      change: '+0.01%',
      icon: <Clock size={24} />,
      positive: true,
      delay: 0.2,
    },
    {
      label: 'Growth',
      value: '127%',
      change: '+15.3%',
      icon: <TrendingUp size={24} />,
      positive: true,
      delay: 0.3,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};
