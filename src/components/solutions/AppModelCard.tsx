import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, ShoppingCart, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AppModel } from '@/data/app-models';
import { useToast } from '@/hooks/use-toast';

interface AppModelCardProps {
    model: AppModel;
    onBuy: (model: AppModel) => void;
}

const AppModelCard: React.FC<AppModelCardProps> = ({ model, onBuy }) => {
    const { toast } = useToast();

    const handleLike = () => {
        toast({
            title: "Liked!",
            description: `Added "${model.name}" to your favorites.`,
        });
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        toast({
            title: "Link Copied!",
            description: "Product link copied to clipboard.",
        });
    };

    const handleAddToCart = () => {
        toast({
            title: "Added to Cart",
            description: `"${model.name}" has been added to your cart.`,
        });
    };

    return (
        <motion.div
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <Card className="overflow-hidden border-primary/20 bg-background/50 backdrop-blur-sm group">
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={model.image}
                        alt={model.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        <Button size="icon" variant="secondary" onClick={handleLike} className="rounded-full">
                            <Heart className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="secondary" onClick={handleShare} className="rounded-full">
                            <Share2 className="h-5 w-5" />
                        </Button>
                        <Button size="icon" variant="secondary" onClick={handleAddToCart} className="rounded-full">
                            <ShoppingCart className="h-5 w-5" />
                        </Button>
                    </div>
                    {model.isPopular && (
                        <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-bold rounded">
                            POPULAR
                        </div>
                    )}
                </div>

                <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-bold group-hover:text-primary transition-colors">
                            {model.name}
                        </CardTitle>
                        <span className="text-primary font-bold">${model.price}</span>
                    </div>
                </CardHeader>

                <CardContent className="px-4 pb-2">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {model.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                        {model.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                {feature}
                            </span>
                        ))}
                    </div>
                </CardContent>

                <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-2" asChild>
                        <a href={model.previewUrl}>
                            <Eye className="h-4 w-4" /> Live Preview
                        </a>
                    </Button>
                    <Button size="sm" className="flex-1 gap-2" onClick={() => onBuy(model)}>
                        <ShoppingCart className="h-4 w-4" /> Buy Now
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default AppModelCard;
