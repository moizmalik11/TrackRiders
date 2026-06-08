import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Sparkles, Navigation, MapPin, Map, Package, Users, Shield, Server, ArrowRight, Menu } from 'lucide-react';

// --- Shared Primitives ---

const LogoMark = ({ className = "w-8 h-8 text-[#00d2ff]" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="3 11 22 2 13 21 11 13 3 11" />
  </svg>
);

const PrimaryButton = ({ label = "Admin Login", to = "/login", className = "" }) => (
  <Link to={to} className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white text-black font-medium text-sm px-5 py-3 transition-all hover:bg-white/90 active:scale-[0.98] ${className}`}>
    {label}
    <ChevronRight size={16} className="transition-transform group-hover:translate-x-[1px]" />
  </Link>
);

const SectionEyebrow = ({ label, tag }) => (
  <div className="flex items-center gap-3">
    <div className="flex items-center gap-2">
      <span className="w-1.5 h-1.5 rounded-full bg-white" />
      <span className="text-sm font-medium">{label}</span>
    </div>
    {tag && (
      <span className="px-2 py-0.5 rounded-full border border-white/10 text-white/50 text-xs">
        {tag}
      </span>
    )}
  </div>
);

const LandingPage = () => {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
    backgroundSize: '200% auto',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    filter: 'url(#c3-noise)'
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      {/* Global Background Video */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video 
          autoPlay loop muted playsInline
          className="w-full h-full object-cover pointer-events-none opacity-40 mix-blend-screen"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4" 
        />
      </div>

      {/* Guide Lines */}
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 -translate-x-[calc(50%+36rem)] w-px bg-white/10 z-[5]" />
      <div className="hidden md:block pointer-events-none fixed inset-y-0 left-1/2 translate-x-[calc(-50%+36rem)] w-px bg-white/10 z-[5]" />

      {/* Global SVG Filters */}
      <svg width="0" height="0" className="absolute">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
        </filter>
      </svg>

      <div className="relative z-10">
        {/* Section 1 — Navbar */}
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between"
        >
          <div className="flex items-center gap-2 flex-shrink-0">
            <LogoMark />
            <span className="font-bold text-lg tracking-tight">TrackRiders</span>
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#features" className="text-white/70 text-sm font-medium hover:text-white transition-colors">Features</a>
            <a href="#stack" className="text-white/70 text-sm font-medium hover:text-white transition-colors">Tech Stack</a>
            <Link to="/rider-login" className="text-white/70 text-sm font-medium hover:text-white transition-colors">Rider Access</Link>
            <Link to="/login" className="text-white/70 text-sm font-medium hover:text-white transition-colors">Admin Access</Link>
          </div>
          <div className="hidden md:block">
            <PrimaryButton label="Admin Dashboard" to="/login" />
          </div>
          <button className="md:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
            <Menu size={18} />
          </button>
        </motion.nav>

        {/* Section 2 — Hero */}
        <section className="pt-16 md:pt-28 pb-20 text-center flex flex-col items-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-7xl font-semibold tracking-tight leading-[0.9]"
          >
            <span className="text-white block">Your fleet.</span>
            <span className="block animate-shiny mt-2" style={gradientStyle}>Synchronized</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="mt-8 text-white/60 max-w-md text-base leading-[1.5]"
          >
            TrackRiders is a high-performance, real-time dispatch dashboard and rider telemetry terminal built for logistics and service fleets.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="mt-8 flex flex-col items-center gap-4 sm:flex-row"
          >
            <PrimaryButton label="Admin Portal" to="/login" />
            <Link to="/rider-login" className="group inline-flex items-center justify-center gap-2 rounded-full bg-white/10 text-white font-medium text-sm px-5 py-3 transition-all hover:bg-white/20 active:scale-[0.98]">
              Rider Terminal
            </Link>
          </motion.div>
        </section>

        {/* Section 3 — Mockup window strip */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="w-full h-10 bg-black/40 backdrop-blur-md border-y border-white/10"
        >
          <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-4">
              <LogoMark className="w-3.5 h-3.5 text-[#00d2ff]" />
              <span className="font-bold text-white">TrackRiders</span>
              {['Live Map','Dispatch','Riders','Logs','Settings'].map((item, i) => (
                <span key={item} className={`text-white/80 ${i > 2 ? 'hidden sm:inline' : ''} ${i > 3 ? 'md:hidden lg:inline' : ''}`}>
                  {item}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="flex items-center gap-2 text-[#28c840]">
                <span className="w-2 h-2 rounded-full bg-[#28c840] animate-pulse" />
                Live Server
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section 4 — Dashboard mockup */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl shadow-2xl"
          >
            {/* Title bar */}
            <div className="h-10 border-b border-white/10 flex items-center px-4 relative bg-white/[0.02]">
              <div className="flex gap-2 z-10">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center text-xs text-white/50 font-medium">
                Command Center
              </div>
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 md:grid-cols-12 h-[600px] md:h-[520px]">
              
              {/* Sidebar */}
              <div className="hidden md:block col-span-3 border-r border-white/10 bg-black/30 p-4 overflow-y-auto">
                <button className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#00d2ff] text-black text-xs font-semibold px-3 py-2.5 mb-6 hover:bg-[#A4F4FD] transition-colors">
                  <Package size={14} /> Dispatch Order
                </button>
                <div className="space-y-1 mb-8">
                  <div className="flex items-center justify-between px-3 py-2 bg-white/10 text-white rounded-md text-sm font-medium">
                    <span className="flex items-center gap-2"><Map size={14} /> Live Map</span>
                  </div>
                  {[{icon: Users, label: 'Active Riders', count: 12}, {icon: Users, label: 'All Riders', count: 45}, {icon: Server, label: 'Logs'}].map(item => (
                    <div key={item.label} className="flex items-center justify-between px-3 py-2 text-white/60 hover:bg-white/5 hover:text-white rounded-md text-sm transition-colors cursor-pointer">
                      <span className="flex items-center gap-2"><item.icon size={14} /> {item.label}</span>
                      {item.count && <span className="text-xs">{item.count}</span>}
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="px-3 text-[10px] uppercase tracking-widest text-white/40 font-semibold mb-3">Zones</h4>
                  {[
                    {label: 'Downtown', color: '#00d2ff'},
                    {label: 'North Sector', color: '#A4F4FD'},
                    {label: 'East Side', color: '#f59e0b'},
                    {label: 'West End', color: '#10b981'}
                  ].map(label => (
                    <div key={label.label} className="flex items-center gap-3 px-3 py-1.5 text-white/60 text-sm hover:text-white cursor-pointer">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: label.color }} /> {label.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Rider List */}
              <div className="col-span-12 md:col-span-4 border-r border-white/10 overflow-y-auto bg-black/10">
                <div className="p-3 border-b border-white/10 sticky top-0 bg-[#0e1014]/90 backdrop-blur-md z-10">
                  <div className="bg-white/5 border border-white/10 rounded-md px-3 py-2 flex items-center gap-2">
                    <Search size={14} className="text-white/40" />
                    <input type="text" placeholder="Search riders" className="bg-transparent border-none outline-none text-sm text-white placeholder-white/40 w-full" />
                  </div>
                </div>
                <div className="divide-y divide-white/5">
                  {[
                    { name: 'John Doe', status: 'On Delivery', location: 'Downtown', time: 'Active now', active: true },
                    { name: 'Alice Smith', status: 'Available', location: 'North Sector', time: 'Active now' },
                    { name: 'Michael Lee', status: 'On Delivery', location: 'West End', time: 'Active now' },
                    { name: 'Sarah Connor', status: 'Offline', location: '-', time: '2 hours ago' },
                  ].map((rider, i) => (
                    <div key={i} className={`p-4 cursor-pointer transition-colors ${rider.active ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className={`text-sm ${rider.active ? 'text-white font-semibold' : 'text-white/70'}`}>{rider.name}</span>
                        <span className={`text-xs ${rider.status === 'Available' ? 'text-[#28c840]' : rider.status === 'Offline' ? 'text-white/40' : 'text-[#f59e0b]'}`}>{rider.status}</span>
                      </div>
                      <div className="text-xs text-white/50">{rider.location}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="hidden md:flex flex-col col-span-5 bg-black/20 relative">
                <div className="absolute inset-0 bg-[#0a0a0a] overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
                  
                  {/* Animated Route Map */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
                    {/* Dotted Background Route */}
                    <path 
                      d="M50 150 L100 100 L200 120 L250 80 L350 180" 
                      stroke="#00d2ff" 
                      strokeWidth="2" 
                      strokeDasharray="4,4" 
                      className="opacity-30" 
                    />
                    
                    {/* Solid Animated Trailing Route */}
                    <path 
                      d="M50 150 L100 100 L200 120 L250 80 L350 180" 
                      stroke="#00d2ff" 
                      strokeWidth="3"
                      fill="transparent"
                      pathLength="100"
                      strokeDasharray="100"
                      strokeDashoffset="100"
                    >
                      <animate 
                        attributeName="stroke-dashoffset" 
                        from="100" 
                        to="0" 
                        dur="15s" 
                        repeatCount="indefinite" 
                      />
                    </path>

                    {/* Destination Pin */}
                    <foreignObject x="338" y="156" width="24" height="24">
                      <div className="text-[#ff5f57] animate-pulse">
                        <MapPin size={24} fill="currentColor" />
                      </div>
                    </foreignObject>

                    {/* Animated Rider Arrow */}
                    <g fill="#28c840" style={{ filter: 'drop-shadow(0 0 8px rgba(40,200,64,0.6))' }}>
                      <polygon points="-12,-6 4,0 -12,6 -8,0" />
                      <animateMotion 
                        dur="15s" 
                        repeatCount="indefinite" 
                        path="M50 150 L100 100 L200 120 L250 80 L350 180"
                        rotate="auto"
                      />
                    </g>
                  </svg>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="liquid-glass rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium text-white">John Doe</div>
                      <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70">ORD-9421</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-sm text-[#A4F4FD]">
                      <Navigation size={14} className="animate-pulse" /> ETA: 12 mins
                    </div>
                    <p className="text-sm text-white/60 leading-relaxed truncate">
                      En route to 123 Logistics Ave.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </section>

        {/* Section - Feature Cards */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28" id="features">
          <div className="text-center mb-16 flex flex-col items-center">
            <SectionEyebrow label="Platform" tag="Core Features" />
            <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
              Everything you need to <br/> scale your delivery fleet.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Map, title: "Satellite Geo-Tracking", desc: "Live-rendered interactive map views showing real-time coordinates of riders as they move through cities." },
              { icon: Package, title: "Dynamic Order Dispatch", desc: "Instantly dispatch orders to active riders complete with ID, product, delivery address, and receiver info." },
              { icon: Users, title: "Live Command Center", desc: "Track available, active, and on-leave fleets with visual counters and real-time operational metrics." },
              { icon: Navigation, title: "Rider Shift Terminal", desc: "A dedicated workspace for riders to claim shifts, view current assignments, trigger GPS pings, and complete orders." },
              { icon: Server, title: "WebSocket Telemetry", desc: "Low-latency persistent connection to receive instant position broadcasts and order status updates." },
              { icon: Shield, title: "Secure Operations", desc: "Multi-level JWT authentication, encrypted session controls, and secure data handling for peace of mind." }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }} 
                transition={{ duration: 0.6, delay: i * 0.1 }} 
                className="liquid-glass rounded-2xl p-8 hover:bg-white/5 transition-colors group cursor-default"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-[#00d2ff] mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 5 — FeatureTriage */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-28">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <SectionEyebrow label="Operations" tag="Real-Time" />
              <h2 className="mt-5 text-3xl md:text-5xl font-semibold tracking-tight leading-[1.02]">
                Satellite precision. <br/> Instant dispatch.
              </h2>
              <p className="mt-6 text-white/60 text-base leading-[1.6] max-w-md">
                TrackRiders uses WebSockets to maintain a persistent connection with every rider. See their exact coordinates, send orders instantly, and optimize routes without refreshing.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {['Live telemetry', 'Socket.io powered', 'Geospatial queries', 'JWT Secured'].map(chip => (
                  <span key={chip} className="text-xs text-white/70 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="liquid-glass rounded-2xl p-5">
              <div className="text-sm font-medium text-white/80 mb-5 pl-1">Live Metrics</div>
              <div className="space-y-3">
                {[
                  { title: 'Active Riders', count: 12, color: '#28c840', desc: 'Currently connected' },
                  { title: 'Deliveries Today', count: 142, color: '#00d2ff', desc: 'Completed orders' },
                  { title: 'Server Pings', count: '1.2k', color: '#f59e0b', desc: 'Location updates / min' }
                ].map(stat => (
                  <div key={stat.title} className="liquid-glass rounded-lg p-3 px-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-white">{stat.title}</div>
                      <div className="text-xs text-white/40 mt-1">{stat.desc}</div>
                    </div>
                    <div className="text-lg font-semibold" style={{ color: stat.color }}>{stat.count}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Section 6 — Tech Stack */}
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-20" id="stack">
          <div className="text-center text-xs uppercase tracking-widest text-white/40 font-semibold">
            Powered by an enterprise-grade stack
          </div>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-6 text-center">
            {['React', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS', 'Leaflet'].map((tech, i) => (
              <motion.div 
                key={tech} 
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="text-sm font-semibold tracking-tight text-white/50 hover:text-white transition-colors cursor-pointer py-2"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 7 — FinalCTA */}
        <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 md:py-24 text-center"
          >
            <div className="absolute inset-0 pointer-events-none opacity-30" style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)' }}></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.02] text-white">
                Ready to take <br /> control?
              </h2>
              <p className="mt-6 text-white/60 max-w-md mx-auto text-sm leading-[1.6]">
                Join the operations revolution. Start managing your fleet with TrackRiders today.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
                <PrimaryButton label="Admin Login" to="/login" />
                <Link to="/rider-login" className="rounded-full border border-white/15 text-white text-sm font-medium px-5 py-3 hover:bg-white/5 transition-colors flex items-center gap-2">
                  Rider Login <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 mt-12">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <LogoMark className="w-5 h-5 text-[#00d2ff]" />
                <span className="font-bold text-white text-lg tracking-tight">TrackRiders</span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs">
                The next generation of real-time logistics and rider telemetry for modern delivery operations.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
                <li><Link to="/rider-login" className="hover:text-white transition-colors">Rider Terminal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#stack" className="hover:text-white transition-colors">Tech Stack</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xs text-white/40">
              © 2026 TrackRiders Inc. All rights reserved.
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">Twitter</a>
              <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">GitHub</a>
              <a href="#" className="text-white/40 hover:text-white transition-colors text-xs">LinkedIn</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
