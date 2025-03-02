"use client";

import { ReactNode } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { User } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  user: User;
}

export function DashboardLayout({ children, user }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        userRole={user.role} 
        userName={user.name} 
        userAvatar={user.avatar} 
      />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}