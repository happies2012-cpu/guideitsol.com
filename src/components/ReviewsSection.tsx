import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, User, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    id: '1',
    rating: 5,
    title: 'Exceptional Development Team',
    content: 'Guidesoft delivered our travel booking platform with outstanding quality. The attention to detail in UI/UX and the seamless API integrations were impressive.',
    helpfulCount: 24,
    user: { name: 'Sarah K.', initials: 'SK' },
    tool: { name: 'Travel Portal Solutions' },
  },
  {
    id: '2',
    rating: 5,
    title: 'AI Integration Was Seamless',
    content: 'The AI-powered workflows they built for our business transformed how we operate. Our productivity increased by 40% within the first quarter.',
    helpfulCount: 18,
    user: { name: 'Michael R.', initials: 'MR' },
    tool: { name: 'AI Workflow Automation' },
  },
  {
    id: '3',
    rating: 4,
    title: 'Reliable & Professional',
    content: 'Great communication throughout the project. They delivered our hotel management system on time and handled all our custom requirements professionally.',
    helpfulCount: 15,
    user: { name: 'Priya D.', initials: 'PD' },
    tool: { name: 'Hotel Extranet System' },
  },
  {
    id: '4',
    rating: 5,
    title: 'Outstanding Support',
    content: 'Not only did they build a fantastic product, but their post-launch support has been incredible. Issues are resolved within hours, not days.',
    helpfulCount: 21,
    user: { name: 'James W.', initials: 'JW' },
    tool: { name: 'Custom Software Development' },
  },
  {
    id: '5',
    rating: 5,
    title: 'Best IT Partner We\'ve Had',
    content: 'We\'ve worked with many agencies before, but Guidesoft stands out for their technical depth and proactive communication. Highly recommend!',
    helpfulCount: 32,
    user: { name: 'Ananya S.', initials: 'AS' },
    tool: { name: 'Enterprise Solutions' },
  },
  {
    id: '6',
    rating: 4,
    title: 'Great Value for Investment',
    content: 'The B2B flight booking portal they delivered exceeded our expectations. Clean code, great documentation, and competitive pricing.',
    helpfulCount: 12,
    user: { name: 'David L.', initials: 'DL' },
    tool: { name: 'B2B Flight Portal' },
  },
];

const renderStars = (rating: number) => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
      />
    ))}
  </div>
);

const ReviewsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium text-amber-400">Client Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hear from businesses we've helped transform with technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -4 }}
            >
              <Card className="h-full bg-background/60 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-primary/20">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                          {review.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base font-semibold">{review.user.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">{review.tool.name}</p>
                      </div>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="relative">
                    <Quote className="w-6 h-6 text-primary/20 absolute -top-1 -left-1" />
                    <h3 className="font-semibold mb-2 pl-6">{review.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{review.content}</p>
                  <div className="mt-4 pt-3 border-t border-border/30">
                    <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      Helpful ({review.helpfulCount})
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default ReviewsSection;