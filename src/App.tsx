/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, Search, Facebook, Youtube, Twitter, Instagram, 
  ChevronRight, Play, User, Clock, Eye, Share2, MessageSquare,
  ArrowUp, Bell, Sun, Moon, Smartphone, Home, PlayCircle, Newspaper
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'article' | 'category' | 'videos';

interface NewsItem {
  id: number;
  title: string;
  punjabiTitle: string;
  category: string;
  punjabiCategory: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  views: string;
  readTime: string;
}

// --- Dummy Data ---
const DUMMY_NEWS: NewsItem[] = [
  {
    id: 1,
    title: "Punjab Elections: Major Political Shift Expected in Upcoming Polls",
    punjabiTitle: "ਪੰਜਾਬ ਚੋਣਾਂ: ਆਉਣ ਵਾਲੀਆਂ ਚੋਣਾਂ ਵਿੱਚ ਵੱਡੇ ਸਿਆਸੀ ਬਦਲਾਅ ਦੀ ਉਮੀਦ",
    category: "Politics",
    punjabiCategory: "ਰਾਜਨੀਤੀ",
    author: "Gurpreet Singh",
    date: "24 March 2026",
    image: "https://picsum.photos/seed/politics1/800/500",
    excerpt: "As the election season approaches, political analysts predict a significant shift in the voter base across rural Punjab...",
    views: "12.5K",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "New Development Projects Launched in Ludhiana for Infrastructure",
    punjabiTitle: "ਲੁਧਿਆਣਾ ਵਿੱਚ ਬੁਨਿਆਦੀ ਢਾਂਚੇ ਲਈ ਨਵੇਂ ਵਿਕਾਸ ਪ੍ਰੋਜੈਕਟ ਸ਼ੁਰੂ",
    category: "Development",
    punjabiCategory: "ਵਿਕਾਸ",
    author: "Harpreet Kaur",
    date: "23 March 2026",
    image: "https://picsum.photos/seed/dev1/400/300",
    excerpt: "The state government has announced a series of new projects aimed at improving the urban infrastructure of Ludhiana...",
    views: "8.2K",
    readTime: "4 min"
  },
  {
    id: 3,
    title: "Amritsar Golden Temple Sees Record Footfall During Festival",
    punjabiTitle: "ਅੰਮ੍ਰਿਤਸਰ ਦੇ ਹਰਿਮੰਦਰ ਸਾਹਿਬ ਵਿੱਚ ਤਿਉਹਾਰ ਦੌਰਾਨ ਰਿਕਾਰਡ ਆਮਦ",
    category: "Culture",
    punjabiCategory: "ਸੱਭਿਆਚਾਰ",
    author: "Rajinder Sharma",
    date: "23 March 2026",
    image: "https://picsum.photos/seed/culture1/400/300",
    excerpt: "Thousands of devotees gathered at the holy shrine to celebrate the auspicious occasion, marking a new record...",
    views: "25K",
    readTime: "3 min"
  },
  {
    id: 4,
    title: "Punjab Farmers Propose New Sustainable Agriculture Model",
    punjabiTitle: "ਪੰਜਾਬ ਦੇ ਕਿਸਾਨਾਂ ਨੇ ਨਵੇਂ ਟਿਕਾਊ ਖੇਤੀ ਮਾਡਲ ਦੀ ਤਜਵੀਜ਼ ਰੱਖੀ",
    category: "Agriculture",
    punjabiCategory: "ਖੇਤੀਬਾੜੀ",
    author: "Gurpreet Singh",
    date: "22 March 2026",
    image: "https://picsum.photos/seed/farm1/400/300",
    excerpt: "A group of progressive farmers from Patiala has developed a new model that reduces water consumption significantly...",
    views: "15.1K",
    readTime: "6 min"
  }
];

const CATEGORIES = [
  { name: "Punjab", punjabi: "ਪੰਜਾਬ" },
  { name: "Chandigarh", punjabi: "ਚੰਡੀਗੜ੍ਹ" },
  { name: "Amritsar", punjabi: "ਅੰਮ੍ਰਿਤਸਰ" },
  { name: "Ludhiana", punjabi: "ਲੁਧਿਆਣਾ" },
  { name: "Jalandhar", punjabi: "ਜਲੰਧਰ" },
  { name: "Politics", punjabi: "ਰਾਜਨੀਤੀ" },
  { name: "Crime", punjabi: "ਜ਼ੁਰਮ" },
  { name: "Sports", punjabi: "ਖੇਡਾਂ" },
  { name: "Business", punjabi: "ਵਪਾਰ" },
  { name: "Entertainment", punjabi: "ਮਨੋਰੰਜਨ" }
];

// --- Components ---

const Ticker = () => (
  <div className="ticker-wrap bg-red-600">
    <div className="ticker-content flex items-center space-x-8">
      <span className="font-bold uppercase tracking-wider">ਤਾਜ਼ਾ ਖ਼ਬਰ | Breaking News | Punjab Ka Sach</span>
      <span>• ਪੰਜਾਬ ਵਿੱਚ ਨਵੀਂ ਸਿੱਖਿਆ ਨੀਤੀ ਲਾਗੂ ਹੋਵੇਗੀ</span>
      <span>• ਚੰਡੀਗੜ੍ਹ ਵਿੱਚ ਮੌਸਮ ਨੇ ਲਈ ਕਰਵਟ</span>
      <span>• ਖੇਡ ਜਗਤ: ਪੰਜਾਬ ਦੇ ਖਿਡਾਰੀਆਂ ਨੇ ਜਿੱਤੇ ਸੋਨ ਤਗਮੇ</span>
    </div>
  </div>
);

const Header = ({ 
  currentPage, 
  setPage, 
  darkMode, 
  toggleDarkMode, 
  toggleMenu 
}: { 
  currentPage: Page, 
  setPage: (p: Page) => void, 
  darkMode: boolean, 
  toggleDarkMode: () => void,
  toggleMenu: () => void
}) => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-white dark:bg-brand-navy transition-all duration-300 ${isSticky ? 'sticky top-0 z-50 shadow-lg' : ''}`}>
      {/* Top Bar Info */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 border-b border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
        <div className="flex space-x-4">
          <span>{new Date().toLocaleDateString('pa-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span>Amritsar: 24°C</span>
        </div>
        <div className="flex items-center space-x-4">
          <Facebook size={14} className="cursor-pointer hover:text-brand-saffron" />
          <Twitter size={14} className="cursor-pointer hover:text-brand-saffron" />
          <Instagram size={14} className="cursor-pointer hover:text-brand-saffron" />
          <Youtube size={14} className="cursor-pointer hover:text-brand-saffron" />
        </div>
      </div>

      {/* Main Nav */}
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        <div className="flex items-center space-x-4">
          <button onClick={toggleMenu} className="md:hidden">
            <Menu className="text-brand-navy dark:text-white" />
          </button>
          <div 
            className="cursor-pointer flex flex-col items-start"
            onClick={() => setPage('home')}
          >
            <h1 className="text-2xl md:text-3xl font-black text-brand-navy dark:text-white leading-none">
              <span className="text-brand-saffron">ਪੰਜਾਬ</span> ਕਾ ਸੱਚ
            </h1>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">Punjab Ka Sach</span>
          </div>
        </div>

        <nav className="hidden lg:flex space-x-6 font-hindi font-bold text-brand-navy dark:text-white">
          {CATEGORIES.slice(0, 8).map(cat => (
            <button 
              key={cat.name} 
              onClick={() => setPage('category')}
              className="hover:text-brand-saffron transition-colors"
            >
              {cat.punjabi}
            </button>
          ))}
          <button onClick={() => setPage('videos')} className="hover:text-brand-saffron transition-colors">ਵੀਡੀਓ</button>
        </nav>

        <div className="flex items-center space-x-4">
          <Search className="text-brand-navy dark:text-white cursor-pointer hover:text-brand-saffron" />
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-100 dark:bg-gray-800">
            {darkMode ? <Sun size={18} className="text-yellow-400" /> : <Moon size={18} className="text-brand-navy" />}
          </button>
          <button className="hidden md:block btn-saffron text-sm">Subscribe</button>
        </div>
      </div>
    </header>
  );
};

const HeroSection = ({ onArticleClick }: { onArticleClick: () => void }) => (
  <section className="px-4 md:px-6 py-8">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Featured */}
      <div 
        className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-lg"
        onClick={onArticleClick}
      >
        <img 
          src={DUMMY_NEWS[0].image} 
          alt={DUMMY_NEWS[0].title}
          className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-sm w-fit mb-4">BREAKING</span>
          <h2 className="text-white text-3xl md:text-5xl font-display font-bold mb-4 leading-tight">
            {DUMMY_NEWS[0].punjabiTitle}
          </h2>
          <p className="text-gray-300 text-lg mb-6 hidden md:block">
            {DUMMY_NEWS[0].title}
          </p>
          <div className="flex items-center text-gray-400 text-sm space-x-4">
            <span className="flex items-center"><User size={14} className="mr-1" /> {DUMMY_NEWS[0].author}</span>
            <span className="flex items-center"><Clock size={14} className="mr-1" /> {DUMMY_NEWS[0].date}</span>
          </div>
        </div>
      </div>

      {/* Secondary Featured */}
      <div className="flex flex-col gap-6">
        {DUMMY_NEWS.slice(1, 4).map(news => (
          <div 
            key={news.id} 
            className="flex gap-4 cursor-pointer group"
            onClick={onArticleClick}
          >
            <div className="w-1/3 overflow-hidden rounded-md">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-2/3">
              <span className="text-brand-saffron text-[10px] font-bold uppercase tracking-wider">{news.punjabiCategory}</span>
              <h3 className="text-brand-navy dark:text-white font-hindi font-bold text-sm md:text-base leading-snug group-hover:text-brand-saffron transition-colors">
                {news.punjabiTitle}
              </h3>
              <div className="flex items-center text-gray-400 text-[10px] mt-2">
                <Clock size={10} className="mr-1" /> {news.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CategoryStrip = () => (
  <div className="px-4 md:px-6 py-4 overflow-x-auto whitespace-nowrap scrollbar-hide border-y border-gray-100 dark:border-gray-800">
    <div className="flex space-x-3">
      {CATEGORIES.map(cat => (
        <button 
          key={cat.name}
          className="px-4 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-hindi font-bold hover:bg-brand-saffron hover:text-white hover:border-brand-saffron transition-all"
        >
          {cat.punjabi}
        </button>
      ))}
    </div>
  </div>
);

const LatestNews = ({ onArticleClick }: { onArticleClick: () => void }) => {
  const [items, setItems] = useState(DUMMY_NEWS);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => {
      setItems([...items, ...DUMMY_NEWS.map(n => ({ ...n, id: Math.random() }))]);
      setLoading(false);
    }, 1500);
  };

  return (
    <section className="px-4 md:px-6 py-12">
      <div className="flex justify-between items-center mb-8 border-l-4 border-brand-saffron pl-4">
        <h2 className="text-2xl md:text-3xl font-hindi font-black text-brand-navy dark:text-white">ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ | Latest News</h2>
        <button className="text-brand-saffron font-bold text-sm flex items-center">View All <ChevronRight size={16} /></button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(news => (
          <motion.div 
            layout
            key={news.id} 
            className="card-shadow rounded-xl overflow-hidden bg-white dark:bg-gray-900 cursor-pointer group"
            onClick={onArticleClick}
          >
            <div className="relative overflow-hidden h-48">
              <img 
                src={news.image} 
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-brand-navy text-white text-[10px] font-bold px-2 py-1 rounded">
                {news.punjabiCategory}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg md:text-xl font-hindi font-bold text-brand-navy dark:text-white mb-3 leading-tight group-hover:text-brand-saffron transition-colors">
                {news.punjabiTitle}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                {news.excerpt}
              </p>
              <div className="flex justify-between items-center text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                <span className="flex items-center"><Clock size={12} className="mr-1" /> {news.date}</span>
                <span className="flex items-center"><Eye size={12} className="mr-1" /> {news.views}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button 
          onClick={loadMore}
          disabled={loading}
          className="btn-saffron flex items-center space-x-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span>ਹੋਰ ਖ਼ਬਰਾਂ ਲੋਡ ਕਰੋ | Load More</span>
          )}
        </button>
      </div>
    </section>
  );
};

const VideoSection = () => (
  <section className="bg-brand-navy py-16 px-4 md:px-6">
    <div className="flex justify-between items-center mb-10 border-l-4 border-brand-gold pl-4">
      <h2 className="text-2xl md:text-3xl font-hindi font-black text-white">ਵੀਡੀਓ ਖ਼ਬਰਾਂ | Video News</h2>
      <button className="text-brand-gold font-bold text-sm flex items-center">Watch All <ChevronRight size={16} /></button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[1, 2, 3].map(i => (
        <div key={i} className="group cursor-pointer">
          <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
            <img 
              src={`https://picsum.photos/seed/video${i}/600/400`} 
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-all">
              <div className="w-16 h-16 bg-brand-saffron rounded-full flex items-center justify-center text-white shadow-2xl transform group-hover:scale-110 transition-transform">
                <Play fill="currentColor" size={32} />
              </div>
            </div>
            <span className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded">5:32</span>
          </div>
          <h3 className="text-white font-hindi font-bold text-lg leading-tight group-hover:text-brand-gold transition-colors">
            ਪੰਜਾਬ ਦੀਆਂ ਮੁੱਖ ਖ਼ਬਰਾਂ: ਅੱਜ ਦੀਆਂ ਵੱਡੀਆਂ ਘਟਨਾਵਾਂ 'ਤੇ ਇੱਕ ਨਜ਼ਰ
          </h3>
          <div className="flex items-center text-gray-400 text-xs mt-3 space-x-4">
            <span>2.5M Views</span>
            <span>2 hours ago</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white dark:bg-brand-navy pt-16 border-t border-gray-100 dark:border-gray-800">
    <div className="px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
      <div className="lg:col-span-1">
        <div className="flex flex-col items-start mb-6">
          <h2 className="text-3xl font-black text-brand-navy dark:text-white leading-none">
            <span className="text-brand-saffron">ਪੰਜਾਬ</span> ਕਾ ਸੱਚ
          </h2>
          <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500 dark:text-gray-400">Punjab Ka Sach</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 leading-relaxed">
          ਸੱਚ ਦੀ ਆਵਾਜ਼ — Voice of Truth. Punjab's most trusted news platform delivering authentic journalism from the heart of Punjab.
        </p>
        <div className="flex space-x-4">
          <Facebook className="text-brand-navy dark:text-white hover:text-brand-saffron cursor-pointer" />
          <Twitter className="text-brand-navy dark:text-white hover:text-brand-saffron cursor-pointer" />
          <Instagram className="text-brand-navy dark:text-white hover:text-brand-saffron cursor-pointer" />
          <Youtube className="text-brand-navy dark:text-white hover:text-brand-saffron cursor-pointer" />
        </div>
      </div>

      <div>
        <h4 className="text-brand-navy dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
        <ul className="space-y-3 text-gray-500 dark:text-gray-400 text-sm font-hindi">
          <li className="hover:text-brand-saffron cursor-pointer">ਪੰਜਾਬ</li>
          <li className="hover:text-brand-saffron cursor-pointer">ਰਾਜਨੀਤੀ</li>
          <li className="hover:text-brand-saffron cursor-pointer">ਖੇਡਾਂ</li>
          <li className="hover:text-brand-saffron cursor-pointer">ਮਨੋਰੰਜਨ</li>
          <li className="hover:text-brand-saffron cursor-pointer">ਵਪਾਰ</li>
        </ul>
      </div>

      <div>
        <h4 className="text-brand-navy dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Company</h4>
        <ul className="space-y-3 text-gray-500 dark:text-gray-400 text-sm">
          <li className="hover:text-brand-saffron cursor-pointer">About Us</li>
          <li className="hover:text-brand-saffron cursor-pointer">Contact Us</li>
          <li className="hover:text-brand-saffron cursor-pointer">Privacy Policy</li>
          <li className="hover:text-brand-saffron cursor-pointer">Terms of Service</li>
          <li className="hover:text-brand-saffron cursor-pointer">Advertise</li>
        </ul>
      </div>

      <div>
        <h4 className="text-brand-navy dark:text-white font-bold mb-6 uppercase tracking-wider text-sm">Newsletter</h4>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Get the latest news delivered to your inbox.</p>
        <div className="flex flex-col space-y-2">
          <input 
            type="email" 
            placeholder="Your email address"
            className="px-4 py-2 rounded bg-gray-100 dark:bg-gray-800 border-none focus:ring-2 focus:ring-brand-saffron outline-none text-sm"
          />
          <button className="btn-saffron w-full">Subscribe</button>
        </div>
      </div>
    </div>

    <div className="bg-brand-navy py-6 px-4 md:px-6 text-center border-t border-gray-800">
      <p className="text-gray-400 text-xs">
        © 2025 Punjab Ka Sach. All Rights Reserved. Made with pride for Punjab.
      </p>
    </div>
  </footer>
);

const ArticleDetail = ({ onBack }: { onBack: () => void }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-brand-navy min-h-screen"
    >
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-brand-saffron z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <button 
          onClick={onBack}
          className="flex items-center text-brand-saffron font-bold mb-8 hover:underline"
        >
          <ChevronRight className="rotate-180 mr-2" /> Back to Home
        </button>

        <div className="mb-8">
          <span className="bg-brand-saffron text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">ਪੰਜਾਬ | Punjab</span>
          <h1 className="text-3xl md:text-5xl font-display font-bold mt-6 mb-4 leading-tight dark:text-white">
            {DUMMY_NEWS[0].punjabiTitle}
          </h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 font-serif italic mb-8">
            {DUMMY_NEWS[0].title}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 py-6 border-y border-gray-100 dark:border-gray-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                <img src="https://picsum.photos/seed/author/100/100" alt="Author" referrerPolicy="no-referrer" />
              </div>
              <div>
                <h4 className="font-bold dark:text-white">{DUMMY_NEWS[0].author}</h4>
                <p className="text-xs text-gray-500">Senior Political Correspondent</p>
              </div>
              <button className="text-brand-saffron text-xs font-bold border border-brand-saffron px-3 py-1 rounded-full hover:bg-brand-saffron hover:text-white transition-all">Follow</button>
            </div>
            <div className="flex items-center space-x-4 text-gray-400 text-xs">
              <span className="flex items-center"><Clock size={14} className="mr-1" /> {DUMMY_NEWS[0].date}</span>
              <span className="flex items-center"><Smartphone size={14} className="mr-1" /> 5 min read</span>
            </div>
          </div>

          <div className="flex space-x-2 mt-6">
            <button className="p-2 rounded-full bg-[#25D366] text-white"><Share2 size={18} /></button>
            <button className="p-2 rounded-full bg-[#1877F2] text-white"><Facebook size={18} /></button>
            <button className="p-2 rounded-full bg-[#1DA1F2] text-white"><Twitter size={18} /></button>
            <button className="p-2 rounded-full bg-gray-200 text-gray-600"><MessageSquare size={18} /></button>
          </div>
        </div>

        <div className="relative rounded-xl overflow-hidden mb-10">
          <img 
            src={DUMMY_NEWS[0].image} 
            alt="Hero" 
            className="w-full h-auto"
            referrerPolicy="no-referrer"
          />
          <p className="text-xs text-gray-400 mt-2 italic">Photo: Punjab Ka Sach / Special Correspondent</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none font-serif leading-relaxed text-gray-800 dark:text-gray-300">
          <p className="text-xl font-bold mb-6 first-letter:text-5xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-brand-saffron">
            ਪੰਜਾਬ ਦੀ ਸਿਆਸਤ ਵਿੱਚ ਅੱਜ ਇੱਕ ਵੱਡਾ ਮੋੜ ਆਇਆ ਹੈ। ਆਉਣ ਵਾਲੀਆਂ ਚੋਣਾਂ ਨੂੰ ਲੈ ਕੇ ਸਾਰੀਆਂ ਸਿਆਸੀ ਪਾਰਟੀਆਂ ਨੇ ਆਪਣੀਆਂ ਸਰਗਰਮੀਆਂ ਤੇਜ਼ ਕਰ ਦਿੱਤੀਆਂ ਹਨ। 
            Analysts predict that the upcoming elections will be a three-way contest between the major players.
          </p>
          
          <p className="mb-6">
            Ludhiana, Amritsar, and Jalandhar are becoming the key battlegrounds. The youth vote is expected to play a decisive role this time. 
            ਮਾਹਿਰਾਂ ਦਾ ਮੰਨਣਾ ਹੈ ਕਿ ਇਸ ਵਾਰ ਵੋਟਰਾਂ ਦਾ ਰੁਝਾਨ ਵਿਕਾਸ ਅਤੇ ਰੁਜ਼ਗਾਰ ਦੇ ਮੁੱਦਿਆਂ ਵੱਲ ਜ਼ਿਆਦਾ ਹੋਵੇਗਾ।
          </p>

          <blockquote className="border-l-4 border-brand-gold pl-6 py-4 my-8 bg-gray-50 dark:bg-gray-800 italic text-2xl font-display text-brand-navy dark:text-white">
            "This election is not just about power, it's about the future of Punjab's youth and agriculture."
          </blockquote>

          <p className="mb-6">
            The state government has also announced several new schemes for farmers. 
            ਕਿਸਾਨ ਜਥੇਬੰਦੀਆਂ ਨੇ ਇਨ੍ਹਾਂ ਐਲਾਨਾਂ 'ਤੇ ਮਿਲੀ-ਜੁਲੀ ਪ੍ਰਤੀਕਿਰਿਆ ਦਿੱਤੀ ਹੈ। ਕੁਝ ਦਾ ਕਹਿਣਾ ਹੈ ਕਿ ਇਹ ਸਿਰਫ ਚੋਣ ਸਟੰਟ ਹਨ, ਜਦਕਿ ਦੂਜੇ ਇਸ ਨੂੰ ਸਹੀ ਦਿਸ਼ਾ ਵਿੱਚ ਕਦਮ ਮੰਨ ਰਹੇ ਹਨ।
          </p>

          <div className="my-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
            <span className="text-[10px] uppercase text-gray-400 mb-2 block">Advertisement</span>
            <div className="h-32 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
              <p className="text-gray-400">Leaderboard Ad Slot (728x90)</p>
            </div>
          </div>

          <p className="mb-6">
            As the campaign intensifies, we will see more rallies and public meetings across the state. 
            ਪੰਜਾਬ ਕਾ ਸੱਚ ਤੁਹਾਨੂੰ ਹਰ ਪਲ ਦੀ ਖ਼ਬਰ ਦਿੰਦਾ ਰਹੇਗਾ। ਸਾਡੇ ਨਾਲ ਜੁੜੇ ਰਹੋ।
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
          <h3 className="text-xl font-bold mb-6 dark:text-white">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['#Punjab', '#Elections', '#Politics', '#AAP', '#Congress', '#Farmers'].map(tag => (
              <span key={tag} className="px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:bg-brand-saffron hover:text-white transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Author Bio */}
        <div className="mt-12 p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full overflow-hidden shrink-0">
            <img src="https://picsum.photos/seed/author/200/200" alt="Author" referrerPolicy="no-referrer" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold dark:text-white">{DUMMY_NEWS[0].author}</h4>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Gurpreet is a veteran journalist with over 15 years of experience covering Punjab politics and social issues.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <Twitter size={16} className="text-gray-400 hover:text-brand-saffron cursor-pointer" />
              <Instagram size={16} className="text-gray-400 hover:text-brand-saffron cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showCookie, setShowCookie] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // PWA Manifest
    const manifest = {
      name: "Punjab Ka Sach",
      short_name: "PKS News",
      description: "Punjab's most trusted news source.",
      start_url: "/",
      display: "standalone",
      background_color: "#0A1628",
      theme_color: "#E8560A",
      icons: [
        {
          src: "https://picsum.photos/seed/pks/192/192",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "https://picsum.photos/seed/pks/512/512",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };
    const stringManifest = JSON.stringify(manifest);
    const blob = new Blob([stringManifest], { type: 'application/json' });
    const manifestURL = URL.createObjectURL(blob);
    const link = document.createElement('link');
    link.rel = 'manifest';
    link.href = manifestURL;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
      URL.revokeObjectURL(manifestURL);
    };
  }, []);

  useEffect(() => {
    // Dark Mode
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    // Popups
    const hasSeenPopup = sessionStorage.getItem('seen_popup');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => setShowPopup(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 15000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closePopup = () => {
    setShowPopup(false);
    sessionStorage.setItem('seen_popup', 'true');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Ticker />
      
      <Header 
        currentPage={page} 
        setPage={(p) => { setPage(p); window.scrollTo(0, 0); }} 
        darkMode={darkMode} 
        toggleDarkMode={() => setDarkMode(!darkMode)}
        toggleMenu={() => setMenuOpen(true)}
      />

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HeroSection onArticleClick={() => setPage('article')} />
              <CategoryStrip />
              <LatestNews onArticleClick={() => setPage('article')} />
              
              {/* Newsletter Banner */}
              <section className="bg-brand-navy py-16 px-4 md:px-6 text-center">
                <h2 className="text-3xl md:text-4xl font-hindi font-black text-brand-gold mb-4">
                  ਸੱਚ ਦੀਆਂ ਖ਼ਬਰਾਂ ਸਿੱਧੀਆਂ ਤੁਹਾਡੇ ਇਨਬਾਕਸ ਵਿੱਚ
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Subscribe to our newsletter and never miss an update from Punjab.
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                  <button className="btn-saffron whitespace-nowrap">Subscribe Free</button>
                </div>
              </section>

              <VideoSection />
            </motion.div>
          )}

          {page === 'article' && (
            <ArticleDetail key="article" onBack={() => setPage('home')} />
          )}

          {page === 'category' && (
            <motion.div 
              key="category"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 md:px-6 py-12"
            >
              <div className="bg-brand-navy p-12 rounded-2xl mb-12 text-center">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">ਰਾਜਨੀਤੀ | Politics</h1>
                <p className="text-brand-gold font-bold">1,243 ਖ਼ਬਰਾਂ | Stories</p>
              </div>
              <LatestNews onArticleClick={() => setPage('article')} />
            </motion.div>
          )}

          {page === 'videos' && (
            <VideoSection key="videos" />
          )}
        </AnimatePresence>
      </main>

      <Footer />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100]"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white dark:bg-brand-navy z-[101] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-black dark:text-white">MENU</h2>
                <button onClick={() => setMenuOpen(false)}><X className="dark:text-white" /></button>
              </div>
              <nav className="flex flex-col space-y-6 font-hindi font-bold text-lg dark:text-white">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.name} 
                    onClick={() => { setPage('category'); setMenuOpen(false); }}
                    className="text-left hover:text-brand-saffron"
                  >
                    {cat.punjabi}
                  </button>
                ))}
                <button 
                  onClick={() => { setPage('videos'); setMenuOpen(false); }}
                  className="text-left hover:text-brand-saffron"
                >
                  ਵੀਡੀਓ
                </button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Breaking News Popup */}
      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center z-[200] px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80"
              onClick={closePopup}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-brand-navy rounded-2xl overflow-hidden max-w-lg w-full relative z-[201] shadow-2xl"
            >
              <div className="bg-brand-saffron p-6 text-white flex justify-between items-center">
                <h3 className="text-xl font-bold">ਤਾਜ਼ਾ ਬ੍ਰੇਕਿੰਗ ਨਿਊਜ਼</h3>
                <button onClick={closePopup}><X size={24} /></button>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex gap-4 items-start border-b border-gray-100 dark:border-gray-800 pb-4 last:border-0">
                      <div className="w-4 h-4 mt-1 bg-red-600 rounded-full animate-pulse shrink-0" />
                      <div>
                        <h4 className="font-hindi font-bold text-lg dark:text-white leading-tight">ਪੰਜਾਬ ਵਿੱਚ ਨਵੀਂ ਸਿੱਖਿਆ ਨੀਤੀ ਲਾਗੂ ਹੋਵੇਗੀ, ਸਰਕਾਰ ਦਾ ਵੱਡਾ ਫੈਸਲਾ</h4>
                        <button className="text-brand-saffron text-sm font-bold mt-2">Read Now</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={closePopup} className="btn-saffron w-full mt-8">Close</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Push Notification Prompt */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-brand-navy border-t border-gray-100 dark:border-gray-800 p-4 z-[150] shadow-2xl md:max-w-md md:left-auto md:right-6 md:bottom-6 md:rounded-xl md:border"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-brand-saffron/10 rounded-full flex items-center justify-center text-brand-saffron">
                <Bell size={24} />
              </div>
              <div className="flex-grow">
                <h4 className="font-bold text-sm dark:text-white">ਤਾਜ਼ਾ ਖ਼ਬਰਾਂ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਪਾਓ</h4>
                <p className="text-xs text-gray-500">Get Breaking News First</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setShowNotification(false)}
                className="flex-grow py-2 rounded-lg bg-brand-saffron text-white text-sm font-bold"
              >
                Allow
              </button>
              <button 
                onClick={() => setShowNotification(false)}
                className="flex-grow py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-bold"
              >
                Not Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cookie Consent */}
      <AnimatePresence>
        {showCookie && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-6 left-6 z-[140] bg-brand-navy text-white p-6 rounded-xl shadow-2xl max-w-sm border border-white/10"
          >
            <p className="text-sm mb-4">
              ਅਸੀਂ ਕੂਕੀਜ਼ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਹਾਂ | We use cookies for better experience.
            </p>
            <div className="flex gap-4">
              <button onClick={() => setShowCookie(false)} className="text-brand-gold text-sm font-bold">Accept</button>
              <button onClick={() => setShowCookie(false)} className="text-gray-400 text-sm font-bold">Learn More</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-12 h-12 bg-brand-saffron text-white rounded-full flex items-center justify-center shadow-2xl z-[130]"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-brand-navy border-t border-gray-100 dark:border-gray-800 flex justify-around py-3 z-[120]">
        <button onClick={() => setPage('home')} className={`flex flex-col items-center ${page === 'home' ? 'text-brand-saffron' : 'text-gray-400'}`}>
          <Home size={20} />
          <span className="text-[10px] mt-1">Home</span>
        </button>
        <button onClick={() => setPage('category')} className={`flex flex-col items-center ${page === 'category' ? 'text-brand-saffron' : 'text-gray-400'}`}>
          <Newspaper size={20} />
          <span className="text-[10px] mt-1">Punjab</span>
        </button>
        <button onClick={() => setPage('videos')} className={`flex flex-col items-center ${page === 'videos' ? 'text-brand-saffron' : 'text-gray-400'}`}>
          <PlayCircle size={20} />
          <span className="text-[10px] mt-1">Videos</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <Search size={20} />
          <span className="text-[10px] mt-1">Search</span>
        </button>
        <button onClick={() => setMenuOpen(true)} className="flex flex-col items-center text-gray-400">
          <Menu size={20} />
          <span className="text-[10px] mt-1">Menu</span>
        </button>
      </div>
    </div>
  );
}
