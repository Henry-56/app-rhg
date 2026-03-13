'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Bell, 
  RefreshCcw, 
  BarChart3, 
  Settings,
  LogOut,
  Briefcase
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Empleados', href: '/employees', icon: Users },
  { name: 'Contratos', href: '/contracts', icon: FileText },
  { name: 'Renovaciones', href: '/renewals', icon: RefreshCcw },
  { name: 'Alertas', href: '/alerts', icon: Bell },
  { name: 'Reportes', href: '/reports', icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  if (pathname === '/login' || pathname === '/') return null;

  return (
    <aside className="w-64 h-screen bg-brand-primary text-slate-300 flex flex-col fixed left-0 top-0 shadow-xl z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Briefcase className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">RH Smart</h1>
          <p className="text-slate-500 text-xs font-medium">Contract Manager</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group",
                isActive 
                  ? "bg-brand-accent text-white shadow-lg shadow-blue-500/20" 
                  : "hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-colors",
                isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"
              )} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Cerrar Sesión</span>
        </Link>
      </div>
    </aside>
  );
}
