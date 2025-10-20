import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  helpfulCount: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
  };
  tool: {
    id: string;
    name: string;
    icon: string | null;
  } | null;
  course: {
    id: string;
    title: string;
    thumbnailUrl: string | null;
  } | null;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/reviews?limit=6');
        const data = await response.json();
        setReviews(data.data);
      } catch (err) {
        setError('Failed to fetch reviews');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  if (error) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Learners Say</h2>
            <p className="text-muted-foreground">Error loading reviews: {error}</p>
          </div>
        </div>
      </section>
    );
  }

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gradient-primary-start via-gradient-primary-end to-cyan-500 bg-clip-text text-transparent">
            What Our Learners Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Hear from our community of learners and professionals
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-3/4 mb-2" />
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-5/6" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar || undefined} />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{review.user.name}</CardTitle>
                          <CardDescription>{formatDate(review.createdAt)}</CardDescription>
                        </div>
                      </div>
                      {renderStars(review.rating)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h3 className="font-semibold mb-2">{review.title}</h3>
                    <p className="text-muted-foreground text-sm">{review.content}</p>
                    {review.tool && (
                      <div className="mt-4 flex items-center text-sm">
                        <span className="font-medium">For tool:</span>
                        <span className="ml-2">{review.tool.name}</span>
                      </div>
                    )}
                    {review.course && (
                      <div className="mt-2 flex items-center text-sm">
                        <span className="font-medium">For course:</span>
                        <span className="ml-2">{review.course.title}</span>
                      </div>
                    )}
                  </CardContent>
                  <div className="px-6 pb-6">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Helpful ({review.helpfulCount})
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No reviews available at the moment.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg">View All Reviews</Button>
        </div>
      </div>
    </motion.section>
  );
};

export default ReviewsSection;