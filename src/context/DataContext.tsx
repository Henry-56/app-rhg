'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Employee, Contract, EMPLOYEES as INITIAL_EMPLOYEES, CONTRACTS as INITIAL_CONTRACTS } from '@/lib/mock-data';

interface DataContextType {
  employees: Employee[];
  contracts: Contract[];
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, employee: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  addContract: (contract: Omit<Contract, 'id' | 'status'>) => void;
  renewContract: (contractId: string, newEndDate: string) => void;
  updateContractStatus: (id: string, status: Contract['status']) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const TODAY = new Date('2026-03-13');

const getDynamicStatus = (contract: { endDate: string }): Contract['status'] => {
  if (contract.endDate === '2099-12-31') return 'activo';
  
  const end = new Date(contract.endDate);
  const diffTime = end.getTime() - TODAY.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'vencido';
  if (diffDays <= 30) return 'proximo_vencer';
  return 'activo';
};

export function DataProvider({ children }: { children: ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Storage Keys with versioning
  const EMPLOYEES_KEY = 'rh_employees_v4';
  const CONTRACTS_KEY = 'rh_contracts_v4';

  // Initialize from LocalStorage or Mock Data
  useEffect(() => {
    const savedEmployees = localStorage.getItem(EMPLOYEES_KEY);
    const savedContracts = localStorage.getItem(CONTRACTS_KEY);

    if (savedEmployees && savedContracts) {
      const parsedEmployees = JSON.parse(savedEmployees);
      const parsedContracts = JSON.parse(savedContracts);
      
      // Re-calculate statuses based on TODAY for existing data
      const updatedContracts = parsedContracts.map((c: Contract) => ({
        ...c,
        status: (c.status === 'renovado') ? 'renovado' : getDynamicStatus(c)
      }));

      setEmployees(parsedEmployees);
      setContracts(updatedContracts);
    } else {
      const initialWithStatus = INITIAL_CONTRACTS.map(c => ({
        ...c,
        status: getDynamicStatus(c)
      }));
      setEmployees(INITIAL_EMPLOYEES);
      setContracts(initialWithStatus);
      localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(INITIAL_EMPLOYEES));
      localStorage.setItem(CONTRACTS_KEY, JSON.stringify(initialWithStatus));
    }
    setIsLoaded(true);
  }, []);

  // Sync with LocalStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(EMPLOYEES_KEY, JSON.stringify(employees));
      localStorage.setItem(CONTRACTS_KEY, JSON.stringify(contracts));
    }
  }, [employees, contracts, isLoaded, EMPLOYEES_KEY, CONTRACTS_KEY]);

  const addEmployee = (emp: Omit<Employee, 'id'>) => {
    const newEmp = { ...emp, id: Math.random().toString(36).substr(2, 9) };
    setEmployees(prev => [...prev, newEmp]);
  };

  const updateEmployee = (id: string, updates: Partial<Employee>) => {
    setEmployees(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setContracts(prev => prev.filter(c => c.employeeId !== id));
  };

  const addContract = (con: Omit<Contract, 'id' | 'status'>) => {
    const newCon: Contract = { 
      ...con, 
      id: `C${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      status: getDynamicStatus(con)
    };
    setContracts(prev => [...prev, newCon]);
  };

  const renewContract = (contractId: string, newEndDate: string) => {
    setContracts(prev => prev.map(c => 
      c.id === contractId 
        ? { ...c, endDate: newEndDate, status: 'renovado' } as Contract
        : c
    ));
  };

  const updateContractStatus = (id: string, status: Contract['status']) => {
    setContracts(prev => prev.map(c => c.id === id ? { ...c, status } as Contract : c));
  };

  return (
    <DataContext.Provider value={{ 
      employees, 
      contracts, 
      addEmployee, 
      updateEmployee, 
      deleteEmployee,
      addContract,
      renewContract,
      updateContractStatus
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
