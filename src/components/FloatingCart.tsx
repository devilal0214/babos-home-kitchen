import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function FloatingCart() {
  const { cart, totalItems } = useCart();
  const location = useLocation();

  if (totalItems === 0 || location.pathname === '/cart') {
    return null;
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
      return total + (price * item.quantity);
    }, 0);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md bg-[#25D366]  text-white rounded-2xl shadow-2xl z-40 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
      <Link to="/cart" className="flex items-center justify-between p-4 hover:bg-[#128C7E] transition-colors">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full relative">
            <ShoppingBag size={24} />
            <span className="absolute -top-1 -right-1 bg-white text-stone-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-orange-100">{totalItems} {totalItems === 1 ? 'Item' : 'Items'}</span>
            <span className="font-bold text-lg">₹{calculateTotal()}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 font-medium">
          <span className="whitespace-nowrap">View Cart</span>
          <ChevronRight size={20} />
        </div>
      </Link>
    </div>
  );
}
