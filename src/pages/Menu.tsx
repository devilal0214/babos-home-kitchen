import React, { useState } from 'react';
import { Info, Search, Plus, Minus, ShoppingCart } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';
import { useMenuData } from '../context/MenuDataContext';

export default function Menu() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, addToCart, updateQuantity } = useCart();
  const { menuItems, categories, loading, error } = useMenuData();

  const toggleCategory = (category: string) => {
    if (category === "All") {
      setActiveCategories([]);
      return;
    }
    
    setActiveCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategories.length === 0 || activeCategories.some(c => {
      const lowerC = c.toLowerCase();
      return item.category.toLowerCase() === lowerC ||
             item.dietary?.toLowerCase() === lowerC ||
             item.tags?.some(t => t.toLowerCase() === lowerC);
    });
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center py-16">
        <div className="text-stone-400 text-lg">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-stone-50 min-h-screen flex items-center justify-center py-16">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load menu</p>
          <p className="text-stone-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Search */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">Our Menu</h1>
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Info size={16} />
            All dishes are made fresh on order (1 day advance required)
          </div>
          
          <div className="relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="text"
              placeholder="Search for dishes, ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-3 border border-stone-200 rounded-full leading-5 bg-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => {
            const isActive = category === "All" ? activeCategories.length === 0 : activeCategories.includes(category);
            return (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-stone-900 text-white' 
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-orange-300 hover:text-orange-700'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item) => {
            const cartItem = cart.find(c => c.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-2xl border border-stone-100 overflow-hidden group flex flex-col hover:border-orange-200 transition-colors">
                  <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  {/* Veg / Non-Veg indicator */}
                  <img src={item.dietary === 'Veg' ? 'https://babos.jaiveeru.site/uploads/gallery/Veg.svg' : 'https://babos.jaiveeru.site/uploads/gallery/Non_Veg_.svg'} alt={item.dietary} title={item.dietary} className="absolute top-3 left-3 w-6 h-6 drop-shadow" />
                  {item.tags && item.tags.length > 0 && (
                    <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                      {item.tags.map(t => (
                        <div key={t} className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-700">{t}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="text-xl font-bold font-serif text-stone-900">{item.name}</h3>
                    <span className="text-lg font-bold text-stone-900">{item.price}</span>
                  </div>
                  <p className="text-stone-600 text-sm mb-6 flex-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-md">
                      {item.portion}
                    </span>
                    <div className="w-auto">
                      {cartItem ? (
                        <div className="flex items-center justify-between bg-orange-50 rounded-lg p-1 border border-orange-100 w-[100px]">
                          <button 
                            onClick={() => updateQuantity(item.id, cartItem.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-orange-600 hover:bg-orange-100 transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-bold text-stone-800 w-8 text-center">{cartItem.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, cartItem.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-md bg-orange-600 text-white hover:bg-orange-700 transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => addToCart({ id: item.id, name: item.name, price: item.price })}
                          className="flex items-center justify-center gap-2 bg-white border-2 border-orange-600 text-orange-600 px-4 py-1.5 rounded-lg font-medium hover:bg-orange-50 transition-colors text-sm"
                        >
                          <ShoppingCart size={16} />
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center bg-orange-50 p-10 rounded-3xl border border-orange-100 max-w-3xl mx-auto">
          <h3 className="text-3xl font-serif font-bold text-stone-900 mb-4">Ready to order?</h3>
          <p className="text-lg text-stone-600 mb-8">Send us your selected items on WhatsApp. Remember, we need 1 day advance notice!</p>
          <WhatsAppButton 
            message="Hi, I'd like to place an order from the menu for tomorrow." 
            text="Order on WhatsApp with selected items" 
            className="w-full sm:w-auto"
          />
        </div>

      </div>
    </div>
  );
}
