export type UserRole = 'admin' | 'supervisor' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'inactive' | 'pending';
  assignedTo?: string; // User ID
  createdAt: Date;
  updatedAt: Date;
}

export interface Call {
  id: string;
  clientId: string;
  agentId: string;
  status: 'effective' | 'hung-up' | 'in-progress';
  duration: number; // in seconds
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  clientId: string;
  userId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientHistory {
  id: string;
  clientId: string;
  userId: string;
  action: 'created' | 'updated' | 'assigned' | 'unassigned' | 'deleted';
  details: string;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  createdAt: Date;
}

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalCalls: number;
  effectiveCalls: number;
  callsToday: number;
  pendingAssignments: number;
}

export interface AgentPerformance {
  userId: string;
  userName: string;
  totalCalls: number;
  effectiveCalls: number;
  effectivenessRate: number;
  averageCallDuration: number;
  clientsAssigned: number;
}