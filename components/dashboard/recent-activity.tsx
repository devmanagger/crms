"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { ClientHistory } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { UserCircle, Edit, Trash, UserPlus, UserMinus, Plus, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";

interface RecentActivityProps {
  activities: ClientHistory[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");
  const [selectedActivity, setSelectedActivity] = useState<ClientHistory | null>(null);
  const [activityDetailsOpen, setActivityDetailsOpen] = useState(false);
  
  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(activity => activity.action === filter);

  const getActivityIcon = (action: string) => {
    switch (action) {
      case "created":
        return <Plus className="h-4 w-4 text-green-500" />;
      case "updated":
        return <Edit className="h-4 w-4 text-blue-500" />;
      case "assigned":
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      case "unassigned":
        return <UserMinus className="h-4 w-4 text-orange-500" />;
      case "deleted":
        return <Trash className="h-4 w-4 text-red-500" />;
      default:
        return <UserCircle className="h-4 w-4" />;
    }
  };

  const getActivityText = (activity: ClientHistory) => {
    switch (activity.action) {
      case "created":
        return `created a new client`;
      case "updated":
        return `updated client information`;
      case "assigned":
        return `assigned client to an agent`;
      case "unassigned":
        return `unassigned client from an agent`;
      case "deleted":
        return `deleted a client`;
      default:
        return `performed an action`;
    }
  };

  const handleActivityClick = (activity: ClientHistory) => {
    setSelectedActivity(activity);
    setActivityDetailsOpen(true);
  };

  const navigateToClient = () => {
    if (selectedActivity) {
      router.push(`/clients?id=${selectedActivity.clientId}`);
      setActivityDetailsOpen(false);
    }
  };

  return (
    <>
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest actions on client records</CardDescription>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="updated">Updated</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem> {/* Aquí estaba el error */}
              <SelectItem value="unassigned">Unassigned</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          {filteredActivities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3">
              {getActivityIcon(activity.action)}
              <span>{getActivityText(activity)}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
