"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Users, 
  Phone, 
  Settings, 
  Bell, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  UserCircle,
  Headphones
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  userRole: 'admin' | 'supervisor' | 'agent';
  userName: string;
  userAvatar?: string;
}

export function Sidebar({ userRole, userName, userAvatar }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: BarChart3,
      roles: ['admin', 'supervisor', 'agent'],
    },
    {
      title: "Clients",
      href: "/clients",
      icon: Users,
      roles: ['admin', 'supervisor', 'agent'],
    },
    {
      title: "Calls",
      href: "/calls",
      icon: Phone,
      roles: ['admin', 'supervisor', 'agent'],
    },
    {
      title: "Team",
      href: "/team",
      icon: Headphones,
      roles: ['admin', 'supervisor'],
    },
    {
      title: "Notifications",
      href: "/notifications",
      icon: Bell,
      roles: ['admin', 'supervisor', 'agent'],
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
      roles: ['admin', 'supervisor', 'agent'],
    },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className={cn(
      "flex flex-col h-screen bg-card border-r border-border transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className={cn("flex items-center", collapsed && "justify-center w-full")}>
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <Headphones className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">NexusCRM</span>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard">
              <Headphones className="h-6 w-6 text-primary" />
            </Link>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {filteredNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                collapsed && "justify-center"
              )}
            >
              <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className={cn(
        "p-4 border-t border-border flex items-center",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatar} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{userName}</span>
              <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
            </div>
          </div>
        )}
        {collapsed && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        {!collapsed && (
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="ghost" size="icon" className="rounded-full">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}