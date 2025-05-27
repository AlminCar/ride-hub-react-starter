import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Shield,
  Users,
  MessageSquare,
  Settings,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";
import type { PendingUserType, ReportedIssueType } from "@/types/admin";


const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [featureFlags, setFeatureFlags] = useState({
    mapIntegration: true,
    realTimeMessaging: true,
    pushNotifications: false,
    costSharing: true,
    adminReporting: true,
  });
  const [pendingUsers, setPendingUsers] = useState<PendingUserType[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
      status: "pending",
      joinDate: "2024-01-15",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1234567891",
      status: "pending",
      joinDate: "2024-01-16",
    },
  ]);

  const [reportedIssues, setReportedIssues] = useState<ReportedIssueType[]>([
    {
      id: 1,
      type: "ride",
      reporter: "Alice Johnson",
      subject: "Driver was late",
      status: "open",
      date: "2024-01-14",
    },
    {
      id: 2,
      type: "message",
      reporter: "Bob Wilson",
      subject: "Inappropriate content",
      status: "investigating",
      date: "2024-01-13",
    },
  ]);


  const handleUserApproval = (userId: number, action: "approve" | "reject") => {
    const user = pendingUsers.find((pendingUser) => pendingUser.id === userId)
    setPendingUsers(pendingUsers.filter((pendingUser) => pendingUser.id !== userId));
    toast.success(`User ${user.name} ${action}d`);
  };

  const handleIssueResolution = (issueId: number, action: string) => {
    const issue = reportedIssues.find((reportedIssue) => reportedIssue.id === issueId)
    setReportedIssues(reportedIssues.filter((reportedIssue) => reportedIssue.id !== issueId));
    toast.success(`Issue ${issue.subject} ${action}d`)
  };

  const handleFeatureToggle = (feature: string, enabled: boolean) => {
    setFeatureFlags((prev) => ({ ...prev, [feature]: enabled }));
    console.log(`Feature ${feature} ${enabled ? "enabled" : "disabled"}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span>Admin Dashboard</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Manage users, content, and system settings
          </p>
        </div>

        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="issues">Issue Reports</TabsTrigger>
            <TabsTrigger value="content">Content Moderation</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Pending User Approvals</span>
                </CardTitle>
                <CardDescription>
                  Review and approve new user registrations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-sm text-gray-500">{user.phone}</p>
                          <p className="text-xs text-gray-400">
                            Applied:{" "}
                            {new Date(user.joinDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleUserApproval(user.id, "approve")}
                        >
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleUserApproval(user.id, "reject")}
                        >
                          <XCircle className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="issues" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Reported Issues</span>
                </CardTitle>
                <CardDescription>
                  Review and resolve user-reported issues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportedIssues.map((issue) => (
                    <div key={issue.id} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{issue.type}</Badge>
                          <Badge
                            className={
                              issue.status === "open"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }
                          >
                            {issue.status}
                          </Badge>
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(issue.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="font-medium">{issue.subject}</p>
                      <p className="text-sm text-gray-600">
                        Reported by: {issue.reporter}
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleIssueResolution(issue.id, "investigating")
                          }
                        >
                          Investigate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            handleIssueResolution(issue.id, "resolved")
                          }
                        >
                          Mark Resolved
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleIssueResolution(issue.id, "escalated")
                          }
                        >
                          Escalate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Content Moderation</span>
                </CardTitle>
                <CardDescription>
                  Moderate messages and ride descriptions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex space-x-4">
                    <Input
                      placeholder="Search messages or content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button>Search</Button>
                  </div>
                  <div className="text-center py-8 text-gray-500">
                    Content moderation tools will be displayed here
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Feature Toggles</span>
                </CardTitle>
                <CardDescription>
                  Enable or disable platform features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(featureFlags).map(([feature, enabled]) => (
                  <div
                    key={feature}
                    className="flex items-center justify-between"
                  >
                    <Label htmlFor={feature} className="capitalize">
                      {feature.replace(/([A-Z])/g, " $1").trim()}
                    </Label>
                    <Switch
                      id={feature}
                      checked={enabled}
                      onCheckedChange={(checked) =>
                        handleFeatureToggle(feature, checked)
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Templates</CardTitle>
                <CardDescription>
                  Manage email and push notification templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="welcome-email">Welcome Email Template</Label>
                  <Textarea
                    id="welcome-email"
                    placeholder="Welcome to our carpool platform..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ride-notification">
                    Ride Notification Template
                  </Label>
                  <Textarea
                    id="ride-notification"
                    placeholder="Your ride request has been..."
                    rows={4}
                  />
                </div>
                <Button>Save Templates</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
