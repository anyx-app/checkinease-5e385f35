import React from 'react';

export default function GuestDashboard() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 md:p-16 shadow-2xl shadow-indigo-500/20 ring-1 ring-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
        
        <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wider uppercase text-indigo-100">
            Welcome Home
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
            Your Stay, <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-orange-100">
              Simplified.
            </span>
          </h1>
          <p className="text-lg text-indigo-100 leading-relaxed max-w-lg mx-auto">
            Access door codes, WiFi passwords, and local secrets instantly. Everything you need for a perfect vacation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-300 shadow-lg">
              Find My Booking
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
              Host Login
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            title: 'Instant Access', 
            desc: 'Get your digital key code instantly upon arrival. No waiting, no keys to lose.',
            icon: '🔑',
            bg: 'bg-orange-50'
          },
          { 
            title: 'House Rules', 
            desc: 'Clear, simple guidelines to help you enjoy the property safely and respectfully.',
            icon: '📋',
            bg: 'bg-blue-50'
          },
          { 
            title: 'Local Gems', 
            desc: 'Curated recommendations for the best dining, coffee, and adventures nearby.',
            icon: '🗺️',
            bg: 'bg-emerald-50'
          }
        ].map((feature, idx) => (
          <div key={idx} className={`p-8 rounded-2xl border border-white/60 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${feature.bg}`}>
            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl mb-6">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Trust Section */}
      <section className="py-12 text-center">
        <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by Hosts & Guests Everywhere</p>
        <div className="flex flex-wrap justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             <div className="text-2xl font-bold text-slate-300">Vacasa</div>
             <div className="text-2xl font-bold text-slate-300">Airbnb</div>
             <div className="text-2xl font-bold text-slate-300">Vrbo</div>
             <div className="text-2xl font-bold text-slate-300">Booking.com</div>
        </div>
      </section>
    </div>
  );
}
