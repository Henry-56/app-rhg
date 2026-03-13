'use client';

import React from 'react';
import { 
  Bell, 
  Settings, 
  Mail, 
  MessageSquare, 
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Zap,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AlertsPage() {
  const channelSettings = [
    { name: 'Email Notifications', icon: Mail, active: true, desc: 'Enviar alertas detalladas al correo corporativo.' },
    { name: 'Push Notifications', icon: Smartphone, active: true, desc: 'Notificaciones en tiempo real en dispositivos móviles.' },
    { name: 'App Inbox', icon: MessageSquare, active: true, desc: 'Mensajes directos en el centro de notificaciones.' },
  ];

  const recentHistory = [
    { title: 'Alerta de Vencimiento Enviada', user: 'Ana García', time: 'Hace 2 horas', status: 'delivered' },
    { title: 'Nueva Política de Renovación', user: 'Sistema', time: 'Hace 1 día', status: 'info' },
    { title: 'Error de Sincronización', user: 'IT Admin', time: 'Hace 2 días', status: 'error' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card">
        <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-brand-accent" />
          Configuración Global de Alertas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Critica (30 días)', value: 'Daily', color: 'bg-rose-500' },
            { label: 'Preventiva (60 días)', value: 'Weekly', color: 'bg-amber-500' },
            { label: 'Informativa (90 días)', value: 'Monthly', color: 'bg-blue-500' }
          ].map((item) => (
            <div key={item.label} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{item.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-slate-800">Frecuencia: {item.value}</span>
                <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-brand-accent" />
            Canales de Notificación
          </h3>
          <div className="space-y-4">
            {channelSettings.map((channel) => (
              <div key={channel.name} className="flex items-start justify-between p-4 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex gap-3">
                  <div className="p-2 bg-slate-50 rounded-lg text-slate-400 group-hover:text-brand-accent transition-colors">
                    <channel.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{channel.name}</h4>
                    <p className="text-xs text-slate-500 leading-tight">{channel.desc}</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={channel.active} />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-accent" />
            Historial de Notificaciones
          </h3>
          <div className="space-y-4">
            {recentHistory.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all cursor-pointer group">
                <div className={cn(
                  "w-2 h-10 rounded-full",
                  item.status === 'delivered' ? 'bg-emerald-400' : 
                  item.status === 'error' ? 'bg-rose-400' : 'bg-blue-400'
                )}></div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-slate-800 group-hover:text-brand-accent transition-colors">{item.title}</h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                    <span>{item.user}</span>
                    <span>•</span>
                    <span>{item.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500" />
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100 transition-all border border-slate-200">
            Ver Registro Completo
          </button>
        </div>
      </div>
    </div>
  );
}
