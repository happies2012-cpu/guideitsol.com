import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Shield, Zap } from 'lucide-react';

const backlinks = [
    { name: 'GS Cloud Infrastructure', url: 'https://cloud.guideitsol.com', description: 'Enterprise-grade AI hosting and cloud solutions.' },
    { name: 'GS Developer Hub', url: 'https://dev.guideitsol.com', description: 'Resources and APIs for building on GS Intelligence.' },
    { name: 'GS Analytics Platform', url: 'https://analytics.guideitsol.com', description: 'Advanced business intelligence and predictive analytics.' },
    { name: 'GS Security Core', url: 'https://security.guideitsol.com', description: 'Next-generation cybersecurity and data protection.' },
];

export const BacklinksSection = () => {
    return (
        <section className="py-20 bg-muted/30 relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    >
                        GS Ecosystem & Strategic Networks
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                    >
                        Leveraging a powerful network of integrated platforms to deliver comprehensive
                        business intelligence and digital transformation.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {backlinks.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -5 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-background p-6 rounded-2xl border border-primary/10 shadow-lg hover:shadow-primary/5 transition-all group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                    <Globe className="w-6 h-6 text-primary" />
                                </div>
                                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{link.name}</h3>
                            <p className="text-sm text-muted-foreground">{link.description}</p>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-16 bg-primary/5 p-8 rounded-3xl border border-primary/10 backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="flex flex-col items-center">
                            <Shield className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-bold mb-2">Verified Authority</h4>
                            <p className="text-sm text-muted-foreground">Certified partner in global digital ecosystems.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Zap className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-bold mb-2">Instant Synergy</h4>
                            <p className="text-sm text-muted-foreground">Seamless integration across all GS platforms.</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <Globe className="w-8 h-8 text-primary mb-4" />
                            <h4 className="font-bold mb-2">Global Presence</h4>
                            <p className="text-sm text-muted-foreground">Strategically nodes optimized for worldwide performance.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-[100px] -z-10" />
        </section>
    );
};
