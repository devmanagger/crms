"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PerformanceChart } from "@/components/dashboard/performance-chart";
import { CallsByStatusChart } from "@/components/dashboard/calls-by-status-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { User, DashboardStats, AgentPerformance, ClientHistory } from "@/types";
import { Phone, Users, CheckCircle, Clock } from "lucide-react";

// Mock data for demonstration
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockStats: DashboardStats = {
  totalClients: 156,
  activeClients: 98,
  totalCalls: 1243,
  effectiveCalls: 876,
  callsToday: 42,
  pendingAssignments: 12,
};

const mockPerformance: AgentPerformance[] = [
  {
    userId: "1",
    userName: "John Doe",
    totalCalls: 342,
    effectiveCalls: 289,
    effectivenessRate: 0.84,
    averageCallDuration: 186,
    clientsAssigned: 45,
  },
  {
    userId: "2",
    userName: "Jane Smith",
    totalCalls: 287,
    effectiveCalls: 231,
    effectivenessRate: 0.80,
    averageCallDuration: 210,
    clientsAssigned: 38,
  },
  {
    userId: "3",
    userName: "Mike Johnson",
    totalCalls: 198,
    effectiveCalls: 142,
    effectivenessRate: 0.72,
    averageCallDuration: 165,
    clientsAssigned: 27,
  },
  {
    userId: "4",
    userName: "Sarah Williams",
    totalCalls: 416,
    effectiveCalls: 352,
    effectivenessRate: 0.85,
    averageCallDuration: 195,
    clientsAssigned: 52,
  },
];

const mockCallsByStatus = [
  { status: "Effective", value: 876 },
  { status: "Hung Up", value: 245 },
  { status: "In Progress", value: 122 },
];

const mockActivities: ClientHistory[] = [
  {
    id: "1",
    clientId: "client1",
    userId: "user1",
    action: "created",
    details: "Created new client record for Acme Inc.",
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    clientId: "client2",
    userId: "user2",
    action: "updated",
    details: "Updated contact information for TechCorp.",
    createdAt: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
  },
  {
    id: "3",
    clientId: "client3",
    userId: "user1",
    action: "assigned",
    details: "Assigned Global Industries to Agent Sarah.",
    createdAt: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
  },
  {
    id: "4",
    clientId: "client4",
    userId: "user3",
    action: "unassigned",
    details: "Unassigned Stark Enterprises from Agent Mike.",
    createdAt: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
  },
  {
    id: "5",
    clientId: "client5",
    userId: "user1",
    action: "deleted",
    details: "Deleted inactive client Wayne Corp.",
    createdAt: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
  },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [performance, setPerformance] = useState<AgentPerformance[]>(mockPerformance);
  const [callsByStatus, setCallsByStatus] = useState(mockCallsByStatus);
  const [activities, setActivities] = useState<ClientHistory[]>(mockActivities);
  const [user, setUser] = useState<User>(mockUser);

  // In a real application, you would fetch this data from your API
  useEffect(() => {
    // Simulate API calls
    // fetchStats().then(setStats);
    // fetchPerformance().then(setPerformance);
    // fetchCallsByStatus().then(setCallsByStatus);
    // fetchActivities().then(setActivities);
    // fetchCurrentUser().then(setUser);
  }, []);

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your call center performance and activities.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Clients"
            value={stats.totalClients}
            icon={<Users className="h-4 w-4" />}
            description={`${stats.activeClients} active`}
          />
          <StatsCard
            title="Total Calls"
            value={stats.totalCalls}
            icon={<Phone className="h-4 w-4" />}
            description="All time"
          />
          <StatsCard
            title="Effective Calls"
            value={`${Math.round((stats.effectiveCalls / stats.totalCalls) * 100)}%`}
            icon={<CheckCircle className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
            description="Conversion rate"
          />
          <StatsCard
            title="Calls Today"
            value={stats.callsToday}
            icon={<Clock className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
            description="vs. yesterday"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <PerformanceChart 
            data={performance} 
            title="Agent Performance" 
            description="Call metrics by agent"
          />
          <CallsByStatusChart 
            data={callsByStatus} 
            title="Calls by Status" 
            description="Distribution of call outcomes"
          />
        </div>

        <RecentActivity activities={activities} />
      </div>
    </DashboardLayout>
  );
}