import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Demo from './pages/Demo';

// Placeholder for other pages to prevent router errors if expanded later
const Placeholder = ({ title }: { title: string }) => (
  <div className="container mx-auto px-4 py-20 text-center">
    <h1 className="text-3xl font-bold text-slate-800 mb-4">{title}</h1>
    <p className="text-slate-500">This page is under construction.</p>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="features" element={<Placeholder title="Features" />} />
        <Route path="pricing" element={<Placeholder title="Pricing" />} />
        <Route path="about" element={<Placeholder title="About Us" />} />
        <Route path="demo" element={<Demo />} />
        <Route path="login" element={<Auth />} />
        <Route path="auth" element={<Auth />} />
        <Route path="onboarding" element={<Onboarding />} />
        {/* Catch-all for 404 */}
        <Route path="*" element={<div className="container mx-auto px-4 py-20 text-center text-slate-500">Page not found</div>} />
      </Route>
    </Routes>
  );
}

export default App;

