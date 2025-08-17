import React from "react";
import { Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CustomerReviews() {
  const { t } = useLanguage();
  
  const reviews = [
    {
      id: 1,
      rating: 5,
      text: t('reviews.review1.text'),
      author: t('reviews.review1.author'),
      role: t('reviews.review1.role'),
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 2,
      rating: 5,
      text: t('reviews.review2.text'),
      author: t('reviews.review2.author'),
      role: t('reviews.review2.role'),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=face"
    },
    {
      id: 3,
      rating: 5,
      text: t('reviews.review3.text'),
      author: t('reviews.review3.author'),
      role: t('reviews.review3.role'),
      avatar: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&w=60&h=60&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-poppins text-4xl font-bold text-foreground">
            {t('reviews.title')}
          </h2>
          <p className="text-xl text-foreground/70">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              className="bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              data-testid={`review-${review.id}`}
            >
              <div className="space-y-6">
                <div className="flex text-secondary text-xl" data-testid={`rating-${review.id}`}>
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-foreground/80 leading-relaxed italic" data-testid={`review-text-${review.id}`}>
                  "{review.text}"
                </blockquote>
                
                <div className="flex items-center space-x-4">
                  <img 
                    src={review.avatar} 
                    alt={review.author} 
                    className="w-12 h-12 rounded-full"
                    data-testid={`avatar-${review.id}`}
                  />
                  <div>
                    <p className="font-semibold text-foreground" data-testid={`author-${review.id}`}>
                      {review.author}
                    </p>
                    <p className="text-sm text-foreground/70" data-testid={`role-${review.id}`}>
                      {review.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}