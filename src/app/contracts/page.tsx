'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  RefreshCcw,
  Calendar
} from 'lucide-react';
import { useData } from '@/context/DataContext';
import { ContractStatus, ContractType } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function ContractsPage() {
  const { contracts, employees, addContract } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const [newContract, setNewContract] = useState({
    employeeId: '',
    type: 'temporal' as ContractType,
    startDate: '2026-03-13',
    endDate: '2027-03-13',
  });

  const getStatusConfig = (status: ContractStatus) => {
    switch (status) {
      case 'activo': return { label: 'Activo', color: 'bg-emerald-100 text-emerald-700', icon: CheckCircle2 };
      case 'proximo_vencer': return { label: 'Por vencer', color: 'bg-amber-100 text-amber-700', icon: Clock };
      case 'vencido': return { label: 'Vencido', color: 'bg-rose-100 text-rose-700', icon: AlertCircle };
      case 'renovado': return { label: 'Renovado', color: 'bg-blue-100 text-blue-700', icon: CheckCircle2 };
      default: return { label: status, color: 'bg-slate-100 text-slate-700', icon: FileText };
    }
  };

  const filteredContracts = contracts.map(contract => ({
    ...contract,
    employee: employees.find(e => e.id === contract.employeeId)
  })).filter(item => 
    item.employee?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addContract(newContract);
    setIsModalOpen(false);
    setNewContract({
      employeeId: '',
      type: 'temporal',
      startDate: '2026-03-13',
      endDate: '2027-03-13',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Gestión centralizada de documentos laborales</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2 w-fit"
        >
          <Plus className="w-4 h-4" />
          Nuevo Contrato
        </button>
      </div>

      <div className="card flex flex-col md:flex-row items-center gap-4 py-4 px-6">
        <div className="relative flex-1 w-full">
          <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Buscar por empleado o tipo de contrato..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="card overflow-hidden p-0 border-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Empleado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Periodo</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredContracts.map((item) => {
                const status = getStatusConfig(item.status);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-brand-accent" />
                        </div>
                        <span className="text-sm font-bold text-slate-800">{item.employee?.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-sm text-slate-600 font-medium">{item.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-700">{item.startDate}</span>
                        <span className="text-[10px] text-slate-400 font-medium">Hasta {item.endDate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold", status.color)}>
                        <status.icon className="w-3 h-3" />
                        {status.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.status === 'proximo_vencer' && (
                          <button 
                            onClick={() => router.push('/renewals')}
                            title="Gestionar Renovación" 
                            className="p-2 text-slate-400 hover:text-brand-accent hover:bg-blue-50 rounded-lg transition-all"
                          >
                            <RefreshCcw className="w-4 h-4" />
                          </button>
                        )}
                        <button title="Ver Documento" className="p-2 text-slate-400 hover:text-brand-accent hover:bg-blue-50 rounded-lg transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* New Contract Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-lg font-bold text-slate-800">Registrar Nuevo Contrato</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Empleado</label>
                <select 
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                  value={newContract.employeeId}
                  onChange={(e) => setNewContract({...newContract, employeeId: e.target.value})}
                >
                  <option value="">Seleccionar empleado...</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name} ({emp.department})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Tipo de Contrato</label>
                <select 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                  value={newContract.type}
                  onChange={(e) => setNewContract({...newContract, type: e.target.value as ContractType})}
                >
                  <option value="temporal">Temporal</option>
                  <option value="indefinido">Indefinido</option>
                  <option value="practicas">Prácticas</option>
                  <option value="relevo">Relevo</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha Inicio</label>
                  <input 
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                    value={newContract.startDate}
                    onChange={(e) => setNewContract({...newContract, startDate: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha Vencimiento</label>
                  <input 
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all"
                    value={newContract.endDate}
                    onChange={(e) => setNewContract({...newContract, endDate: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all">
                  Cancelar
                </button>
                <button type="submit" className="flex-1 py-3.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                  Guardar Contrato
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
