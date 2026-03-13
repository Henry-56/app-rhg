export type ContractType = 'temporal' | 'indefinido' | 'practicas' | 'relevo';
export type ContractStatus = 'activo' | 'vencido' | 'proximo_vencer' | 'renovado';

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  avatar: string;
  joinDate: string;
}

export interface Contract {
  id: string;
  employeeId: string;
  type: ContractType;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  documentUrl?: string;
}

export const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Carlos Mendoza', position: 'Desarrollador Senior', department: 'Tecnología', email: 'carlos.m@empresa.com', avatar: 'https://i.pravatar.cc/150?u=1', joinDate: '2023-01-15' },
  { id: '2', name: 'Ana García', position: 'Analista de RRHH', department: 'Recursos Humanos', email: 'ana.g@empresa.com', avatar: 'https://i.pravatar.cc/150?u=2', joinDate: '2022-06-10' },
  { id: '3', name: 'Luis Rivas', position: 'Gerente de Ventas', department: 'Comercial', email: 'luis.r@empresa.com', avatar: 'https://i.pravatar.cc/150?u=3', joinDate: '2021-11-20' },
  { id: '4', name: 'Elena Torres', position: 'Diseñadora UX', department: 'Marketing', email: 'elena.t@empresa.com', avatar: 'https://i.pravatar.cc/150?u=4', joinDate: '2023-08-01' },
  { id: '5', name: 'Javier Roca', position: 'Contador', department: 'Finanzas', email: 'javier.r@empresa.com', avatar: 'https://i.pravatar.cc/150?u=5', joinDate: '2022-02-14' },
];

// Today is 2026-03-13
export const CONTRACTS: Contract[] = [
  { id: 'C1', employeeId: '1', type: 'temporal', startDate: '2025-03-20', endDate: '2026-03-20', status: 'proximo_vencer' },
  { id: 'C2', employeeId: '2', type: 'indefinido', startDate: '2022-06-10', endDate: '2099-12-31', status: 'activo' },
  { id: 'C3', employeeId: '3', type: 'temporal', startDate: '2025-11-20', endDate: '2026-05-20', status: 'activo' },
  { id: 'C4', employeeId: '4', type: 'practicas', startDate: '2025-08-01', endDate: '2026-03-25', status: 'proximo_vencer' },
  { id: 'C5', employeeId: '5', type: 'temporal', startDate: '2026-02-14', endDate: '2027-02-14', status: 'activo' },
];
