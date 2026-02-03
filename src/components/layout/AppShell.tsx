import React from 'react';
import { Outlet, Link } from 'react-router-dom';

export default function AppShell() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-white/70 backdrop-blur-xl shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#5C6BC0] to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:scale-105 transition-transform duration-300">
              C
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5C6BC0] to-indigo-800 tracking-tight">
              CheckInEase
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-sm font-medium text-slate-600 hover:text-[#5C6BC0] transition-colors">Features</Link>
            <Link to="/pricing" className="text-sm font-medium text-slate-600 hover:text-[#5C6BC0] transition-colors">Pricing</Link>
            <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-[#5C6BC0] transition-colors">About</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login" className="hidden md:block text-sm font-medium text-slate-600 hover:text-[#5C6BC0] transition-colors">
              Log in
            </Link>
            <button className="px-5 py-2 text-sm font-semibold text-white bg-[#5C6BC0] rounded-full hover:bg-indigo-600 active:scale-95 transition-all shadow-[0_4px_14px_0_rgba(92,107,192,0.39)] hover:shadow-[0_6px_20px_rgba(92,107,192,0.23)]">
              Get Started
            </button>
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-slate-600 hover:bg-black/5 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-indigo-100 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded bg-[#5C6BC0] flex items-center justify-center text-white text-xs font-bold">C</div>
                 <span className="font-bold text-slate-700">CheckInEase</span>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                The ultimate digital check-in system for modern hosts and happy guests.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/features" className="hover:text-[#5C6BC0] transition-colors">Features</Link></li>
                <li><Link to="/pricing" className="hover:text-[#5C6BC0] transition-colors">Pricing</Link></li>
                <li><Link to="/demo" className="hover:text-[#5C6BC0] transition-colors">Request Demo</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/about" className="hover:text-[#5C6BC0] transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-[#5C6BC0] transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="hover:text-[#5C6BC0] transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link to="/privacy" className="hover:text-[#5C6BC0] transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-[#5C6BC0] transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-400">© 2024 CheckInEase. All rights reserved.</p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-5 h-5 bg-slate-200 rounded-full hover:bg-[#5C6BC0] transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 bg-slate-200 rounded-full hover:bg-[#5C6BC0] transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 bg-slate-200 rounded-full hover:bg-[#5C6BC0] transition-colors cursor-pointer"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
