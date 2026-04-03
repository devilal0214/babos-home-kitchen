import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Utensils, Star, ArrowRight, Plus, Minus, ShoppingCart } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { useMenuData } from '../context/MenuDataContext';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { cart, addToCart, updateQuantity } = useCart();
  const { menuItems, categories, loading } = useMenuData();

  // Show Signature-tagged dishes first; fall back to first 6 if none
  const signatureDishes = menuItems.filter(item => item.tags?.includes('Signature'));
  const allDishes = signatureDishes.length > 0 ? signatureDishes : menuItems.slice(0, 6);

  const filteredDishes = activeCategory === 'All'
    ? allDishes
    : allDishes.filter(dish =>
        dish.category === activeCategory ||
        dish.dietary === activeCategory ||
        dish.tags?.includes(activeCategory)
      );

  return (
    <div className="bg-stone-50">
      {/* Hero Section */}
      <section className="relative bg-stone-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            // src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
            src="http://localhost:5173/uploads/gallery/cover-image.jpg.jpeg"
            alt="Bengali Thali" 
            className="w-full h-full object-cover"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold mb-6 border border-orange-500/30">
              Order at least 1 day in advance
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-6">
              This is not fast food. This is food worth waiting for.
            </h1>
            <p className="text-lg md:text-xl text-stone-300 mb-10 leading-relaxed">
              Experience the Magic of Bengal. Authentic flavors. Handcrafted by Chef Babo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <WhatsAppButton text="Order on WhatsApp" />
              <Link 
                to="/menu" 
                className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 px-6 py-3 rounded-lg font-medium hover:bg-stone-100 transition-colors text-base"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Highlights */}
      <section className="py-12 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center p-6 bg-stone-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif text-stone-800">Freshly Cooked</h3>
              <p className="text-stone-600">No storage, no reheating. Your food is cooked just hours before delivery.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-stone-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <Utensils size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif text-stone-800">Authentic Recipes</h3>
              <p className="text-stone-600">Traditional Bengali recipes passed down through generations.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-stone-50 rounded-2xl">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 font-serif text-stone-800">Limited Orders</h3>
              <p className="text-stone-600">We take limited orders per day to maintain uncompromising quality.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signature Dishes Preview */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Signature Delicacies</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto mb-8">A glimpse of our most loved dishes, prepared with care and authentic spices.</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-stone-600 hover:bg-orange-50 border border-stone-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredDishes.map((dish, i) => {
              const cartItem = cart.find(item => item.id === dish.id);
              return (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-100 group flex flex-col">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img src={dish.img} alt={dish.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    {/* Veg / Non-Veg indicator */}
                    <div className={`absolute top-3 left-3 w-3.5 h-3.5 rounded-full border-2 border-white shadow-md ${dish.dietary === 'Veg' ? 'bg-green-500' : 'bg-red-500'}`} title={dish.dietary} />
                    {dish.tags && dish.tags.length > 0 && (
                      <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                        {dish.tags.map(t => (
                          <span key={t} className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-700">{t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold font-serif text-stone-800 mb-2">{dish.name}</h3>
                    <p className="text-stone-600 text-sm mb-4 flex-1">{dish.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-md">
                        {dish.portion}
                      </span>
                      <span className="text-lg font-bold text-stone-900">{dish.price}</span>
                    </div>
                    <div className="mt-auto pt-4 border-t border-stone-100">
                      {cartItem ? (
                        <div className="flex items-center justify-between bg-orange-50 rounded-lg p-1 border border-orange-100">
                          <button 
                            onClick={() => updateQuantity(dish.id, cartItem.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-orange-600 hover:bg-orange-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-stone-800 w-8 text-center">{cartItem.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(dish.id, cartItem.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart({ id: dish.id, name: dish.name, price: dish.price })}
                          className="w-full flex items-center justify-center gap-2 bg-white border-2 border-orange-600 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-50 transition-colors"
                        >
                          <ShoppingCart size={18} />
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center">
            <Link to="/menu" className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors text-base">
              See Full Menu <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Preview */}
      <section className="py-20 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Simple. Fresh. Made for You.</h2>
              <p className="text-lg text-stone-600 mb-10">We operate differently from restaurants. Every meal is planned and cooked specifically for the families who order.</p>
              
              <div className="space-y-6 mb-10">
                {[
                  "Browse our authentic Bengali menu",
                  "Message us your selection on WhatsApp",
                  "Confirm your order 1 day in advance",
                  "Enjoy freshly prepared, home-cooked food"
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0 mt-1">
                      {i + 1}
                    </div>
                    <p className="text-stone-800 font-medium text-lg pt-1">{step}</p>
                  </div>
                ))}
              </div>
              
              <WhatsAppButton text="Place Your Order" />
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-orange-100 rounded-3xl transform translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop" 
                alt="Cooking process" 
                className="relative rounded-3xl object-cover w-full h-[500px]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Catering Highlight */}
        <section className="py-20 lg:py-24 bg-orange-50 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform -translate-x-1/2 translate-y-1/2"></div>
          
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6">Hosting a get-together or wedding?</h2>
            <p className="text-lg text-stone-700 mb-10 mx-auto">
              Bring the authentic taste of Bengal to your special occasions. We offer customized catering menus for corporate events, house parties, family functions, and intimate weddings.
            </p>
            <WhatsAppButton 
              message="Hi, I need catering for an event" 
              text="Enquire on WhatsApp" 
            />
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-20 lg:py-24 bg-orange-900 text-white text-center overflow-hidden flex flex-col justify-center">
          {/* Decorative pattern */}
          <div 
            className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h2V0h2v20h2V0h2v20h2V0h2v20h2V0h2v20h2v2H20v-1.5zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")` 
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-orange-900/50 to-orange-950/90"></div>
          
          <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Good food takes time. Book your meal today.</h2>
            <p className="text-lg text-orange-100 mb-10">Limited orders accepted daily to ensure the highest quality.</p>
            <WhatsAppButton text="Order on WhatsApp" className="" />
          </div>
        </section>
      </div>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Loved by Families</h2>
            <p className="text-lg text-stone-600">Don't just take our word for it. We've received raving reviews in The Times of India, ANI, Dainik Bhaskar & The Hindu.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Padmashri Pushpesh Pant", text: "A true celebration of Bengali heritage. The flavors are authentic and deeply nostalgic." },
              { name: "Rahul Verma", text: "Babo's Home Kitchen brings back the lost art of slow, home-cooked Bengali meals." },
              { name: "Priya D.", text: "Ordered for a family get-together. The packaging was neat and the food was still warm. Everyone loved it." },
              { name: "Sourav B.", text: "The 1-day advance notice is totally worth it. You can taste the freshness in every bite." }
            ].map((review, i) => (
              <div key={i} className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                </div>
                <p className="text-stone-700 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-stone-900 font-serif">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
