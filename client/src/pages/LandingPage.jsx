import React, { useState, useEffect } from 'react';
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
  Smartphone
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
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img src="/vite2.png" alt="TrackRiders Logo" className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
          <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            TrackRiders
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-600 hover:text-brand-red transition-colors font-medium text-sm"
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <a href="/rider-login" className="px-5 py-2.5 rounded-lg text-slate-900 border border-slate-200 font-bold text-xs uppercase tracking-widest hover:border-slate-900 transition-all">
              Rider Portal
            </a>
            <a href="/login" className="bg-brand-red px-5 py-2.5 rounded-lg text-white font-bold text-xs uppercase tracking-widest hover:bg-red-600 transition-all shadow-sm">
              Admin Login
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-slate-600 font-bold hover:text-slate-900" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <hr className="border-slate-100" />
              <a href="/rider-login" className="w-full py-4 rounded-xl font-black text-center text-slate-900 border-2 border-slate-900 uppercase tracking-widest text-xs">Rider Portal</a>
              <a href="/login" className="w-full bg-brand-red py-4 rounded-xl font-black text-center text-white uppercase tracking-widest text-xs shadow-lg shadow-brand-red/20">Admin Access</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DashboardMockup = () => {
  return (
    <div className="relative w-full max-w-2xl aspect-video bg-brand-dark rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Sidebar mockup */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-white/5 border-r border-white/10 flex flex-col items-center py-6 gap-6">
        <div className="w-8 h-8 rounded-lg bg-brand-red/20 flex items-center justify-center"><MapIcon className="w-4 h-4 text-brand-red" /></div>
        <div className="w-8 h-8 rounded-lg bg-white/5"></div>
        <div className="w-8 h-8 rounded-lg bg-white/5"></div>
      </div>
      
      {/* Top bar mockup */}
      <div className="absolute top-0 left-16 right-0 h-12 bg-white/5 border-b border-white/10 flex items-center px-6 justify-between">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40"></div>
        </div>
      </div>

      {/* Map Content */}
      <div className="absolute inset-0 top-12 left-16 bg-slate-50 p-4 flex items-center justify-center">
        {/* Fake Map Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #64748b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Animated Rider Markers */}
        <motion.div 
          animate={{ x: [0, 40, 20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-emerald-500 rounded-full blur opacity-40 animate-pulse"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            <div className="absolute top-4 left-0 bg-white shadow-sm px-2 py-1 rounded text-[10px] whitespace-nowrap border border-slate-200">
              Rider #204 - Active
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ x: [0, -30, -50, 0], y: [0, 40, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/3 right-1/4"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-emerald-500 rounded-full blur opacity-40 animate-pulse"></div>
            <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white"></div>
            <div className="absolute -top-8 -left-10 bg-white shadow-sm px-2 py-1 rounded text-[10px] whitespace-nowrap border border-slate-200">
              Rider #108 - On Delivery
            </div>
          </div>
        </motion.div>

        {/* Info Overlay */}
        <div className="absolute bottom-4 right-4 w-40 h-24 bg-brand-dark/90 backdrop-blur-lg border border-white/10 rounded-xl p-3 flex flex-col gap-2 shadow-lg">
          <div className="w-full h-2 bg-white/10 rounded"></div>
          <div className="w-2/3 h-2 bg-white/10 rounded"></div>
          <div className="mt-auto flex justify-between">
            <div className="w-8 h-8 rounded bg-white/5"></div>
            <div className="w-8 h-8 rounded bg-white/5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatItem = ({ label, value, subtext }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center px-12"
    >
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</h3>
      <div className="text-4xl font-black text-slate-900 mb-2">{value}</div>
      <p className="text-slate-500 text-sm font-medium">{subtext}</p>
    </motion.div>
  );
};

const FeatureCard = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white border border-slate-200 p-10 rounded-2xl relative overflow-hidden h-full hover:border-brand-red/30 transition-all group shadow-sm hover:shadow-md"
    >
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-8 group-hover:bg-brand-red/5 transition-colors">
        <Icon className="text-slate-900 w-6 h-6 group-hover:text-brand-red transition-colors" />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
      <p className="text-slate-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

const Step = ({ number, title, description, isLast }) => {
  return (
    <div className="flex-1 relative flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-slate-900 text-white flex items-center justify-center text-2xl font-black mb-6 relative z-10">
        {number}
      </div>
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-slate-200">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-full h-full bg-brand-red origin-left"
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 text-sm max-w-[250px]">{description}</p>
    </div>
  );
};

const TechBadge = ({ name, emoji }) => {
  return (
    <div className="px-6 py-3 rounded-xl bg-white border border-slate-200 flex items-center gap-3 hover:border-slate-900 transition-all cursor-default shadow-sm">
      <span className="text-xl">{emoji}</span>
      <span className="text-slate-900 font-bold text-sm">{name}</span>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen selection:bg-brand-red/30 overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-sm font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Live Tracking Active
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8 text-slate-900">
              Track Every Rider. <br />
              <span className="text-brand-red">Deliver Every Promise.</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-lg mb-10 leading-relaxed font-medium">
              Real-time delivery management with live GPS tracking, instant order assignment, and smart status monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/login" className="bg-brand-red px-8 py-4 rounded-lg text-white font-black text-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-all shadow-md">
                Live Demo <ArrowRight className="w-5 h-5" />
              </a>
              <button className="px-8 py-4 rounded-lg border-2 border-slate-900 text-slate-900 font-bold text-lg flex items-center justify-center gap-2 hover:bg-slate-900 hover:text-white transition-all">
                <Code className="w-5 h-5" /> Source Code
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-red/20 rounded-[32px] blur-3xl -z-10"></div>
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <StatItem label="Real-time Sync" value="0ms Delay" subtext="No latency tracking" />
            <StatItem label="Total States" value="3 Types" subtext="Active • Busy • Off" />
            <StatItem label="Security" value="AES-256" subtext="Enterprise encryption" />
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black text-brand-red uppercase tracking-[0.2em] mb-4">Core Platform</h2>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">Built for Modern Logistics</h3>
            <p className="text-slate-600 text-lg font-medium">Enterprise-grade tools designed to streamline your entire delivery operation.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={MapIcon} 
              title="Live Map Tracking" 
              description="See every rider's exact location update in real-time on an interactive Leaflet map dashboard."
              index={0}
            />
            <FeatureCard 
              icon={Package} 
              title="Smart Order Assignment" 
              description="Assign orders instantly to Free riders with product, receiver and address details automatically synced."
              index={1}
            />
            <FeatureCard 
              icon={RefreshCcw} 
              title="Real-time Sync" 
              description="Socket.io powered communication—no page refresh needed, data flows instantly across all panels."
              index={2}
            />
            <FeatureCard 
              icon={Users} 
              title="Rider Status Management" 
              description="Monitor Free, On-Delivery, and On-Leave riders from one clean, centralized dashboard."
              index={3}
            />
            <FeatureCard 
              icon={History} 
              title="Order History" 
              description="Every completed delivery is logged with timestamps and receiver details for full accountability."
              index={4}
            />
            <FeatureCard 
              icon={Lock} 
              title="Secure Access" 
              description="Separate login systems for Admin and Riders with JWT authentication and salted bcrypt hashing."
              index={5}
            />
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section id="how-it-works" className="py-32 px-6 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 mb-6">Seamless Execution</h2>
            <p className="text-slate-600 font-medium">Simple. Powerful. Efficient.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between relative px-4">
            <Step 
              number="1" 
              title="Add Riders" 
              description="Onboard your fleet and monitor their live status instantly from the command center." 
            />
            <Step 
              number="2" 
              title="Assign Orders" 
              description="Intelligent routing and instant assignment to active riders with full product details." 
            />
            <Step 
              number="3" 
              title="Real-time Tracking" 
              description="End-to-end visibility of every delivery in the field with automatic completion logging." 
              isLast 
            />
          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-32 px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-xs font-black text-brand-red uppercase tracking-[0.2em] mb-4">The Solution</h2>
              <h3 className="text-4xl font-black text-slate-900 mb-8">Unified Fleet Management</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                TrackRiders is a comprehensive real-time delivery ecosystem designed to bridge the gap between operations and the field. 
                Whether you're an organization managing hundreds of riders or a rider making your first delivery of the day, our platform provides the tools you need for success.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Shield className="text-brand-red w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Organization Control</h4>
                    <p className="text-slate-600 text-sm">Full operational visibility. Organizations can add riders, manage fleets, and track every delivery live on high-precision maps with detailed order histories.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Smartphone className="text-brand-red w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1">Rider Experience</h4>
                    <p className="text-slate-600 text-sm">Designed for the field. Riders receive instant order notifications via Socket.io, navigate with built-in map support, and update delivery statuses in real-time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-10 border border-slate-100">
              <h4 className="font-bold text-slate-900 mb-8 flex items-center gap-2">
                <Code className="w-5 h-5 text-brand-red" /> Technical Foundation
              </h4>
              <div className="flex flex-wrap gap-3">
                <TechBadge name="React 19" emoji="⚛️" />
                <TechBadge name="Node.js" emoji="🟢" />
                <TechBadge name="Express 5" emoji="🚄" />
                <TechBadge name="MongoDB" emoji="🍃" />
                <TechBadge name="Socket.io" emoji="🔌" />
                <TechBadge name="Leaflet Maps" emoji="🗺️" />
                <TechBadge name="JWT Auth" emoji="🔑" />
                <TechBadge name="Tailwind" emoji="🎨" />
              </div>
              <div className="mt-10 p-6 bg-white rounded-2xl border border-slate-200">
                <h5 className="font-bold text-slate-900 mb-3 text-sm">Key Keypoints</h5>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Instant Socket.io Status Syncing
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Secure JWT & Bcrypt Authentication
                  </li>
                  <li className="flex items-center gap-3 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Dynamic Leaflet Map Visualization
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-red/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center glass-card p-12 lg:p-20 rounded-[40px]">
          <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
            Ready to Take Control of Your Deliveries?
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium">
            Join modern logistics teams using TrackRiders for precision tracking and seamless management.
          </p>
          <a href="/login" className="bg-brand-red text-white px-12 py-5 rounded-lg font-black text-xl hover:bg-red-600 transition-all shadow-lg flex items-center justify-center gap-3 mx-auto">
            Get Started Now <ArrowRight />
          </a>
          
          <div className="mt-12 flex items-center justify-center gap-6 text-gray-500 font-bold text-sm">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-gold" /> Modern</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-gold" /> Real-time</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-gold" /> Secure</div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="/vite2.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="text-xl font-black tracking-tight text-slate-900">TrackRiders</span>
              </div>
              <p className="text-slate-500 max-w-sm leading-relaxed">
                Empowering modern logistics with real-time tracking and intelligent delivery management solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li><a href="#features" className="hover:text-brand-red transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-brand-red transition-colors">Workflow</a></li>
                <li><a href="#about" className="hover:text-brand-red transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm text-slate-600 font-medium">
                <li><a href="#" className="hover:text-brand-red transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-brand-red transition-colors">Careers</a></li>
                <li><a href="#contact" className="hover:text-brand-red transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-slate-400 font-medium">
              © 2026 TrackRiders. All rights reserved.
            </div>
            <div className="flex gap-8 text-sm text-slate-400 font-medium">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
