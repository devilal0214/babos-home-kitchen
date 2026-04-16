import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSEO } from '../context/SEOContext';

const DEFAULTS: Record<string, { title: string; description: string; keywords: string; ogImage: string }> = {
  '/': {
    title: "Babo's Home Kitchen — Authentic Bengali Home-Cooked Food",
    description: 'Order authentic Bengali home-cooked meals prepared by Chef Babo. Freshly made, no storage, no reheating. Order at least 1 day in advance.',
    keywords: 'Bengali food, home cooked, Babo kitchen, Kolkata food, authentic Bengali cuisine, order Bengali food online',
    ogImage: 'https://baboshomekitchen.in/uploads/gallery/main-banner-image.png',
  },
  '/menu': {
    title: "Our Menu — Babo's Home Kitchen",
    description: 'Explore our full menu of authentic Bengali dishes — from Kosha Mangsho and Hilsa Bhapa to sweets and starters.',
    keywords: 'Bengali menu, Kosha Mangsho, Hilsa, Bengali sweets, home cooked Bengali food menu',
    ogImage: 'https://baboshomekitchen.in/uploads/gallery/main-banner-image.png',
  },
  '/about': {
    title: "About Chef Babo — Babo's Home Kitchen",
    description: "Learn about Chef Babo's culinary journey and the story behind Babo's Home Kitchen.",
    keywords: "Chef Babo, Bengali chef, home kitchen, about us",
    ogImage: 'https://baboshomekitchen.in/uploads/gallery/main-banner-image.png',
  },
  '/contact': {
    title: "Contact Us — Babo's Home Kitchen",
    description: "Get in touch with Babo's Home Kitchen for orders, enquiries, and catering requests.",
    keywords: 'contact Babo kitchen, Bengali food order, catering enquiry',
    ogImage: 'https://baboshomekitchen.in/uploads/gallery/main-banner-image.png',
  },
  '/catering': {
    title: "Catering Services — Babo's Home Kitchen",
    description: 'Book authentic Bengali catering for your events, celebrations, and corporate gatherings.',
    keywords: 'Bengali catering, event catering, corporate catering, Babo catering',
    ogImage: 'https://baboshomekitchen.in/uploads/gallery/main-banner-image.png',
  },
  '/how-it-works': {
    title: "How It Works — Babo's Home Kitchen",
    description: 'Learn how to place your order with Babo\'s Home Kitchen — simple steps to get fresh Bengali food delivered.',
    keywords: 'how to order, delivery process, Babo kitchen ordering',
    ogImage: 'https://baboshomekitchen.in/uploads/gallery/main-banner-image.png',
  },
};

const SITE_DEFAULT = {
  title: "Babo's Home Kitchen",
  description: 'Authentic Bengali home-cooked food by Chef Babo. Order fresh, handcrafted meals 1 day in advance.',
  keywords: "Babo's Home Kitchen, Bengali food, home cooked",
  ogImage: 'https://baboshomekitchen.in/uploads/gallery/main-banner-image.png',
};

function setTag(selector: string, attr: string, value: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function SEOHead() {
  const { pathname } = useLocation();
  const { settings } = useSEO();

  useEffect(() => {
    const row = settings.find((s) => s.page_path === pathname);
    const def = DEFAULTS[pathname] || SITE_DEFAULT;

    const title = row?.meta_title || def.title;
    const description = row?.meta_description || def.description;
    const keywords = row?.meta_keywords || def.keywords;
    const ogImage = row?.og_image || def.ogImage;

    // Title
    document.title = title;

    // Standard meta
    setTag('meta[name="description"]', 'name', 'description', description);
    setTag('meta[name="keywords"]', 'name', 'keywords', keywords);

    // OG
    setTag('meta[property="og:title"]', 'property', 'og:title', title);
    setTag('meta[property="og:description"]', 'property', 'og:description', description);
    setTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    setTag('meta[property="og:url"]', 'property', 'og:url', window.location.href);
    setTag('meta[property="og:type"]', 'property', 'og:type', 'website');

    // Twitter card
    setTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    setTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);
  }, [pathname, settings]);

  return null;
}
