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
import { 
  UserCircle, 
  Edit, 
  Trash, 
  UserPlus, 
  UserMinus, 
  Plus, 
  ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface RecentActivityProps {
  activities: ClientHistory[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<string>("all");

  const filteredActivities = filter === "all" 
    ? activities 
    : activities.filter(activity => activity.action === filter);

  const getActivityIcon = (action: string) => {
    switch (action) {
      case "created":
        return <Plus className="h-5 w-5 text-green-500" />;
      case "updated":
        return <Edit className="h-5 w-5 text-blue-500" />;
      case "assigned":
        return <UserPlus className="h-5 w-5 text-purple-500" />;
      case "unassigned":
        return <UserMinus className="h-5 w-5 text-orange-500" />;
      case "deleted":
        return <Trash className="h-5 w-5 text-red-500" />;
      default:
        return <UserCircle className="h-5 w-5" />;
    }
  };

  const getActivityText = (activity: ClientHistory) => {
    switch (activity.action) {
      case "created":
        return `Created a new client`;
      case "updated":
        return `Updated client information`;
      case "assigned":
        return `Assigned client to an agent`;
      case "unassigned":
        return `Unassigned client from an agent`;
      case "deleted":
        return `Deleted a client`;
      default:
        return `Performed an action`;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest actions on client records
          </CardDescription>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="created">Created</SelectItem>
            <SelectItem value="updated">Updated</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="unassigned">Unassigned</SelectItem>
            <SelectItem value="deleted">Deleted</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <UserCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No recent activity</h3>
              <p className="text-muted-foreground">
                There is no activity to display at this time.
              </p>
            </div>
          ) : (
            filteredActivities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start gap-4 p-4 rounded-lg border bg-background"
              >
                <div className="mt-1">{getActivityIcon(activity.action)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      {getActivityText(activity)}
                      <Badge variant="secondary" className="ml-2">
                        {activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                      </Badge>
                    </h4>
                    <span className="text-xs text-muted-foreground">
                    {activity.timestamp ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }) : "Unknown time"}

                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Client ID: {activity.clientId}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => router.push(`/clients?id=${activity.clientId}`)}
                  title="View client"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
