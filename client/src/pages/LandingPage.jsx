import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Map as MapIcon, 
  Package, 
  RefreshCcw, 
  Users, 
  History, 
  Lock, 
  ChevronRight, 
  Code, 
  ArrowRight,
  Menu,
  X,
  CheckCircle,
  Clock,
  Shield,
  Smartphone,
  Globe,
  Star,
  Activity,
  Navigation,
  Signal,
  MapPin,
  Search,
  Plus,
  Minus
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Solutions', href: '#how-it-works' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center shadow-lg shadow-brand-red/20 group-hover:scale-110 transition-transform">
            <img src="/vite2.png" alt="Logo" className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            TrackRiders
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-500 hover:text-brand-red transition-all font-medium text-sm"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-4 pl-6 border-l border-slate-200 ml-2">
            <Link to="/rider-login" className="text-slate-900 font-bold text-xs uppercase tracking-widest hover:text-brand-red transition-colors">
              Rider Portal
            </Link>
            <Link to="/login" className="bg-slate-900 px-6 py-3 rounded-full text-white font-bold text-xs uppercase tracking-widest hover:bg-brand-red transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-slate-900 font-bold text-lg" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <div className="flex flex-col gap-4">
                <Link to="/rider-login" className="w-full py-4 rounded-2xl font-bold text-center text-slate-900 border border-slate-200" onClick={() => setMobileMenuOpen(false)}>Rider Portal</Link>
                <Link to="/login" className="w-full bg-brand-red py-4 rounded-2xl font-bold text-center text-white shadow-xl shadow-brand-red/20" onClick={() => setMobileMenuOpen(false)}>Admin Access</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const MapMonitoringAnimation = () => {
  const routePath = "M 100 150 L 200 150 L 200 300 L 600 300 L 600 450 L 700 450";

  return (
    <div className="relative w-full aspect-square lg:aspect-[4/3] bg-slate-950 rounded-[48px] overflow-hidden shadow-2xl border border-white/5 group">
      
      {/* --- Stylized City Map Background --- */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 150 H800 M0 450 H800 M200 0 V600 M600 0 V600" stroke="#334155" strokeWidth="40" strokeLinecap="round" />
          <path d="M400 0 V600 M0 300 H800" stroke="#334155" strokeWidth="20" strokeLinecap="round" opacity="0.5" />
          <rect x="230" y="180" width="140" height="90" rx="12" fill="#1e293b" />
          <rect x="430" y="180" width="140" height="90" rx="12" fill="#1e293b" />
          <rect x="230" y="330" width="140" height="90" rx="12" fill="#1e293b" />
          <rect x="430" y="330" width="140" height="90" rx="12" fill="#1e293b" />
        </svg>
      </div>

      {/* --- Destination Marker --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute left-[87.5%] top-[75%] -translate-x-1/2 -translate-y-[80%] z-30 flex flex-col items-center"
      >
        <div className="bg-brand-red text-white p-2 rounded-xl shadow-2xl border-2 border-white/20 animate-bounce">
          <MapPin size={16} fill="currentColor" />
        </div>
        <div className="mt-2 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/5">
           Delivery Point
        </div>
      </motion.div>

      {/* --- Tracking Path --- */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 800 600">
        {/* Base Static Path */}
        <path
          d={routePath}
          fill="transparent"
          stroke="#334155"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.3"
        />
        
        {/* Orange Overlay Path (Progress) */}
        <motion.path
          d={routePath}
          fill="transparent"
          stroke="#f97316" // Orange-500
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* Start Point */}
        <circle cx="100" cy="150" r="5" fill="#10b981" />
      </svg>

      {/* --- Moving Rider Icon (Slower - 15s) --- */}
      <motion.div
        className="absolute w-12 h-12 z-20 flex items-center justify-center"
        style={{ x: "-50%", y: "-50%" }}
        animate={{ 
          left: ["12.5%", "25%", "25%", "75%", "75%", "87.5%"],
          top: ["25%", "25%", "50%", "50%", "75%", "75%"],
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.1111, 0.2778, 0.7222, 0.8889, 1]
        }}
      >
        <div className="relative">
          {/* Icon Wrapper that rotates */}
          <motion.div
            animate={{ 
              rotate: [0, 0, 90, 0, 90, 0]
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity, 
              ease: "linear",
              times: [0, 0.1111, 0.2778, 0.7222, 0.8889, 1]
            }}
          >
            <div className="absolute inset-0 bg-orange-500 rounded-full blur-2xl opacity-40 scale-150 animate-pulse"></div>
            <div className="w-9 h-9 bg-orange-500 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center">
              <Navigation className="w-5 h-5 text-white fill-white" />
            </div>
          </motion.div>
          
          {/* Live Rider Label */}
          <div className="absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-white px-3 py-1.5 rounded-xl shadow-2xl border border-slate-100 text-[9px] font-black text-slate-900 whitespace-nowrap">
             TR-204 • Moving
          </div>
        </div>
      </motion.div>

      {/* --- HUD Monitoring Overlays --- */}
      <div className="absolute top-8 right-8 flex flex-col items-end gap-2 z-30">
        <div className="bg-slate-900/60 backdrop-blur-md border border-white/5 p-2 rounded-xl flex items-center gap-2">
           <Search size={12} className="text-slate-500" />
           <div className="w-12 h-1 bg-white/10 rounded-full"></div>
        </div>
      </div>

      <div className="absolute top-8 left-8 flex flex-row gap-3 z-30">
        <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl flex items-center gap-3 backdrop-blur-sm">
          <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <Signal className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Signal</div>
            <div className="text-[10px] font-bold text-emerald-500 tracking-tight leading-none">EXCELLENT</div>
          </div>
        </div>

        <button className="bg-slate-900/80 hover:bg-orange-500 transition-all border border-white/5 p-3 rounded-2xl backdrop-blur-md flex items-center gap-3 group">
           <Clock size={16} className="text-orange-500 group-hover:text-white transition-colors" />
           <div className="text-left">
              <div className="text-[8px] font-bold text-slate-500 group-hover:text-white/70 uppercase tracking-widest leading-none mb-1">Estimated ETA</div>
              <div className="text-sm font-bold text-white tracking-tight leading-none">08:15 <span className="text-[9px] opacity-40 ml-0.5">MIN</span></div>
           </div>
        </button>
      </div>

      {/* Minimal Bottom Label */}
      <div className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 bg-slate-900/60 backdrop-blur-md border border-white/5 rounded-full z-30">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Monitoring Node #88</span>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white p-8 lg:p-12 rounded-[32px] border border-slate-100 hover:border-brand-red/20 transition-all group shadow-sm hover:shadow-xl"
    >
      <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-brand-red group-hover:text-white transition-all duration-500">
        <Icon size={24} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed font-medium">
        {description}
      </p>
    </motion.div>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-white text-slate-900 min-h-screen selection:bg-brand-red/10 overflow-x-hidden font-sans">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 px-6 lg:px-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-red/5 rounded-full blur-[140px] -z-10 translate-x-1/4 -translate-y-1/4"></div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left flex flex-col items-center lg:items-start"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-widest mb-10">
                <Star size={12} className="text-brand-red fill-brand-red" />
                Certified Delivery Tracking System
              </div>
              
              <h1 className="text-5xl lg:text-[80px] font-bold tracking-tight leading-[1] mb-8 text-slate-900">
                Track Every Rider. <br />
                <span className="text-brand-red">Deliver Results.</span>
              </h1>
              
              <p className="text-lg lg:text-xl text-slate-500 max-w-xl mb-12 leading-relaxed font-medium">
                The world's most intuitive platform for real-time delivery management and fleet oversight.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link to="/login" className="w-full sm:w-auto bg-slate-900 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-brand-red transition-all shadow-2xl shadow-slate-900/10 active:scale-95 flex items-center justify-center gap-3">
                  Get Started <ArrowRight size={20} />
                </Link>
                <div className="flex items-center gap-3 text-slate-400 font-bold text-xs uppercase tracking-widest">
                  <CheckCircle size={16} className="text-emerald-500" /> Trusted by 500+ Orgs
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-full"
            >
              <MapMonitoringAnimation />
              <div className="absolute -inset-10 bg-brand-red/10 rounded-full blur-[100px] -z-10"></div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-24 bg-slate-50/50 border-y border-slate-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-200">
             <div className="py-8 md:py-0">
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">0ms</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Sync</div>
             </div>
             <div className="py-8 md:py-0">
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">100%</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tracking Accuracy</div>
             </div>
             <div className="py-8 md:py-0">
                <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2">5.0</div>
                <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">User Satisfaction</div>
             </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-xs font-bold text-brand-red uppercase tracking-[0.3em] mb-4">Core Technology</h2>
            <h3 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8">Everything you need <br /> to lead the field.</h3>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">Modern tools for modern logistics. Built for speed, accuracy, and reliability.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            <FeatureCard icon={MapIcon} title="Live Map GPS" description="See your entire fleet in motion. High-precision Leaflet maps update every second." index={0} />
            <FeatureCard icon={Package} title="Smart Assignment" description="Intelligently route orders to the nearest free rider with one single click." index={1} />
            <FeatureCard icon={RefreshCcw} title="Instant Sync" description="Powered by Socket.io for no-refresh data flow across all admin and rider panels." index={2} />
            <FeatureCard icon={Users} title="Fleet Oversight" description="Manage rider status, performance, and schedules from a clean central hub." index={3} />
            <FeatureCard icon={History} title="Order Ledger" description="Full historical logs of every delivery, complete with timestamps and receiver info." index={4} />
            <FeatureCard icon={Lock} title="Secure Tunnel" description="Enterprise-grade JWT and Bcrypt protection for all your organizational data." index={5} />
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[48px] p-12 lg:p-24 text-center relative overflow-hidden">
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-red/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">Ready to scale <br /> your operations?</h2>
            <p className="text-slate-400 text-lg lg:text-xl mb-12 max-w-2xl mx-auto font-medium">Join the logistics revolution. Start tracking with TrackRiders today.</p>
            <Link to="/login" className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-brand-red hover:text-white transition-all shadow-xl active:scale-95 inline-flex items-center gap-3">
              Get Started Now <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                <img src="/vite2.png" alt="Logo" className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">TrackRiders</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 lg:gap-16 text-sm font-bold text-slate-500 uppercase tracking-widest">
              <a href="#features" className="hover:text-brand-red transition-all">Features</a>
              <a href="#how-it-works" className="hover:text-brand-red transition-all">Solutions</a>
              <a href="#about" className="hover:text-brand-red transition-all">About</a>
              <a href="#" className="hover:text-brand-red transition-all">Privacy</a>
            </div>
            
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
              © 2026 TrackRiders Inc.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
