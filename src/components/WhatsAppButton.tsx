import React from 'react';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  text?: string;
  isFloating?: boolean;
}

export default function WhatsAppButton({ 
  message = "Hi, I want to place an order for tomorrow", 
  className = "",
  text,
  isFloating = false
}: WhatsAppButtonProps) {
  const phoneNumber = "917428666405"; // Primary WhatsApp number
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  if (isFloating) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full hover:bg-[#128C7E] transition-colors z-50 flex items-center justify-center ${className}`}
        aria-label="Order on WhatsApp"
      >
        <MessageCircle size={28} />
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#128C7E] transition-colors text-base ${className}`}
    >
      <MessageCircle size={20} />
      {text || "Order on WhatsApp"}
    </a>
  );
}
