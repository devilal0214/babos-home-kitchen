import React, { useEffect, useRef, useState } from 'react';
import { Search, MessageCircle, CalendarCheck, UtensilsCrossed, ShoppingCart, Clock, Truck } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import GallerySection from '../components/GallerySection';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Explore our Delicacies",
      description: "Browse our menu and choose your favourites."
    },
    {
      icon: ShoppingCart,
      title: "Build your Order",
      description: "Add dishes to your cart with ease."
    },
    {
      icon: CalendarCheck,
      title: "Schedule your order",
      description: "Schedule your order and share contact details."
    },
    {
      icon: MessageCircle,
      title: "Confirm via WhatsApp",
      description: "Send your order directly to Babo’s team for confirmation."
    },
    {
      icon: Clock,
      title: "Allow us 24 Hours' Notice",
      description: "We source the freshest ingredients for your meal."
    },
    {
      icon: Truck,
      title: "Delivered / Ready for Pickup",
      description: "Get it delivered or picked up at your convenience."
    }
  ];

  // Scroll-driven animation state
  const scrollerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0–1

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onScroll = () => {
      const rect = scroller.getBoundingClientRect();
      const scrollerHeight = scroller.offsetHeight;
      const windowHeight = window.innerHeight;
      // How far through the tall scroller have we scrolled
      const scrolled = -rect.top;
      const scrollable = scrollerHeight - windowHeight;
      const p = Math.min(1, Math.max(0, scrolled / scrollable));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Line fills across steps; each step activates at its threshold
  const linePercent = Math.round(progress * 100);
  const activeStep = Math.min(steps.length - 1, Math.floor(progress * steps.length));

  return (
    <div className="bg-stone-50">

      {/* ── Sticky scroll section ── */}
      {/* tall div gives scroll room; sticky child stays on screen */}
      <div ref={scrollerRef} style={{ height: '400vh' }} className="relative">
        <div ref={stickyRef} className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-2 sm:py-4 md:py-6 overflow-hidden">

          {/* Header */}
          <div className="text-center mb-2 sm:mb-4 md:mb-6 xl:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl font-serif font-bold text-stone-900 mb-1 sm:mb-1.5 md:mb-3">Simple. Fresh. Made for You.</h1>
            <p className="text-[10px] sm:text-xs md:text-sm xl:text-base text-stone-500 max-w-xl mx-auto">
              Scroll to see how it works
            </p>
          </div>

          {/* Steps + animated connector */}
          <div className="w-full max-w-2xl mx-auto px-4 md:px-8 relative">

            {/* Vertical timeline connector */}
            <div className="absolute left-[22px] sm:left-[28px] md:left-[32px] xl:left-[40px] top-[22px] sm:top-[28px] md:top-[32px] xl:top-[40px] bottom-[22px] sm:bottom-[28px] md:bottom-[32px] xl:bottom-[40px] w-0.5 bg-orange-100 -translate-x-1/2">
              <div
                className="h-full bg-orange-500 rounded-full transition-all duration-150 ease-out origin-top"
                style={{ height: `${progress * 100}%` }}
              />
            </div>

            {/* Steps List */}
            <div className="relative z-10 flex flex-col gap-y-3 sm:gap-y-4 md:gap-y-5 xl:gap-y-6">
              {steps.map((step, index) => {
                const isActive = index <= activeStep;
                const StepIcon = step.icon;
                return (
                  <div key={index} className={`flex items-start gap-4 md:gap-6 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`}>
                    {/* Circle */}
                    <div className={`relative z-10 shrink-0 w-11 h-11 sm:w-14 md:w-16 xl:w-20 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? 'bg-orange-50 border-orange-400 text-orange-600 shadow-[0_0_0_6px_rgba(234,88,12,0.12)]'
                        : 'bg-white border-orange-100 text-stone-400'
                    }`}>
                      <StepIcon className="w-5 h-5 sm:w-6 md:w-7 xl:w-9 text-inherit" />
                      <div className={`absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center font-bold text-[8px] sm:text-[10px] md:text-xs border-2 border-white transition-colors duration-300 ${
                        isActive ? 'bg-stone-900 text-white' : 'bg-stone-300 text-white'
                      }`}>
                        {index + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pt-1 md:pt-2 xl:pt-4">
                      <h3 className={`text-sm sm:text-base md:text-lg lg:text-lg xl:text-xl font-bold font-serif mb-0.5 md:mb-1 transition-colors duration-300 ${isActive ? 'text-stone-900' : 'text-stone-400'}`}>
                        {step.title}
                      </h3>
                      <div className={`transition-all duration-500 ease-in-out ${
                        isActive 
                          ? 'max-h-24 opacity-100 mt-0.5' 
                          : 'max-h-0 opacity-0 mt-0 overflow-hidden lg:max-h-24 lg:opacity-100 lg:mt-0.5 lg:overflow-visible'
                      }`}>
                        <p className={`text-xs sm:text-xs md:text-sm lg:text-sm xl:text-base leading-relaxed transition-colors duration-300 ${isActive ? 'text-stone-600' : 'text-stone-400'}`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Scroll hint — hidden on mobile, fades out once scrolling begins */}
          <div className={`hidden lg:flex mt-4 md:mt-6 xl:mt-8 flex-col items-center gap-2 transition-opacity duration-500 ${progress > 0.05 ? 'opacity-0' : 'opacity-100'}`}>
            <span className="text-stone-400 text-xs">Scroll down</span>
            <div className="w-5 h-8 rounded-full border-2 border-stone-300 flex justify-center pt-1.5">
              <div className="w-1 h-2 bg-stone-400 rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Rest of page content (unchanged) ── */}
      <div className="bg-stone-50 py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-10 rounded-3xl border border-stone-200 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-serif font-bold text-stone-900 mb-4">Why 1 Day Advance?</h2>
            <p className="text-stone-600 mb-8">
              Unlike restaurants, we don't keep pre-cooked gravies or frozen meat. When you order, we buy fresh vegetables, fish, and meat the next morning. This ensures you get the healthiest, most authentic home-cooked meal possible.
            </p>
            <WhatsAppButton text="Order on WhatsApp" />
          </div>
        </div>
      </div>

      <GallerySection />

    </div>
  );
}
