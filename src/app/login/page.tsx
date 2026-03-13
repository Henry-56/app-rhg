'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Briefcase, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center z-[100] px-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-slate-200/50 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-primary rounded-2xl shadow-xl shadow-slate-900/10 mb-4 scale-110">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">RH Smart</h1>
          <p className="text-slate-500 font-medium mt-1">Gestión Inteligente de Contratos</p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl p-8 md:p-10">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Bienvenido de nuevo</h2>
          <p className="text-sm text-slate-500 mb-8 font-medium">Ingresa tus credenciales para acceder al panel.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Correo Electrónico</label>
              <div className="relative group">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-accent transition-colors" />
                <input 
                  type="email" 
                  required
                  placeholder="admin@rhsmart.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:bg-white focus:border-brand-accent transition-all font-medium text-slate-800"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Contraseña</label>
                <button type="button" className="text-xs font-bold text-brand-accent hover:underline">¿Olvidaste tu contraseña?</button>
              </div>
              <div className="relative group">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-accent transition-colors" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:bg-white focus:border-brand-accent transition-all font-medium text-slate-800"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 py-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded text-brand-accent focus:ring-brand-accent border-slate-300" />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium cursor-pointer select-none">Recordar mi sesión</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-brand-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-slate-900/10 disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Iniciar Sesión
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8 font-medium">
            ¿No tienes una cuenta? <button className="text-brand-accent font-bold hover:underline">Contactar a Soporte</button>
          </p>
        </div>
      </div>
    </div>
  );
}
