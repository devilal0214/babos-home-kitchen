import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import WhatsAppButton from '../components/WhatsAppButton';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, totalItems } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
      return total + (price * item.quantity);
    }, 0);
  };

  const generateWhatsAppMessage = () => {
    let message = "Hi Babo's Home Kitchen! I'd like to place an order for tomorrow:\n\n";
    cart.forEach(item => {
      message += `${item.quantity}x ${item.name} (${item.price})\n`;
    });
    message += `\nTotal: ₹${calculateTotal()}`;
    return message;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl text-center max-w-md w-full">
          <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 mb-4">Your Cart is Empty</h1>
          <p className="text-stone-600 mb-8">
            Looks like you haven't added any authentic Bengali delicacies to your cart yet.
          </p>
          <Link 
            to="/menu"
            className="inline-flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors text-base"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8">Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-serif text-stone-900">{item.name}</h3>
                  <p className="text-stone-600 font-medium">{item.price}</p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-6">
                  <div className="flex items-center justify-between bg-stone-50 rounded-lg p-1 border border-stone-200 w-[120px]">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold text-stone-800 w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl border border-stone-200 sticky top-24">
              <h3 className="text-xl font-bold font-serif text-stone-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6 pb-6 border-b border-stone-100">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Delivery</span>
                  <span>Calculated on WhatsApp</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-stone-900 mb-8">
                <span>Total</span>
                <span>₹{calculateTotal()}</span>
              </div>
              
              <WhatsAppButton 
                message={generateWhatsAppMessage()} 
                text="Confirm on WhatsApp" 
                className="w-full justify-center"
              />
              
              <p className="text-xs text-stone-500 text-center mt-4">
                Orders require 1 day advance notice. We will confirm your order and delivery details on WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
