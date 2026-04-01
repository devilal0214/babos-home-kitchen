import React, { useState } from 'react';
import { Info, Search, Plus, Minus, ShoppingCart } from 'lucide-react';
import WhatsAppButton from '../components/WhatsAppButton';
import { useCart } from '../context/CartContext';

const menuItems = [
  { id: 1, name: "Bhetki Fish Fry", description: "A Kolkata legend! Four pieces of premium, boneless Bhetki (Barramundi) fillets, marinated in a zesty green herb paste. Double-coated in crispy breadcrumbs.", price: "₹600", portion: "4 Pcs, Serves 2", category: "Starters", dietary: "Non Veg", tag: "Popular", img: "https://images.unsplash.com/photo-1626804475297-41609ea0eb49?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Prawn Cutlet", description: "Crispy cutlets made with prawns and spices, shallow-fried for a crunchy outside and juicy inside.", price: "₹750", portion: "3 Pcs, Serves 2", category: "Starters", dietary: "Non Veg", img: "https://images.unsplash.com/photo-1599487405609-88091176882c?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Aloo Posto", description: "Traditional Bengali dish of potatoes cooked with poppy seed paste, mildly spiced and creamy.", price: "₹350", portion: "400 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Bhindi Torkari", description: "Okra cooked with light spices in a Bengali-style curry, simple, healthy, and perfect with rice or roti.", price: "₹250", portion: "400 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1626509653294-1d0111f1816e?q=80&w=800&auto=format&fit=crop" },
  { id: 5, name: "Dhokar Dalna", description: "Bengali delicacy of lentil cakes simmered in a spiced gravy, offering a unique texture and comforting flavor.", price: "₹400", portion: "500 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop" },
  { id: 6, name: "Dum Aloo", description: "Baby potatoes slow-cooked in a spicy curry sauce, rich and flavorful, often served with luchi or rice.", price: "₹250", portion: "400 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop" },
  { id: 7, name: "Echorer Torkari", description: "Raw jackfruit curry cooked with Bengali spices, known for its meat-like texture and delicious taste.", price: "₹350", portion: "500 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop" },
  { id: 8, name: "Ghee Bhaat", description: "Steamed rice mixed with fragrant ghee, simple yet rich, often served as a comfort food with curries.", price: "₹300", portion: "750 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop" },
  { id: 9, name: "Luchi", description: "Soft, deep-fried Bengali bread made from refined flour, served with curries like aloo dum or cholar dal.", price: "₹250", portion: "6 Pcs, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop" },
  { id: 10, name: "Mochar Ghonto", description: "Banana flower curry cooked with spices and sometimes coconut, a traditional Bengali dish with earthy flavor.", price: "₹360", portion: "400 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop" },
  { id: 11, name: "Pandal Khichuri", description: "Bengali-style khichuri cooked with lentils, rice, ghee, and spices, often served during festivals.", price: "₹450", portion: "1000 ML, Min. 3 Plates", category: "Main Course", dietary: "Veg", tag: "Popular", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop" },
  { id: 12, name: "Shukto", description: "Classic Bengali mixed vegetable curry with a mild bitter touch, served as a traditional starter dish.", price: "₹325", portion: "400 ML, Serves 2", category: "Main Course", dietary: "Veg", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop" },
  { id: 13, name: "Chicken Biriyani", description: "Aromatic basmati rice cooked with tender chicken pieces, spices, and herbs, a flavorful Bengali biriyani classic.", price: "₹650", portion: "750 ML, Serves 2", category: "Main Course", dietary: "Non Veg", tag: "Popular", img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop" },
  { id: 14, name: "Deem Posto", description: "Eggs cooked in a rich poppy seed gravy, mildly spiced, creamy, and best enjoyed with steamed rice.", price: "₹360", portion: "400 ML, Serves 2", category: "Main Course", dietary: "Non Veg", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop" },
  { id: 15, name: "Hilsa Bhapa", description: "Famous Bengali steamed hilsa fish cooked with mustard paste and spices, aromatic and a true delicacy.", price: "₹850", portion: "1 Pc, Serves 1", category: "Main Course", dietary: "Non Veg", tag: "Signature", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=800&auto=format&fit=crop" },
  { id: 16, name: "Muri Ghonto", description: "Bengali fish head curry cooked with rice and spices, rich and flavorful, often served as a special delicacy.", price: "₹400", portion: "500 ML, Serves 2", category: "Main Course", dietary: "Non Veg", img: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop" },
  { id: 17, name: "Mutton Biriyani", description: "Fragrant biriyani rice cooked with tender mutton pieces and aromatic spices, a hearty and festive Bengali favorite.", price: "₹750", portion: "750 ML, Serves 2", category: "Main Course", dietary: "Non Veg", tag: "Signature", img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop" },
  { id: 18, name: "Mutton Rezala", description: "Creamy Mughlai-style mutton curry with yogurt and mild spices, rich, royal, and best paired with luchi or rice.", price: "₹1900", portion: "1000 ML, Family Pack", category: "Main Course", dietary: "Non Veg", img: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?q=80&w=800&auto=format&fit=crop" },
  { id: 19, name: "Rohu Fish Pulao", description: "Spiced pulao rice cooked with Rohu fish pieces, aromatic and flavorful, blending fish curry taste with rice.", price: "₹700", portion: "750 ML, Serves 2", category: "Main Course", dietary: "Non Veg", img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop" },
  { id: 20, name: "Rohu Kalia", description: "Rohu fish cooked in a rich, spicy Bengali gravy, slightly thick and perfect with steamed rice.", price: "₹650", portion: "3 Pcs, Serves 2", category: "Main Course", dietary: "Non Veg", img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=800&auto=format&fit=crop" },
  { id: 21, name: "Mishti Doi", description: "Classic Bengali sweet yogurt, rich, creamy, and perfectly caramelized.", price: "₹150", portion: "250 ML, Serves 2", category: "Deserts", dietary: "Veg", tag: "Popular", img: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?q=80&w=800&auto=format&fit=crop" },
  { id: 22, name: "Rosogolla", description: "Spongy cottage cheese balls soaked in light sugar syrup, a quintessential Bengali sweet.", price: "₹100", portion: "4 Pcs, Serves 2", category: "Deserts", dietary: "Veg", img: "https://images.unsplash.com/photo-1605197132819-d29314451009?q=80&w=800&auto=format&fit=crop" },
];

const categories = ["All", "Veg", "Non Veg", "Starters", "Main Course", "Deserts", "Popular", "Signature"];

export default function Menu() {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, addToCart, updateQuantity } = useCart();

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
             item.tag?.toLowerCase() === lowerC;
    });
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <div className="h-56 overflow-hidden relative">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  {item.tag && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-700">
                      {item.tag}
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
