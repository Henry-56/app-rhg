'use client';

import React from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Topbar() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/') return null;

  const getTitle = () => {
    switch (pathname) {
      case '/dashboard': return 'Dashboard';
      case '/employees': return 'Gestión de Empleados';
      case '/contracts': return 'Gestión de Contratos';
      case '/renewals': return 'Renovaciones de Contrato';
      case '/alerts': return 'Sistema de Alertas';
      case '/reports': return 'Reportes y Analítica';
      default: return 'HR Smart';
    }
  };

  return (
    <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40 ml-64">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold text-slate-800">{getTitle()}</h2>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Viernes, 13 de Marzo 2026</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-brand-accent transition-colors" />
          <input 
            type="text" 
            placeholder="Buscar empleados..." 
            className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-brand-accent/20 focus:bg-white transition-all outline-none"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-brand-danger rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 cursor-pointer group">
          <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=admin" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">Henry Admin</p>
            <p className="text-xs text-slate-500 font-medium">Recursos Humanos</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
        </div>
      </div>
    </header>
  );
}
