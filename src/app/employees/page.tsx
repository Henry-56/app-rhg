'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter, ExternalLink, Trash2, X } from 'lucide-react'
import { useData } from '@/context/DataContext'
import { Employee } from '@/lib/mock-data'

export default function EmployeesPage() {
    const { employees, addEmployee, deleteEmployee } = useData()
    const [searchTerm, setSearchTerm] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalProfileOpen, setIsModalProfileOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
    const [newEmployee, setNewEmployee] = useState<Omit<Employee, 'id'>>({
        name: '',
        position: '',
        department: '',
        email: '',
        joinDate: new Date().toISOString().split('T')[0],
        avatar: 'https://i.pravatar.cc/150?u=' + Math.random(),
    })

    const Tipo = [
        {id: 1, tipo: 'Temporal'},
        {id: 2, tipo: 'Indefinido'},
        {id: 3, tipo: 'Temporal'},
        {id: 4, tipo: 'Practicas'},
        {id: 5, tipo: 'Temporal'},
    ]

    const Contrato = (id = 1)=>{
        const contrato = Tipo.find(t => t.id == id)
        return contrato ? contrato.tipo : 'N/A'
    }

    const filteredEmployees = employees.filter(
        emp =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.department.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        addEmployee(newEmployee)
        setIsModalOpen(false)
        setNewEmployee({
            name: '',
            position: '',
            department: '',
            email: '',
            joinDate: new Date().toISOString().split('T')[0],
            avatar: 'https://i.pravatar.cc/150?u=' + Math.random(),
        })
    }

    return (
        <div className='space-y-6'>
            {/* Header Actions */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div className='space-y-1'>
                    <p className='text-sm font-medium text-slate-500'>
                        Total: {employees.length} empleados registrados
                    </p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className='btn-primary flex items-center gap-2 w-fit'>
                    <Plus className='w-4 h-4' />
                    Registrar Empleado
                </button>
            </div>

            {/* Filters & Search */}
            <div className='card flex flex-col md:flex-row items-center gap-4 py-4 px-6'>
                <div className='relative flex-1 w-full'>
                    <Search className='w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2' />
                    <input
                        type='text'
                        placeholder='Buscar por nombre, cargo o departamento...'
                        className='w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all'
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-2 w-full md:w-auto'>
                    <button className='flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all'>
                        <Filter className='w-4 h-4' />
                        Filtros
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className='card overflow-hidden p-0 border-none'>
                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-slate-50 border-b border-slate-200'>
                                <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>
                                    Empleado
                                </th>
                                <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>
                                    Departamento
                                </th>
                                <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider'>
                                    Fecha de Ingreso
                                </th>
                                <th className='px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right'>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className='divide-y divide-slate-100'>
                            {filteredEmployees.map(emp => (
                                <tr
                                    onClick={() => {
                                        setSelectedEmployee(emp)
                                        setIsModalProfileOpen(
                                            !isModalProfileOpen,
                                        )
                                    }}
                                    key={emp.id}
                                    className='hover:bg-slate-50/50 transition-colors group'>
                                    <td className='px-6 py-4'>
                                        <div className='flex items-center gap-3'>
                                            <img
                                                src={emp.avatar}
                                                alt={emp.name}
                                                className='w-10 h-10 rounded-full border-2 border-slate-100'
                                            />
                                            <div>
                                                <p className='text-sm font-bold text-slate-800'>
                                                    {emp.name}
                                                </p>
                                                <p className='text-xs text-slate-500'>
                                                    {emp.position}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <span className='px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold'>
                                            {emp.department}
                                        </span>
                                    </td>
                                    <td className='px-6 py-4 text-sm text-slate-600 font-medium'>
                                        {emp.joinDate}
                                    </td>
                                    <td className='px-6 py-4 text-right'>
                                        <div className='flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                                            <button
                                                title='Ver Perfil'
                                                className='p-2 text-slate-400 hover:text-brand-accent hover:bg-blue-50 rounded-lg transition-all'>
                                                <ExternalLink className='w-4 h-4' />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    deleteEmployee(emp.id)
                                                }
                                                title='Eliminar'
                                                className='p-2 text-slate-400 hover:text-brand-danger hover:bg-red-50 rounded-lg transition-all'>
                                                <Trash2 className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalProfileOpen && (
                <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4'>
                    <div className='bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200'>
                        <div className='p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50'>
                            <h3 className='text-lg font-bold text-slate-800'>
                                Perfil del Empleado
                            </h3>

                            <button
                                onClick={() => setIsModalProfileOpen(false)}
                                className='p-2 hover:bg-slate-200 rounded-full transition-colors'>
                                <X className='w-5 h-5 text-slate-500' />
                            </button>
                        </div>

                        <div className='p-6 space-y-6'>
                            <div className='flex flex-col items-center text-center'>
                                <img
                                    src={selectedEmployee?.avatar}
                                    alt={selectedEmployee?.name}
                                    className='w-24 h-24 rounded-full object-cover border-4 border-slate-100 shadow'
                                />

                                <h2 className='mt-3 text-xl font-bold text-slate-800'>
                                    {selectedEmployee?.name}
                                </h2>

                                <p className='text-sm text-slate-500'>
                                    {selectedEmployee?.position}
                                </p>

                                <span className='mt-2 text-xs bg-slate-100 px-3 py-1 rounded-full text-slate-600'>
                                    {selectedEmployee?.department}
                                </span>
                            </div>

                            <div className='grid grid-cols-1 gap-4 text-sm'>
                                <div className='flex justify-between pb-2'>
                                    <span className='text-slate-500'>Contrato</span>
                                    <span className='font-medium text-slate-700 bg-slate-100 px-2 rounded-full'>
                                        {Contrato(selectedEmployee?.id)}
                                    </span>
                                </div>

                                <div className='flex justify-between pb-2'>
                                    <span className='text-slate-500'>
                                        Correo
                                    </span>
                                    <span className='font-medium text-slate-700'>
                                        {selectedEmployee?.email}
                                    </span>
                                </div>

                                <div className='flex justify-between pb-2'>
                                    <span className='text-slate-500'>
                                        Departamento
                                    </span>
                                    <span className='font-medium text-slate-700'>
                                        {selectedEmployee?.department}
                                    </span>
                                </div>

                                <div className='flex justify-between'>
                                    <span className='text-slate-500'>
                                        Fecha de ingreso
                                    </span>
                                    <span className='font-medium text-slate-700'>
                                        {selectedEmployee?.joinDate}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Registration Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[100] p-4'>
                    <div className='bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200'>
                        <div className='p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50'>
                            <h3 className='text-lg font-bold text-slate-800'>
                                Registrar Nuevo Empleado
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className='p-2 hover:bg-slate-200 rounded-full transition-colors'>
                                <X className='w-5 h-5 text-slate-500' />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className='p-8 space-y-5'>
                            <div className='grid grid-cols-1 gap-5'>
                                <div className='space-y-1.5'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>
                                        Nombre Completo
                                    </label>
                                    <input
                                        required
                                        className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all'
                                        value={newEmployee.name}
                                        onChange={e =>
                                            setNewEmployee({
                                                ...newEmployee,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div className='grid grid-cols-2 gap-4'>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-bold text-slate-500 uppercase'>
                                            Cargo
                                        </label>
                                        <input
                                            required
                                            className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all'
                                            value={newEmployee.position}
                                            onChange={e =>
                                                setNewEmployee({
                                                    ...newEmployee,
                                                    position: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className='space-y-1.5'>
                                        <label className='text-xs font-bold text-slate-500 uppercase'>
                                            Departamento
                                        </label>
                                        <select
                                            className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all'
                                            value={newEmployee.department}
                                            onChange={e =>
                                                setNewEmployee({
                                                    ...newEmployee,
                                                    department: e.target.value,
                                                })
                                            }>
                                            <option value=''>
                                                Seleccionar...
                                            </option>
                                            <option value='Tecnología'>
                                                Tecnología
                                            </option>
                                            <option value='Recursos Humanos'>
                                                Recursos Humanos
                                            </option>
                                            <option value='Comercial'>
                                                Comercial
                                            </option>
                                            <option value='Finanzas'>
                                                Finanzas
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className='space-y-1.5'>
                                    <label className='text-xs font-bold text-slate-500 uppercase'>
                                        Correo Electrónico
                                    </label>
                                    <input
                                        type='email'
                                        required
                                        className='w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all'
                                        value={newEmployee.email}
                                        onChange={e =>
                                            setNewEmployee({
                                                ...newEmployee,
                                                email: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                            <div className='pt-4 flex gap-3'>
                                <button
                                    type='button'
                                    onClick={() => setIsModalOpen(false)}
                                    className='flex-1 py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all'>
                                    Cancelar
                                </button>
                                <button
                                    type='submit'
                                    className='flex-1 py-3.5 bg-brand-primary text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10'>
                                    Guardar Registro
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
