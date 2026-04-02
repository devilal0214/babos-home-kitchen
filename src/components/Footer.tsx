import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, MapPin, Phone, Mail, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import WhatsAppButton from './WhatsAppButton';

const exploreLinks: { name: string; path: string; external?: boolean }[] = [
  { name: 'Menu', path: '/menu' },
  { name: 'Catering', path: '/catering' },
  { name: 'Custom Orders', path: '/custom-orders' },
  { name: 'How It Works', path: '/how-it-works' },
  { name: 'Order on WhatsApp', path: 'https://wa.me/917428666405', external: true },
  { name: 'Reviews', path: '/reviews' },
  { name: 'FAQs', path: '/faqs' },
];

const companyLinks: { name: string; path: string; external?: boolean }[] = [
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Media Coverage', path: '/media' },
  { name: 'Brand Repository', path: '/brand' },
  { name: 'CSR Activities', path: '/csr' },
  { name: 'Partner with us', path: '/partner' },
  { name: 'Feed a child', path: '/feed-a-child' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2 mb-6 transition-opacity hover:opacity-90">
              <img src="http://localhost:5173/uploads/gallery/footer-logo.svg" alt="Babo's Home Kitchen" className="h-16 w-auto brightness-0 invert" />
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Authentic Bengali delicacies, made fresh only when you order. No precooking. No shortcuts.<br />
              Just the warmth, nostalgia, and soul of a true Kolkata home kitchen, now in Delhi NCR.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Facebook">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="black"/>
                  <path d="M19.5 16.5H16.5V25H13V16.5H11V13.5H13V11.5C13 9.5 14.2 8.5 16.2 8.5C17.1 8.5 17.8 8.6 18 8.6V10.6H16.8C15.8 10.6 15.5 11.1 15.5 11.8V13.5H19.5L19.5 16.5Z" fill="white"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="Instagram">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="black"/>
                  <path d="M16 9.5C18.16 9.5 18.41 9.51 19.26 9.55C20.04 9.58 20.47 9.72 20.76 9.83C21.14 9.98 21.41 10.16 21.7 10.45C21.99 10.74 22.17 11.01 22.32 11.39C22.43 11.68 22.57 12.11 22.6 12.89C22.64 13.74 22.65 13.99 22.65 16.15C22.65 18.31 22.64 18.56 22.6 19.41C22.57 20.19 22.43 20.62 22.32 20.91C22.17 21.29 21.99 21.56 21.7 21.85C21.41 22.14 21.14 22.32 20.76 22.47C20.47 22.58 20.04 22.72 19.26 22.75C18.41 22.79 18.16 22.8 16 22.8C13.84 22.8 13.59 22.79 12.74 22.75C11.96 22.72 11.53 22.58 11.24 22.47C10.86 22.32 10.59 22.14 10.3 21.85C10.01 21.56 9.83 21.29 9.68 20.91C9.57 20.62 9.43 20.19 9.4 19.41C9.36 18.56 9.35 18.31 9.35 16.15C9.35 13.99 9.36 13.74 9.4 12.89C9.43 12.11 9.57 11.68 9.68 11.39C9.83 11.01 10.01 10.74 10.3 10.45C10.59 10.16 10.86 9.98 11.24 9.83C11.53 9.72 11.96 9.58 12.74 9.55C13.59 9.51 13.84 9.5 16 9.5ZM16 8C13.8 8 13.52 8.01 12.68 8.05C11.84 8.09 11.27 8.22 10.77 8.41C10.25 8.62 9.81 8.89 9.36 9.34C8.91 9.79 8.64 10.23 8.43 10.75C8.24 11.25 8.11 11.82 8.07 12.66C8.03 13.5 8.02 13.78 8.02 15.98C8.02 18.18 8.03 18.46 8.07 19.3C8.11 20.14 8.24 20.71 8.43 21.21C8.64 21.73 8.91 22.17 9.36 22.62C9.81 23.07 10.25 23.34 10.77 23.55C11.27 23.74 11.84 23.87 12.68 23.91C13.52 23.95 13.8 23.96 16 23.96C18.2 23.96 18.48 23.95 19.32 23.91C20.16 23.87 20.73 23.74 21.23 23.55C21.75 23.34 22.19 23.07 22.64 22.62C23.09 22.17 23.36 21.73 23.57 21.21C23.76 20.71 23.89 20.14 23.93 19.3C23.97 18.46 23.98 18.18 23.98 15.98C23.98 13.78 23.97 13.5 23.93 12.66C23.89 11.82 23.76 11.25 23.57 10.75C23.36 10.23 23.09 9.79 22.64 9.34C22.19 8.89 21.75 8.62 21.23 8.41C20.73 8.22 20.16 8.09 19.32 8.05C18.48 8.01 18.2 8 16 8Z" fill="white"/>
                  <path d="M16 11.86C13.72 11.86 11.86 13.72 11.86 16C11.86 18.28 13.72 20.14 16 20.14C18.28 20.14 20.14 18.28 20.14 16C20.14 13.72 18.28 11.86 16 11.86ZM16 18.64C14.54 18.64 13.36 17.46 13.36 16C13.36 14.54 14.54 13.36 16 13.36C17.46 13.36 18.64 14.54 18.64 16C18.64 17.46 17.46 18.64 16 18.64Z" fill="white"/>
                  <path d="M20.66 12.34C21.2123 12.34 21.66 11.8923 21.66 11.34C21.66 10.7877 21.2123 10.34 20.66 10.34C20.1077 10.34 19.66 10.7877 19.66 11.34C19.66 11.8923 20.1077 12.34 20.66 12.34Z" fill="white"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="X (Twitter)">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="black"/>
                  <path d="M18.8 10H21.5L15.6 16.7L22.5 25.8H17.1L12.9 20.3L8.1 25.8H5.4L11.7 18.6L5.1 10H10.7L14.5 15L18.8 10ZM17.9 24.2H19.4L9.8 11.5H8.2L17.9 24.2Z" fill="white"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@baboshomekitchen" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="YouTube">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="black"/>
                  <path d="M23.5 12.5C23.5 12.5 23.3 11.1 22.7 10.5C21.9 9.7 21.0 9.7 20.6 9.6C18.2 9.5 16.0 9.5 16.0 9.5C16.0 9.5 13.8 9.5 11.4 9.6C11.0 9.7 10.1 9.7 9.3 10.5C8.7 11.1 8.5 12.5 8.5 12.5C8.5 12.5 8.3 13.9 8.3 15.3V16.7C8.3 18.1 8.5 19.5 8.5 19.5C8.5 19.5 8.7 20.9 9.3 21.5C10.1 22.3 11.2 22.3 11.6 22.4C13.0 22.5 16.0 22.5 16.0 22.5C16.0 22.5 18.2 22.5 20.6 22.4C21.0 22.3 21.9 22.3 22.7 21.5C23.3 20.9 23.5 19.5 23.5 19.5C23.5 19.5 23.7 18.1 23.7 16.7V15.3C23.7 13.9 23.5 12.5 23.5 12.5ZM14.4 18.3V13.7L18.6 16.0L14.4 18.3Z" fill="white"/>
                </svg>
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity" aria-label="LinkedIn">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="black"/>
                  <path d="M11.5 13.5H8.5V23H11.5V13.5ZM10 12C9 12 8.2 11.2 8.2 10.2C8.2 9.2 9 8.4 10 8.4C11 8.4 11.8 9.2 11.8 10.2C11.8 11.2 11 12 10 12ZM23.5 23H20.5V18.2C20.5 17 20.5 15.5 18.8 15.5C17.1 15.5 16.8 16.8 16.8 18.1V23H13.8V13.5H16.7V14.8H16.7C17.1 14 18.2 13.3 19.5 13.3C22.5 13.3 23.5 15.3 23.5 17.8V23Z" fill="white"/>
                </svg>
              </a>
              <a href="https://wa.me/917428666405" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity" aria-label="WhatsApp">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="black"/>
                  <path d="M16.5 8.5C12.4 8.5 9 11.9 9 16C9 17.6 9.5 19.1 10.4 20.4L9.5 23.5L12.8 22.6C14 23.3 15.2 23.6 16.5 23.6C20.6 23.6 24 20.2 24 16.1C24 12 20.6 8.5 16.5 8.5ZM21.1 18.8C20.9 19.3 19.9 19.8 19.4 19.8C18.9 19.9 18.3 20 15.4 18.8C12.5 17.6 10.7 14.6 10.5 14.4C10.4 14.2 9.4 12.9 9.4 11.5C9.4 10.1 10.1 9.4 10.4 9.1C10.7 8.8 11.1 8.7 11.5 8.7C11.6 8.7 11.7 8.7 11.8 8.7C12.1 8.7 12.3 8.7 12.5 9.2C12.7 9.7 13.2 10.9 13.3 11C13.4 11.1 13.4 11.3 13.3 11.5C13.2 11.7 13.1 11.8 13 12C12.9 12.1 12.7 12.3 12.6 12.4C12.4 12.6 12.3 12.7 12.5 13C12.7 13.3 13.2 14.1 13.9 14.7C14.8 15.5 15.5 15.7 15.8 15.9C16.1 16 16.3 16 16.5 15.8C16.7 15.6 17 15.2 17.3 14.8C17.6 14.4 17.9 14.5 18.2 14.6C18.5 14.7 20.1 15.5 20.4 15.6C20.7 15.8 20.9 15.9 21 16C21.1 16.2 21.1 17.1 21.1 18.8Z" fill="white"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-6">Explore</h3>
                <ul className="space-y-3">
                  {exploreLinks.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                          {link.name}
                        </a>
                      ) : (
                        <Link to={link.path} className="text-sm hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-6">Company</h3>
                <ul className="space-y-3">
                  {companyLinks.map((link) => (
                    <li key={link.name}>
                      {link.external ? (
                        <a href={link.path} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                          {link.name}
                        </a>
                      ) : (
                        <Link to={link.path} className="text-sm hover:text-white transition-colors">
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <span>N-5, Behind HDFC Bank, Block N, Kalkaji,<br />New Delhi, Delhi 110019</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Phone size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <span>+91 7428666405<br />+91 9810016405</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span>baboshomekitchen@gmail.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <WhatsAppButton text="Message Us" className="w-full justify-center" />
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-4 text-xs text-stone-500">
            <p>&copy; {new Date().getFullYear()} Babo's Home Kitchen. All rights reserved.</p>
            <div className="flex items-center gap-3">
              <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
              <span className="text-stone-700">•</span>
              <Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
              <span className="text-stone-700">•</span>
              <span>FSSAI Registered</span>
            </div>
          </div>
          <p className="text-xs text-stone-500 text-center lg:text-right">
            Made with love for the love of Bengali food <span className="text-stone-700 mx-2 hidden sm:inline">•</span><br className="sm:hidden" /> powered by Jai Veeru
          </p>
        </div>
      </div>
    </footer>
  );
}
