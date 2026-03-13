'use client';

import React from 'react';
import { 
  Users, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { useData } from '@/context/DataContext';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { employees, contracts } = useData();
  const router = useRouter();

  const activeCount = contracts.filter(c => c.status === 'activo' || c.status === 'renovado').length;
  const expiringSoonCount = contracts.filter(c => c.status === 'proximo_vencer').length;
  const pendingCount = contracts.filter(c => c.status === 'proximo_vencer').length; // Mock logic for pending

  const stats = [
    { name: 'Contratos Activos', value: activeCount.toString(), icon: CheckCircle2, color: 'text-brand-success', bg: 'bg-emerald-50' },
    { name: 'Próximos a Vencer', value: expiringSoonCount.toString(), icon: AlertCircle, color: 'text-brand-warning', bg: 'bg-amber-50' },
    { name: 'Renovaciones Pendientes', value: pendingCount.toString(), icon: Clock, color: 'text-brand-accent', bg: 'bg-blue-50' },
    { name: 'Tasa de Retención', value: '94%', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  const chartData = [
    { name: 'Ene', renovaciones: 4, vencimientos: 2 },
    { name: 'Feb', renovaciones: 6, vencimientos: 1 },
    { name: 'Mar', renovaciones: 8, vencimientos: 4 },
    { name: 'Abr', renovaciones: 5, vencimientos: 2 },
    { name: 'May', renovaciones: 9, vencimientos: 3 },
    { name: 'Jun', renovaciones: 12, vencimientos: 5 },
  ];

  const typeData = [
    { name: 'Indefinido', value: contracts.filter(c => c.type === 'indefinido').length, color: '#3b82f6' },
    { name: 'Temporal', value: contracts.filter(c => c.type === 'temporal').length, color: '#10b981' },
    { name: 'Prácticas', value: contracts.filter(c => c.type === 'practicas').length, color: '#f59e0b' },
    { name: 'Otros', value: contracts.filter(c => c.type === 'relevo').length, color: '#6366f1' },
  ];

  const totalValue = typeData.reduce((acc, curr) => acc + curr.value, 0);
  const pieData = typeData.map(item => ({
    ...item,
    percentage: totalValue > 0 ? Math.round((item.value / totalValue) * 100) : 0
  }));

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="card group hover:border-brand-accent transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-xl transition-colors", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.name}</p>
                <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 text-lg">Actividad de Contratos</h3>
            <select className="bg-slate-50 border-none text-sm font-medium text-slate-600 rounded-lg px-3 py-2 outline-none ring-1 ring-slate-200">
              <option>Últimos 6 meses</option>
              <option>Último año</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="renovaciones" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="vencimientos" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Side Chart */}
        <div className="card">
          <h3 className="font-bold text-slate-800 text-lg mb-8">Tipos de Contrato</h3>
          <div className="h-[250px] w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-bold text-slate-800">{contracts.length}</p>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Total</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-800">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 text-lg">Alertas Recientes</h3>
          <button 
            onClick={() => router.push('/renewals')}
            className="text-brand-accent text-sm font-semibold hover:underline"
          >
            Ver todas
          </button>
        </div>
        <div className="space-y-4">
          {contracts.filter(c => c.status === 'proximo_vencer').map((contract) => {
            const employee = employees.find(e => e.id === contract.employeeId);
            return (
              <div key={contract.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-white border border-transparent hover:border-slate-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">Vencimiento Próximo: {employee?.name}</p>
                    <p className="text-xs text-slate-500">Contrato {contract.type} vence el {contract.endDate}</p>
                  </div>
                </div>
                <button 
                  onClick={() => router.push('/renewals')}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 hover:border-brand-accent hover:text-brand-accent transition-all opacity-0 group-hover:opacity-100"
                >
                  Gestionar
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
