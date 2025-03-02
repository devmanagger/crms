"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { TeamTable } from "@/components/team/team-table";
import { TeamMemberForm } from "@/components/team/team-member-form";
import { Button } from "@/components/ui/button";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Plus, Users } from "lucide-react";
import { User } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration
const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockTeamMembers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 6), // 6 months ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "supervisor",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 3), // 3 months ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    role: "agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30 * 2), // 2 months ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30), // 1 month ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: "5",
    name: "David Brown",
    email: "david.brown@example.com",
    role: "agent",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
];

export default function TeamPage() {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<User[]>(mockTeamMembers);
  const [user, setUser] = useState<User>(mockUser);
  
  // Team member form state
  const [memberFormOpen, setMemberFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<User | undefined>(undefined);
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);

  // Handle creating/editing team member
  const handleMemberSubmit = (data: any) => {
    if (editingMember) {
      // Update existing team member
      setTeamMembers(members => members.map(member => 
        member.id === editingMember.id 
          ? { ...member, ...data, updatedAt: new Date() } 
          : member
      ));
      toast({
        title: "Team member updated",
        description: `${data.name}'s information has been updated successfully.`,
      });
    } else {
      // Create new team member
      const newMember: User = {
        id: `${teamMembers.length + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setTeamMembers([...teamMembers, newMember]);
      toast({
        title: "Team member added",
        description: `${data.name} has been added to your team.`,
      });
    }
    setEditingMember(undefined);
  };

  // Handle team member deletion
  const handleDeleteMember = () => {
    if (memberToDelete) {
      setTeamMembers(members => members.filter(member => member.id !== memberToDelete));
      toast({
        title: "Team member removed",
        description: "The team member has been removed from your system.",
        variant: "destructive",
      });
      setMemberToDelete(null);
    }
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
            <p className="text-muted-foreground">
              Manage your call center team members and their roles.
            </p>
          </div>
          {user.role === "admin" && (
            <Button onClick={() => {
              setEditingMember(undefined);
              setMemberFormOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Team Member
            </Button>
          )}
        </div>

        <TeamTable 
          members={teamMembers}
          userRole={user.role}
          onEdit={(member) => {
            setEditingMember(member);
            setMemberFormOpen(true);
          }}
          onDelete={(memberId) => {
            setMemberToDelete(memberId);
            setDeleteDialogOpen(true);
          }}
        />

        {/* Team Member Form Dialog */}
        <TeamMemberForm 
          open={memberFormOpen}
          onOpenChange={setMemberFormOpen}
          onSubmit={handleMemberSubmit}
          member={editingMember}
          title={editingMember ? "Edit Team Member" : "Add New Team Member"}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the team member
                from your system and reassign any clients they were handling.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteMember}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
}