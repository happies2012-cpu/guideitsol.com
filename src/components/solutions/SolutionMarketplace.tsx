import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Filter, Search, Grid, List as ListIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageHero from '@/components/ui/PageHero';
import AppModelCard from './AppModelCard';
import PaymentGateway from './PaymentGateway';
import { getModelsByCategory, AppModel } from '@/data/app-models';

interface SolutionMarketplaceProps {
    title: string;
    category: string;
}

const SolutionMarketplace: React.FC<SolutionMarketplaceProps> = ({ title, category }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedModel, setSelectedModel] = useState<AppModel | null>(null);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    const models = getModelsByCategory(category);
    const filteredModels = models.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBuy = (model: AppModel) => {
        setSelectedModel(model);
        setIsPaymentOpen(true);
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Dynamic Hero Section */}
            <PageHero
                title={`${title} Models`}
                subtitle={`Explore our collection of 20+ premium ${title.toLowerCase()} designs and functional models. Ready to deploy and customize for your project.`}
                ctaText="Explore All"
                pageType={category}
            />

            <section className="py-12 border-b border-primary/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder={`Search ${title} models...`}
                                className="pl-10 bg-background/50 border-primary/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-4 w-full md:w-auto">
                            <Button variant="outline" className="flex-1 md:flex-none gap-2 border-primary/20">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                            <div className="flex border border-primary/20 rounded-md overflow-hidden">
                                <Button variant="ghost" size="icon" className="rounded-none bg-primary/10 text-primary">
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="rounded-none">
                                    <ListIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4">
                    {filteredModels.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredModels.map((model) => (
                                <AppModelCard
                                    key={model.id}
                                    model={model}
                                    onBuy={handleBuy}
                                />
                            ))}

                            {/* If we have fewer than 20 items, show mock placeholders or repeat Items if needed for visual demo */}
                            {[...Array(Math.max(0, 8 - filteredModels.length))].map((_, i) => (
                                <motion.div
                                    key={`skeleton-${i}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    className="rounded-xl bg-primary/5 h-80 border border-dashed border-primary/20 flex flex-col items-center justify-center text-center p-6"
                                >
                                    <p className="text-muted-foreground text-sm font-medium">Coming Soon</p>
                                    <p className="text-[10px] text-muted-foreground/60">New {title} model in development</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <h3 className="text-2xl font-bold mb-2">No models found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Trust & Features Section */}
            <section className="py-20 bg-primary/5">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Instant Download",
                                desc: "Get access to source code and assets immediately after payment."
                            },
                            {
                                title: "Quality Guaranteed",
                                desc: "Every model is reviewed for performance, accessibility, and high code quality."
                            },
                            {
                                title: "Expert Support",
                                desc: "Need customization? Our team is available for premium implementation services."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="text-center space-y-4">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto text-primary-foreground font-bold">
                                    {i + 1}
                                </div>
                                <h4 className="text-xl font-bold">{feature.title}</h4>
                                <p className="text-muted-foreground">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Gateway Modal */}
            {selectedModel && (
                <PaymentGateway
                    model={selectedModel}
                    isOpen={isPaymentOpen}
                    onClose={() => setIsPaymentOpen(false)}
                />
            )}
        </div>
    );
};

export default SolutionMarketplace;
