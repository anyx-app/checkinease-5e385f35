import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-100/50 rounded-full blur-3xl opacity-60 animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FFB74D]/20 rounded-full blur-3xl opacity-60"></div>
        </div>

        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            Now Available for Beta Access
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 max-w-4xl mx-auto leading-tight">
            Seamless vacation starts with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5C6BC0] to-indigo-600">CheckInEase</span>.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate digital check-in system for vacation rentals. Provide guests with property details, door codes, and local recommendations in one beautiful link.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-[#5C6BC0] rounded-full hover:bg-indigo-600 hover:scale-105 active:scale-95 transition-all shadow-lg hover:shadow-indigo-500/30">
              Start for Free
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all">
              View Demo
            </button>
          </div>

          {/* Hero Image / Mockup Placeholder */}
          <div className="relative mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/50 backdrop-blur-sm p-4 shadow-2xl">
             <div className="aspect-[16/9] bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center relative group">
                {/* Simulated UI Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center text-slate-300">
                  <svg className="w-20 h-20 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className="font-medium text-lg opacity-40">Interactive Guest Guide Preview</span>
                </div>
                {/* Floating Card Element */}
                <div className="absolute bottom-8 right-8 w-64 p-4 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 animate-bounce-slow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFB74D]/20 flex items-center justify-center text-[#FFB74D]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">Door Code</div>
                      <div className="text-slate-800 font-mono font-bold text-lg">4829 #</div>
                    </div>
                  </div>
                  <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-[#FFB74D] rounded-full"></div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything your guests need.</h2>
            <p className="text-lg text-slate-500">Stop answering "What's the Wifi password?" at 10 PM. CheckInEase puts everything in one place.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Digital Welcome Guide", desc: "Beautifully designed guides that work on any device. No app download required.", icon: "📱" },
              { title: "Smart Access Codes", desc: "Securely share door codes that are easy to find but protected from prying eyes.", icon: "🔑" },
              { title: "House Rules", desc: "Clear, friendly display of your property rules to ensure respect and care.", icon: "📋" },
              { title: "Local Gems", desc: "Share your favorite restaurants and activities with an interactive map view.", icon: "📍" },
              { title: "Wifi & Utilities", desc: "One-tap connection for Wifi and simple instructions for appliances.", icon: "📶" },
              { title: "Emergency Contacts", desc: "Keep guests safe with quick access to local emergency numbers.", icon: "🚑" },
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-indigo-100 transition-all duration-300">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-[#5C6BC0] to-indigo-800 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to upgrade your hosting?</h2>
          <p className="text-indigo-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of hosts who are saving time and impressing guests with CheckInEase.
          </p>
          <button className="px-10 py-4 bg-white text-indigo-700 font-bold rounded-full text-lg shadow-xl hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
}
