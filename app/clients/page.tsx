"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ClientTable } from "@/components/clients/client-table";
import { ClientForm } from "@/components/clients/client-form";
import { CallForm } from "@/components/calls/call-form";
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
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Users } from "lucide-react";
import { User, Client } from "@/types";
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

const mockAgents = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
  { id: "3", name: "Mike Johnson" },
  { id: "4", name: "Sarah Williams" },
];

export default function ClientsPage() {
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [user, setUser] = useState<User>(mockUser);
  
  // Client form state
  const [clientFormOpen, setClientFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | undefined>(undefined);
  
  // Call form state
  const [callFormOpen, setCallFormOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Delete confirmation state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  
  // Assign dialog state
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [clientToAssign, setClientToAssign] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string>("");

  // Handle creating/editing client
  const handleClientSubmit = (data: any) => {
    if (editingClient) {
      // Update existing client
      setClients(clients.map(client => 
        client.id === editingClient.id 
          ? { ...client, ...data, updatedAt: new Date() } 
          : client
      ));
      toast({
        title: "Client updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Create new client
      const newClient: Client = {
        id: `${clients.length + 1}`,
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setClients([...clients, newClient]);
      toast({
        title: "Client created",
        description: `${data.name} has been added to your clients.`,
      });
    }
    setEditingClient(undefined);
  };

  // Handle client deletion
  const handleDeleteClient = () => {
    if (clientToDelete) {
      setClients(clients.filter(client => client.id !== clientToDelete));
      toast({
        title: "Client deleted",
        description: "The client has been removed from your system.",
        variant: "destructive",
      });
      setClientToDelete(null);
    }
  };

  // Handle client assignment
  const handleAssignClient = () => {
    if (clientToAssign && selectedAgent) {
      setClients(clients.map(client => 
        client.id === clientToAssign 
          ? { ...client, assignedTo: selectedAgent, updatedAt: new Date() } 
          : client
      ));
      toast({
        title: "Client assigned",
        description: `Client has been assigned to ${mockAgents.find(a => a.id === selectedAgent)?.name || 'an agent'}.`,
      });
      setClientToAssign(null);
      setSelectedAgent("");
    }
  };

  // Handle client unassignment
  const handleUnassignClient = (clientId: string) => {
    setClients(clients.map(client => 
      client.id === clientId 
        ? { ...client, assignedTo: undefined, updatedAt: new Date() } 
        : client
    ));
    toast({
      title: "Client unassigned",
      description: "The client is no longer assigned to any agent.",
    });
  };

  // Handle call recording
  const handleCallSubmit = (data: any) => {
    toast({
      title: "Call recorded",
      description: `Call to ${selectedClient?.name} has been recorded with status: ${data.status}.`,
    });
    setSelectedClient(null);
  };

  return (
    <DashboardLayout user={user}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clients</h1>
            <p className="text-muted-foreground">
              Manage your client database and interactions.
            </p>
          </div>
          <Button onClick={() => {
            setEditingClient(undefined);
            setClientFormOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>

        <ClientTable 
          clients={clients}
          userRole={user.role}
          onAssign={(clientId) => {
            setClientToAssign(clientId);
            setAssignDialogOpen(true);
          }}
          onUnassign={handleUnassignClient}
          onEdit={(client) => {
            setEditingClient(client);
            setClientFormOpen(true);
          }}
          onDelete={(clientId) => {
            setClientToDelete(clientId);
            setDeleteDialogOpen(true);
          }}
          onCall={(clientId) => {
            const client = clients.find(c => c.id === clientId);
            if (client) {
              setSelectedClient(client);
              setCallFormOpen(true);
            }
          }}
        />

        {/* Client Form Dialog */}
        <ClientForm 
          open={clientFormOpen}
          onOpenChange={setClientFormOpen}
          onSubmit={handleClientSubmit}
          client={editingClient}
          title={editingClient ? "Edit Client" : "Add New Client"}
        />

        {/* Call Form Dialog */}
        {selectedClient && (
          <CallForm 
            open={callFormOpen}
            onOpenChange={setCallFormOpen}
            onSubmit={handleCallSubmit}
            client={selectedClient}
          />
        )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the client
                and all associated records from your database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleDeleteClient}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Assign Client Dialog */}
        <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign Client to Agent</DialogTitle>
              <DialogDescription>
                Select an agent to handle this client's account.
              </DialogDescription>
            </DialogHeader>
            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Select an agent" />
              </SelectTrigger>
              <SelectContent>
                {mockAgents.map(agent => (
                  <SelectItem key={agent.id} value={agent.id}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <DialogFooter>
              <Button 
                onClick={handleAssignClient}
                disabled={!selectedAgent}
              >
                Assign
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}