import React from 'react';
import { Search, MessageCircle, CalendarCheck, UtensilsCrossed } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';

export default function HowItWorks() {
  const steps = [
    {
      icon: <Search size={40} />,
      title: "Browse the menu",
      description: "Explore our authentic Bengali dishes. Choose what you're craving for tomorrow."
    },
    {
      icon: <MessageCircle size={40} />,
      title: "Place order on WhatsApp",
      description: "Send us a message with your selected items and preferred delivery time."
    },
    {
      icon: <CalendarCheck size={40} />,
      title: "Confirm 1 day in advance",
      description: "We need at least 24 hours notice to source fresh ingredients specifically for your meal."
    },
    {
      icon: <UtensilsCrossed size={40} />,
      title: "We cook fresh for you",
      description: "Your food is prepared from scratch, packed hygienically, and delivered to your doorstep."
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Simple. Fresh. Made for You.</h1>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We don't run a commercial kitchen. Every meal is planned and cooked specifically for the families who order. Here's how it works.
          </p>
        </div>

        <div className="relative mb-24">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-orange-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-white rounded-full border-4 border-orange-100 flex items-center justify-center text-orange-600 mb-6 relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-stone-900 text-white rounded-full flex items-center justify-center font-bold text-sm border-2 border-white">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900 mb-3">{step.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl border border-stone-200 text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Why 1 Day Advance?</h2>
          <p className="text-stone-600 mb-8">
            Unlike restaurants, we don't keep pre-cooked gravies or frozen meats. When you order, we buy fresh vegetables, fish, and meat the next morning. This ensures you get the healthiest, most authentic home-cooked meal possible.
          </p>
          <WhatsAppButton text="Order Now on WhatsApp" />
        </div>

      </div>
    </div>
  );
}
