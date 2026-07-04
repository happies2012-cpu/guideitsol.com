import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Users } from 'lucide-react';

export const BillingSection: React.FC = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals and small teams',
      features: [
        'Up to 10,000 API calls/month',
        '3 AI models access',
        'Basic analytics',
        'Email support',
        '1 user seat',
      ],
      icon: <Zap className="w-6 h-6" />,
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$99',
      period: '/month',
      description: 'For growing teams and businesses',
      features: [
        'Up to 100,000 API calls/month',
        'All AI models access',
        'Advanced analytics',
        'Priority support',
        'Up to 5 user seats',
        'Custom integrations',
        'API documentation',
      ],
      icon: <Shield className="w-6 h-6" />,
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        'Unlimited API calls',
        'All AI models + custom models',
        'Real-time analytics',
        '24/7 dedicated support',
        'Unlimited user seats',
        'Advanced security',
        'SLA guarantee',
        'White-label options',
      ],
      icon: <Users className="w-6 h-6" />,
      highlighted: false,
    },
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-slate-400">Choose the perfect plan for your needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-xl border p-8 transition-all ${
              plan.highlighted
                ? 'border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent shadow-lg shadow-blue-500/20'
                : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
            }`}
          >
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                Most Popular
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div className="text-blue-500">{plan.icon}</div>
              <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-slate-400">{plan.period}</span>
              </div>
              <p className="text-sm text-slate-400 mt-2">{plan.description}</p>
            </div>

            <button
              className={`w-full py-3 rounded-lg font-semibold mb-8 transition-colors ${
                plan.highlighted
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Get Started
            </button>

            <div className="space-y-4">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
