"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { CallHistory } from "@/components/calls/call-history";
import { User, Call, Client } from "@/types";

// Mock data for demonstration
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockClients: Client[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Corp",
    status: "active",
    assignedTo: "2",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "TechStart Inc",
    email: "info@techstart.com",
    phone: "+1 (555) 987-6543",
    company: "TechStart",
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Global Industries",
    email: "contact@globalind.com",
    phone: "+1 (555) 456-7890",
    company: "Global Industries",
    status: "inactive",
    assignedTo: "3",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Stark Enterprises",
    email: "info@stark.com",
    phone: "+1 (555) 789-0123",
    company: "Stark Enterprises",
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Wayne Corp",
    email: "business@waynecorp.com",
    phone: "+1 (555) 234-5678",
    company: "Wayne Corp",
    status: "active",
    assignedTo: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mockCalls: Call[] = [
  {
    id: "1",
    clientId: "1",
    agentId: "2",
    status: "effective",
    duration: 325, // 5:25
    notes: "Discussed new product offerings and scheduled a follow-up call next week.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "2",
    clientId: "3",
    agentId: "1",
    status: "hung-up",
    duration: 45, // 0:45
    notes: "Client was busy and asked to call back later.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "3",
    clientId: "2",
    agentId: "3",
    status: "effective",
    duration: 482, // 8:02
    notes: "Resolved billing issue and provided information about premium support options.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
  {
    id: "4",
    clientId: "5",
    agentId: "1",
    status: "in-progress",
    duration: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    clientId: "4",
    agentId: "4",
    status: "effective",
    duration: 267, // 4:27
    notes: "Client agreed to upgrade their subscription plan.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "6",
    clientId: "1",
    agentId: "2",
    status: "effective",
    duration: 198, // 3:18
    notes: "Provided technical support for integration issues.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 30), // 30 hours ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 30),
  },
  {
    id: "7",
    clientId: "3",
    agentId: "3",
    status: "hung-up",
    duration: 12, // 0:12
    notes: "Call dropped due to poor connection.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
  },
];

export default function CallsPage() {
  const [calls, setCalls] = useState<Call[]>(mockCalls);
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [user, setUser] = useState<User>(mockUser);

  // In a real application, you would fetch this data from your API
  useEffect(() => {
    // fetchCalls().then(setCalls);
    // fetchClients().then(setClients);
    // fetchCurrentUser().then(setUser);
  }, []);

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Call Management</h1>
          <p className="text-muted-foreground">
            Track and analyze all client calls and interactions.
          </p>
        </div>

        <CallHistory 
          calls={calls} 
          clients={clients} 
          userRole={user.role} 
        />
      </div>
    </DashboardLayout>
  );
}