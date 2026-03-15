import React from 'react';
import { MessageCircle, Send, Users, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialGroups = () => {
  const groups = [
    {
      name: "Students Hub",
      description: "Exclusive group for students to get updates and support. Member list is hidden for privacy.",
      whatsappLink: "https://chat.whatsapp.com/example-students",
      telegramLink: "https://t.me/example-students",
      type: "Students"
    },
    {
      name: "Client Circle",
      description: "Priority updates and project discussions for our valued clients.",
      whatsappLink: "https://chat.whatsapp.com/example-clients",
      telegramLink: "https://t.me/example-clients",
      type: "Clients"
    },
    {
      name: "Investor Portal",
      description: "Direct community for investors to track growth and opportunities.",
      whatsappLink: "https://chat.whatsapp.com/example-investors",
      telegramLink: "https://t.me/example-investors",
      type: "Investors"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Join Our Secure Communities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our latest innovations. Our groups are configured for maximum privacy - 
            only admins can see the full member list.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {groups.map((group, index) => (
            <motion.div
              key={group.type}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background p-6 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold">{group.name}</h3>
              </div>
              <p className="text-muted-foreground mb-6 h-12 line-clamp-2">
                {group.description}
              </p>
              
              <div className="flex flex-col gap-3">
                <a
                  href={group.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-lg hover:bg-[#128C7E] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join WhatsApp
                </a>
                <a
                  href={group.telegramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#0088cc] text-white rounded-lg hover:bg-[#0077b5] transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Join Telegram
                </a>
              </div>
              
              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 p-2 rounded-md">
                <ShieldCheck className="w-3 h-3 text-green-500" />
                <span>Private: Members cannot see each other</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialGroups;
