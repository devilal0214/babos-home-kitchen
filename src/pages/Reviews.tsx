import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Reviews() {
  const reviews = [
    {
      name: "Riya Sen",
      role: "Regular Customer",
      content: "The Kosha Mangsho here is exactly how my grandmother used to make it. The meat falls off the bone and the spices are perfectly balanced. Highly recommended!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Amitabh Das",
      role: "Event Host",
      content: "We ordered catering for my daughter's annaprashan. The food was the highlight of the event. The Chingri Malai Curry was a massive hit among all our guests.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Sneha Mukherjee",
      role: "Food Blogger",
      content: "Finding authentic Bengali food that doesn't feel commercialized is hard. Babo's Kitchen delivers that perfect home-cooked taste with premium quality ingredients.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Rahul Banerjee",
      role: "Regular Customer",
      content: "The Kolkata Mutton Biryani is a must-try. The aroma, the perfectly cooked potato, and the succulent mutton pieces make it an unforgettable experience.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Priya Chatterjee",
      role: "Custom Order Client",
      content: "I requested a specific dish from my childhood, and they nailed it! The attention to detail and willingness to accommodate custom requests is amazing.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    },
    {
      name: "Sandeep Roy",
      role: "Regular Customer",
      content: "Consistently delicious food. The packaging is great, the delivery is on time, and the taste is always authentic. It's our go-to place for weekend dinners.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Customer Reviews</h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our patrons have to say about their experience with Babo's Home Kitchen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-stone-100 relative">
              <Quote className="absolute top-6 right-6 text-yellow-100 w-12 h-12" />
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <p className="text-stone-700 mb-8 relative z-10 italic">"{review.content}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={review.image} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-stone-900">{review.name}</h4>
                  <p className="text-sm text-stone-500">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
