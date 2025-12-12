import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { generateAvatarUrl } from "@/lib/image-utils";

interface Review {
  id: string;
  content: string;
  rating: number;
  user: {
    name: string;
    avatar?: string;
  };
  course?: {
    title: string;
  };
  tool?: {
    name: string;
  };
}

const LearnerSaySection = () => {
  const [testimonials, setTestimonials] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Fetch more reviews to ensure marquee has enough content
        const response = await fetch('/api/reviews?limit=10');
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data = await response.json();
        setTestimonials(data.data || []);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <section className="py-24 flex justify-center items-center bg-background min-h-[400px]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null;
  }

  // Duplicate testimonials to ensure smooth infinite scroll if we have enough items
  // If we have very few items (e.g. < 4), we might want to duplicate them more times
  const displayTestimonials = testimonials.length < 5 
    ? [...testimonials, ...testimonials, ...testimonials, ...testimonials]
    : [...testimonials, ...testimonials];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            What Our <span className="text-primary">Learners</span> Say
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of professionals who are advancing their careers with our AI learning paths.
          </p>
        </motion.div>
      </div>

      {/* Marquee Effect */}
      <div className="relative w-full overflow-hidden mask-linear-gradient">
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />
        
        <div className="flex gap-6 py-4 animate-scroll hover:pause-animation w-max">
          {displayTestimonials.map((testimonial, idx) => {
             // Derive role/company from course/tool or fallback
             const role = "Verified Learner";
             const company = testimonial.course?.title || testimonial.tool?.name || "GuideIT Solution";
             
             return (
            <motion.div
              key={`${testimonial.id}-${idx}`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
              className="w-[350px] md:w-[400px] flex-shrink-0"
            >
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 flex flex-col h-full">
                  <div className="mb-6 text-primary/40 flex justify-between items-center">
                    <Quote className="w-10 h-10 rotate-180" />
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < testimonial.rating ? "fill-amber-500 text-amber-500" : "text-muted"}`} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-lg leading-relaxed mb-8 flex-grow text-card-foreground/90 italic line-clamp-4">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src={testimonial.user.avatar || generateAvatarUrl(testimonial.user.name, "1065B7")} alt={testimonial.user.name} />
                      <AvatarFallback>{testimonial.user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-bold text-base">{testimonial.user.name}</h4>
                      <p className="text-sm text-muted-foreground line-clamp-1">{role} @ {company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )})}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        .hover\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default LearnerSaySection;
