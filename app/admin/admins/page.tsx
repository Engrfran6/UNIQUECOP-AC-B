"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {useAuth} from "@/contexts/AuthContext";
import {useToast} from "@/hooks/use-toast";
import {AdminLevel, AdminUser, createAdminUser, getAllAdmins, updateAdminUser} from "@/lib/admin";
import {db} from "@/lib/firebase";
import {collection, getDocs, query} from "firebase/firestore";
import {Plus, Shield, UserPlus, Users} from "lucide-react";
import {useEffect, useState} from "react";

interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
}

const AdminManagementPage = () => {
  const {hasPermission, adminLevel, adminData} = useAuth();
  const {toast} = useToast();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<AdminLevel>("editor");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (hasPermission("manage_admins")) {
      fetchData();
    }
  }, [hasPermission]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersSnapshot, adminsData] = await Promise.all([
        getDocs(query(collection(db, "users"))),
        getAllAdmins(),
      ]);

      const usersData = usersSnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as User[];

      setUsers(usersData);
      setAdmins(adminsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load admin data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async () => {
    if (!hasPermission("manage_admins")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to manage admins",
        variant: "destructive",
      });
      return;
    }

    if (!selectedUser || !selectedLevel) {
      toast({
        title: "Error",
        description: "Please select a user and admin level",
        variant: "destructive",
      });
      return;
    }

    const user = users.find((u) => u.id === selectedUser);
    if (!user) {
      toast({
        title: "Error",
        description: "Selected user not found",
        variant: "destructive",
      });
      return;
    }

    // Check if user is already an admin
    if (admins.some((admin) => admin.uid === selectedUser)) {
      toast({
        title: "Error",
        description: "User is already an admin",
        variant: "destructive",
      });
      return;
    }

    try {
      await createAdminUser(selectedUser, user.email, selectedLevel, adminData?.uid);
      toast({
        title: "Success",
        description: `${user.email} has been granted ${selectedLevel} admin access`,
      });

      setSelectedUser("");
      setSelectedLevel("editor");
      fetchData();
    } catch (error) {
      console.error("Error creating admin:", error);
      toast({
        title: "Error",
        description: "Failed to create admin user",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAdminStatus = async (uid: string, isActive: boolean) => {
    if (!hasPermission("manage_admins")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to manage admins",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateAdminUser(uid, {isActive});
      toast({
        title: "Success",
        description: `Admin access ${isActive ? "activated" : "deactivated"}`,
      });
      fetchData();
    } catch (error) {
      console.error("Error updating admin:", error);
      toast({
        title: "Error",
        description: "Failed to update admin status",
        variant: "destructive",
      });
    }
  };

  const handleUpdateAdminLevel = async (uid: string, level: AdminLevel) => {
    if (!hasPermission("manage_admins")) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to manage admins",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateAdminUser(uid, {level});
      toast({
        title: "Success",
        description: "Admin level updated successfully",
      });
      fetchData();
    } catch (error) {
      console.error("Error updating admin level:", error);
      toast({
        title: "Error",
        description: "Failed to update admin level",
        variant: "destructive",
      });
    }
  };

  if (!hasPermission("manage_admins")) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to manage admin users.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nonAdminUsers = filteredUsers.filter(
    (user) => !admins.some((admin) => admin.uid === user.id)
  );

  const getLevelColor = (level: AdminLevel) => {
    switch (level) {
      case "super":
        return "bg-red-500 text-white";
      case "manager":
        return "bg-blue-500 text-white";
      case "editor":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-8">
        {/* <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" asChild>
            <Link href="/admin" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div> */}
        <h1 className="text-3xl font-bold text-gray-900">Admin Management</h1>
        <p className="text-gray-600">Manage admin users and their permissions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Add New Admin */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Add New Admin
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search Users</Label>
                <Input
                  id="search"
                  placeholder="Search by email or name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user">Select User</Label>
                <Select value={selectedUser} onValueChange={setSelectedUser}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {nonAdminUsers.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.displayName || user.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Admin Level</Label>
                <Select
                  value={selectedLevel}
                  onValueChange={(value: AdminLevel) => setSelectedLevel(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    {adminLevel === "super" && <SelectItem value="super">Super Admin</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleCreateAdmin} className="w-full flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Grant Admin Access
              </Button>

              <div className="text-xs text-gray-500 space-y-1">
                <p>
                  <strong>Editor:</strong> Manage products and content
                </p>
                <p>
                  <strong>Manager:</strong> Editor + orders and analytics
                </p>
                <p>
                  <strong>Super:</strong> Full system access
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Admins */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Current Admins ({admins.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admins.map((admin) => (
                  <div
                    key={admin.uid}
                    className="flex flex-col md:flex-row space-y-6 items-start md:items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{admin.email}</h3>
                        <Badge className={getLevelColor(admin.level)}>
                          {admin.level.toUpperCase()}
                        </Badge>
                        {!admin.isActive && <Badge variant="destructive">Inactive</Badge>}
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>
                          <span className="font-medium">Created:</span>{" "}
                          {admin.createdAt.toLocaleDateString()}
                        </p>
                        {admin.lastLogin && (
                          <p>
                            <span className="font-medium">Last Login:</span>{" "}
                            {admin.lastLogin.toLocaleDateString()}
                          </p>
                        )}
                        <p>
                          <span className="font-medium">Permissions:</span>{" "}
                          {admin.permissions.length} granted
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`active-${admin.uid}`} className="text-sm text-purple-700">
                          Active
                        </Label>
                        <Switch
                          id={`active-${admin.uid}`}
                          checked={admin.isActive}
                          onCheckedChange={(checked) => handleUpdateAdminStatus(admin.uid, checked)}
                          disabled={admin.uid === adminData?.uid} // Can't deactivate self
                        />
                      </div>
                      <Select
                        value={admin.level}
                        onValueChange={(value: AdminLevel) =>
                          handleUpdateAdminLevel(admin.uid, value)
                        }
                        disabled={admin.uid === adminData?.uid}>
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          {adminLevel === "super" && <SelectItem value="super">Super</SelectItem>}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
                {admins.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No admin users found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminManagementPage;
