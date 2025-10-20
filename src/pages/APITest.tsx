import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

const APITest = () => {
  const [learningPaths, setLearningPaths] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch learning paths
        const pathsResponse = await fetch('/api/learning-paths');
        const pathsData = await pathsResponse.json();
        setLearningPaths(pathsData.data);
        
        // Fetch reviews
        const reviewsResponse = await fetch('/api/reviews');
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData.data);
        
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error: {error}
        </div>
      )}
      
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Learning Paths</h2>
        {loading ? (
          <p>Loading learning paths...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningPaths.map((path) => (
              <div key={path.id} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg">{path.title}</h3>
                <p className="text-muted-foreground">{path.description}</p>
                <div className="mt-2 text-sm">
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                    {path.category}
                  </span>
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded">
                    {path.difficulty}
                  </span>
                </div>
                <p className="mt-2 text-sm">Duration: {path.duration}</p>
                <p className="mt-1 text-sm">Steps: {path.steps.length}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {loading ? (
          <p>Loading reviews...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review: any) => (
              <div key={review.id} className="border rounded-lg p-4">
                <h3 className="font-bold">{review.title}</h3>
                <p className="text-muted-foreground">{review.content}</p>
                <div className="mt-2 flex items-center">
                  <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  <span className="ml-2 text-sm">({review.rating}/5)</span>
                </div>
                {review.tool && (
                  <p className="mt-2 text-sm">Tool: {review.tool.name}</p>
                )}
                {review.course && (
                  <p className="mt-1 text-sm">Course: {review.course.title}</p>
                )}
                <p className="mt-2 text-xs text-muted-foreground">
                  By {review.user.name} on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-8">
        <Button onClick={() => window.location.reload()}>Refresh Data</Button>
      </div>
    </div>
  );
};

export default APITest;