'use client';

import React from 'react';
import { 
  BarChart3, 
  Download, 
  Filter, 
  TrendingUp, 
  FileText, 
  PieChart as PieIcon,
  Users
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const data = [
  { name: 'Tecnología', activos: 45, vencidos: 2 },
  { name: 'RRHH', activos: 12, vencidos: 0 },
  { name: 'Ventas', activos: 38, vencidos: 5 },
  { name: 'Finanzas', activos: 24, vencidos: 1 },
  { name: 'Marketing', activos: 18, vencidos: 3 },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-slate-500 text-sm font-medium">Análisis profundo del estado contractual</p>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4" />
            Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Contratos por Departamento</h3>
            <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400">
              <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} width={80} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none' }} />
                <Bar dataKey="activos" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="vencidos" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Proyección de Vencimientos</h3>
            <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full">
              OPTIMISTA
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorActivos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="activos" stroke="#3b82f6" fillOpacity={1} fill="url(#colorActivos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: 'Tasa de Renovación', metric: '91.2%', icon: TrendingUp, detail: '+2.4% vs año pasado' },
          { title: 'Tiempo de Gestión', metric: '4.2 días', icon: BarChart3, detail: '-1.1 días este mes' },
          { title: 'Contratos Digitales', metric: '100%', icon: FileText, detail: 'Todo sincronizado' }
        ].map((report) => (
          <div key={report.title} className="card hover:border-brand-accent transition-all cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-400 group-hover:text-brand-accent">
                <report.icon className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-800">{report.title}</h4>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-1">{report.metric}</p>
            <p className="text-xs text-slate-500 font-medium">{report.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
