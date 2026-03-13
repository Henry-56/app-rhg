'use client';

import React, { useState } from 'react';
import { 
  RefreshCcw, 
  Calendar, 
  ArrowRight, 
  FileCheck, 
  Settings2,
  ChevronRight,
  X
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { cn } from '@/lib/utils';

export default function RenewalsPage() {
  const { contracts, employees, renewContract } = useData();
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [newEndDate, setNewEndDate] = useState('');

  const pendingRenewals = contracts.filter(c => c.status === 'proximo_vencer').map(c => ({
    ...c,
    employee: employees.find(e => e.id === c.employeeId)
  }));

  const handleRenew = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedContract && newEndDate) {
      renewContract(selectedContract.id, newEndDate);
      setSelectedContract(null);
      setNewEndDate('');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header with quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card bg-brand-primary text-white border-none">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-400 text-sm font-medium">Pendientes este mes</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{pendingRenewals.length.toString().padStart(2, '0')}</h3>
            </div>
            <div className="p-2 bg-slate-800 rounded-lg">
              <RefreshCcw className="w-5 h-5 text-brand-accent" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-400">
            <span>↑ Basado en datos actuales</span>
          </div>
        </div>
        
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-brand-accent">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Próximos 60 días</p>
            <h3 className="text-xl font-bold text-slate-800">{pendingRenewals.length}</h3>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-xl text-brand-success">
            <FileCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-slate-500 text-sm font-medium">Tasa de Renovación</p>
            <h3 className="text-xl font-bold text-slate-800">92%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800">Propuestas de Renovación</h3>
          <div className="space-y-4">
            {pendingRenewals.map((item) => (
              <div key={item.id} className="card group hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={item.employee?.avatar} alt={item.employee?.name} className="w-12 h-12 rounded-full border-2 border-slate-100" />
                    <div>
                      <p className="font-bold text-slate-800">{item.employee?.name}</p>
                      <p className="text-xs text-slate-500">{item.employee?.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Vence</p>
                      <p className="text-sm font-bold text-slate-700">{item.endDate}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300" />
                    <div>
                      <p className="text-[10px] uppercase font-bold text-brand-accent mb-0.5">Propuesta</p>
                      <p className="text-sm font-bold text-slate-800">Renovado</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedContract(item);
                      setNewEndDate(new Date(new Date(item.endDate).setFullYear(new Date(item.endDate).getFullYear() + 1)).toISOString().split('T')[0]);
                    }}
                    className="px-6 py-2 bg-brand-accent text-white text-xs font-bold rounded-xl hover:bg-blue-600 shadow-sm transition-all"
                  >
                    Procesar
                  </button>
                </div>
              </div>
            ))}
            {pendingRenewals.length === 0 && (
              <div className="p-12 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-medium font-sans">No hay renovaciones pendientes por el momento.</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="card bg-slate-50 border-dashed border-2 border-slate-200">
            <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-brand-accent" />
              Política de Alertas
            </h4>
            <div className="space-y-3">
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Anticipación Crítica</span>
                <span className="text-xs font-bold text-rose-500">30 días</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Anticipación Preventiva</span>
                <span className="text-xs font-bold text-amber-500">60 días</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Renewal Modal */}
      {selectedContract && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50 transition-all">
              <h3 className="text-lg font-bold text-slate-800">Confirmar Renovación</h3>
              <button onClick={() => setSelectedContract(null)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleRenew} className="p-8 space-y-6">
              <div className="text-center space-y-3">
                <img src={selectedContract.employee?.avatar} className="w-20 h-20 rounded-full mx-auto border-4 border-slate-100 shadow-sm" />
                <div>
                  <h4 className="font-bold text-xl text-slate-800">{selectedContract.employee?.name}</h4>
                  <p className="text-sm text-slate-500">{selectedContract.employee?.position}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Nueva Fecha de Vencimiento</label>
                <div className="relative group">
                  <Calendar className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 group-focus-within:text-brand-accent transition-colors" />
                  <input 
                    type="date"
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all font-medium"
                    value={newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setSelectedContract(null)} className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-3.5 bg-brand-accent text-white rounded-xl font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/10 transition-all">
                  Confirmar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
