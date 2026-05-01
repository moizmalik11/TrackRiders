import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  MapPin, 
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
  CheckCircle
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
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-navy-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-cyan-glow/20 p-2 rounded-lg group-hover:bg-cyan-glow/30 transition-colors">
            <MapPin className="text-cyan-glow w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            TrackRiders
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-gray-400 hover:text-cyan-glow transition-colors font-medium text-sm"
            >
              {link.name}
            </a>
          ))}
          <button className="bg-gradient-to-r from-electric-blue to-cyan-glow px-6 py-2.5 rounded-full text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all transform hover:scale-105">
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
            className="md:hidden bg-navy-black border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-gray-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-electric-blue py-3 rounded-lg font-bold">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const DashboardMockup = () => {
  return (
    <div className="relative w-full max-w-2xl aspect-video bg-gray-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden glass-card">
      {/* Sidebar mockup */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-white/5 border-r border-white/10 flex flex-col items-center py-6 gap-6">
        <div className="w-8 h-8 rounded-lg bg-electric-blue/20 flex items-center justify-center"><MapIcon className="w-4 h-4 text-electric-blue" /></div>
        <div className="w-8 h-8 rounded-lg bg-white/5"></div>
        <div className="w-8 h-8 rounded-lg bg-white/5"></div>
        <div className="w-8 h-8 rounded-lg bg-white/5"></div>
      </div>
      
      {/* Top bar mockup */}
      <div className="absolute top-0 left-16 right-0 h-12 bg-white/5 border-b border-white/10 flex items-center px-6 justify-between">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
        </div>
        <div className="w-32 h-2 rounded-full bg-white/10"></div>
      </div>

      {/* Map Content */}
      <div className="absolute inset-0 top-12 left-16 bg-[#0f172a] p-4 flex items-center justify-center">
        {/* Fake Map Grid */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        {/* Animated Rider Markers */}
        <motion.div 
          animate={{ x: [0, 40, 20, 0], y: [0, -20, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4"
        >
          <div className="relative">
            <div className="absolute -inset-2 bg-emerald-green rounded-full blur opacity-40 animate-pulse"></div>
            <div className="w-3 h-3 bg-emerald-green rounded-full border-2 border-white"></div>
            <div className="absolute top-4 left-0 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] whitespace-nowrap border border-white/10">
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
            <div className="absolute -inset-2 bg-emerald-green rounded-full blur opacity-40 animate-pulse"></div>
            <div className="w-3 h-3 bg-emerald-green rounded-full border-2 border-white"></div>
            <div className="absolute -top-8 -left-10 bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[10px] whitespace-nowrap border border-white/10">
              Rider #108 - On Delivery
            </div>
          </div>
        </motion.div>

        {/* Info Overlay */}
        <div className="absolute bottom-4 right-4 w-40 h-24 bg-navy-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-3 flex flex-col gap-2">
          <div className="w-full h-2 bg-white/10 rounded"></div>
          <div className="w-2/3 h-2 bg-white/10 rounded"></div>
          <div className="mt-auto flex justify-between">
            <div className="w-8 h-8 rounded bg-electric-blue/20"></div>
            <div className="w-8 h-8 rounded bg-cyan-glow/20"></div>
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
      className="text-center px-8"
    >
      <h3 className="text-sm font-bold text-cyan-glow uppercase tracking-widest mb-1">{label}</h3>
      <div className="text-4xl font-black text-white mb-1">{value}</div>
      <p className="text-gray-500 text-xs font-medium">{subtext}</p>
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
      className="glass-card group p-8 rounded-3xl relative overflow-hidden h-full"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="bg-electric-blue/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-electric-blue/20 transition-colors">
        <Icon className="text-electric-blue w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-400 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
};

const Step = ({ number, title, description, isLast }) => {
  return (
    <div className="flex-1 relative flex flex-col items-center text-center">
      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-electric-blue to-cyan-glow flex items-center justify-center text-2xl font-black mb-6 relative z-10 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        {number}
      </div>
      {!isLast && (
        <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gradient-to-r from-electric-blue/50 to-transparent">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-full h-full bg-cyan-glow origin-left"
          />
        </div>
      )}
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm max-w-[250px]">{description}</p>
    </div>
  );
};

const TechBadge = ({ name, emoji }) => {
  return (
    <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 hover:border-electric-blue/50 hover:bg-white/10 transition-all cursor-default group">
      <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{emoji}</span>
      <span className="text-gray-300 font-semibold text-sm group-hover:text-white">{name}</span>
    </div>
  );
};

const App = () => {
  return (
    <div className="bg-navy-black text-white min-h-screen selection:bg-electric-blue/30 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-electric-blue/10 via-transparent to-transparent -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-green/10 border border-emerald-green/20 text-emerald-green text-sm font-bold mb-6 animate-pulse-slow">
              <span className="w-2 h-2 rounded-full bg-emerald-green"></span>
              Live Tracking Active
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8 bg-gradient-to-b from-white via-white to-gray-500 bg-clip-text text-transparent">
              Track Every Rider. <br />
              <span className="text-electric-blue">Deliver Every Promise.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg mb-10 leading-relaxed font-medium">
              Real-time delivery management with live GPS tracking, instant order assignment, and smart status monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-electric-blue to-cyan-glow px-8 py-4 rounded-xl text-white font-black text-lg flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all transform hover:scale-105 active:scale-95 group">
                Live Demo <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 rounded-xl border border-white/10 text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                <Code className="w-5 h-5" /> View on GitHub
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Glow effect behind dashboard */}
            <div className="absolute -inset-4 bg-electric-blue/20 rounded-[32px] blur-3xl -z-10"></div>
            <DashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* --- STATS BAR --- */}
      <section className="py-12 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center divide-y md:divide-y-0 md:divide-x divide-white/10 gap-8 md:gap-0">
            <StatItem label="Real-time" value="0ms Delay" subtext="Ultra-low latency syncing" />
            <StatItem label="Rider States" value="3 Active" subtext="Free • On Delivery • On Leave" />
            <StatItem label="100% Secure" value="JWT + bcrypt" subtext="Enterprise-grade protection" />
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-sm font-black text-electric-blue uppercase tracking-widest mb-4">Core Capabilities</h2>
            <h3 className="text-4xl lg:text-5xl font-black mb-6">Built for Modern Logistics</h3>
            <p className="text-gray-400 text-lg">Powerful tools designed to streamline your delivery workflow from start to finish.</p>
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
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-navy-black to-[#050811] relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-black mb-6">Seamless Workflow</h2>
            <p className="text-gray-400">How TrackRiders powers your delivery business</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-4 justify-between relative px-10">
            <Step 
              number="01" 
              title="Add & Monitor" 
              description="Admin adds riders to the system and monitors the live status dashboard." 
            />
            <Step 
              number="02" 
              title="Assign Orders" 
              description="When an order arrives, assign it to any available rider instantly via the admin panel." 
            />
            <Step 
              number="03" 
              title="Deliver & Track" 
              description="Rider delivers while their location is tracked live. Completion logs automatically." 
              isLast 
            />
          </div>
        </div>
      </section>

      {/* --- TECH STACK --- */}
      <section id="tech-stack" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-4">The Engine Under the Hood</h2>
            <p className="text-gray-400">Built with industry-standard, high-performance technologies</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            <TechBadge name="React 19" emoji="⚛️" />
            <TechBadge name="Node.js" emoji="🟢" />
            <TechBadge name="Express 5" emoji="🚄" />
            <TechBadge name="MongoDB" emoji="🍃" />
            <TechBadge name="Socket.io" emoji="🔌" />
            <TechBadge name="Tailwind CSS" emoji="🎨" />
            <TechBadge name="Leaflet Maps" emoji="🗺️" />
            <TechBadge name="JWT" emoji="🔑" />
            <TechBadge name="bcryptjs" emoji="🔒" />
            <TechBadge name="Mongoose" emoji="📦" />
          </div>
        </div>
      </section>

      {/* --- BOTTOM CTA --- */}
      <section id="contact" className="py-32 px-6 relative overflow-hidden">
        {/* Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-electric-blue/20 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-4xl mx-auto text-center glass-card p-12 lg:p-20 rounded-[40px]">
          <h2 className="text-4xl lg:text-6xl font-black mb-8 leading-tight">
            Ready to Take Control of Your Deliveries?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium">
            Join modern logistics teams using TrackRiders for precision tracking and seamless management.
          </p>
          <button className="bg-electric-blue text-white px-12 py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto group">
            View Live Demo <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
          
          <div className="mt-12 flex items-center justify-center gap-6 text-gray-500 font-bold text-sm">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-glow" /> Modern</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-glow" /> Real-time</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-cyan-glow" /> Secure</div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 border-t border-white/5 bg-navy-black/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <MapPin className="text-cyan-glow w-5 h-5" />
            <span className="text-lg font-bold tracking-tight text-white/80">TrackRiders</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Docs</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>

          <div className="text-sm text-gray-500 font-medium">
            Built with ❤️ using React & Node.js
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
