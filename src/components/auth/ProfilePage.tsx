"use client";

import { useState, useEffect } from "react";
import { User, Mail, Lock, Save, Trash2, History, Bookmark, Bell, Eye, CreditCard, Download, Upload } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth, useRouter } from "../../app/App";
import { toast } from "sonner";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const { navigate } = useRouter();
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "",
    location: "",
    dateOfBirth: "",
    profession: "",
    avatar: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    weeklyReports: true,
    language: "en",
    timezone: "Asia/Kolkata",
    currency: "INR",
    theme: "system",
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    dataSharing: false,
    analyticsTracking: true,
    thirdPartyIntegrations: false,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
  }, [user, navigate]);

  // Mock user statistics
  const userStats = {
    joinDate: user?.joinDate || "Dec 2024",
    toolsUsed: 15,
    calculationsSaved: 8,
    articlesRead: 23,
    timeSpent: "47 hours",
    streakDays: 12,
    level: "Gold",
    points: 1250,
  };

  const recentActivity = [
    { type: "calculation", tool: "SIP Calculator", date: "2 hours ago", result: "₹11,61,695" },
    { type: "article", title: "Tax Saving Strategies", date: "1 day ago", readTime: "5 min" },
    { type: "calculation", tool: "EMI Calculator", date: "2 days ago", result: "₹8,678/month" },
    { type: "article", title: "Budget Planning Tips", date: "3 days ago", readTime: "7 min" },
    { type: "calculation", tool: "Budget Planner", date: "1 week ago", result: "25% savings rate" },
  ];

  const savedCalculations = [
    { id: 1, tool: "SIP Calculator", name: "My Retirement Plan", date: "Jan 15", result: "₹11,61,695" },
    { id: 2, tool: "EMI Calculator", name: "Home Loan EMI", date: "Jan 12", result: "₹8,678/month" },
    { id: 3, tool: "Budget Planner", name: "Monthly Budget 2025", date: "Jan 10", result: "25% savings" },
    { id: 4, tool: "Tax Calculator", name: "FY 2024-25 Tax", date: "Jan 8", result: "₹45,000" },
    { id: 5, tool: "Credit Score", name: "Credit Analysis", date: "Jan 5", result: "750 Score" },
  ];

  const bookmarkedArticles = [
    { id: 1, title: "10 Best SIP Mutual Funds", category: "Investment", date: "Jan 15" },
    { id: 2, title: "Credit Score Improvement", category: "Credit", date: "Jan 12" },
    { id: 3, title: "Emergency Fund Guide", category: "Savings", date: "Jan 10" },
  ];

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      toast.success("Password changed successfully!");
    } catch (err) {
      toast.error("Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      logout();
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  const exportUserData = () => {
    const userData = {
      profile: profileData,
      statistics: userStats,
      activity: recentActivity,
      calculations: savedCalculations,
      bookmarks: bookmarkedArticles,
      exportDate: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finflip-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileData.avatar} />
                  <AvatarFallback className="text-xl">
                    {user.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl mb-2">{user.name}</h1>
                  <p className="text-muted-foreground mb-4">{user.email}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{userStats.level} Member</Badge>
                    <Badge variant="outline">{userStats.points} Points</Badge>
                    <Badge variant="outline">{userStats.streakDays} Day Streak</Badge>
                    {user.isAdmin && <Badge variant="default">Admin</Badge>}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Joined</p>
                      <p className="font-medium">{userStats.joinDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tools Used</p>
                      <p className="font-medium">{userStats.toolsUsed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Calculations</p>
                      <p className="font-medium">{userStats.calculationsSaved}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Articles Read</p>
                      <p className="font-medium">{userStats.articlesRead}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="danger">Account</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Profile Information</span>
                </CardTitle>
                <CardDescription>
                  Update your personal information and bio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          name: e.target.value
                        }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          email: e.target.value
                        }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          phone: e.target.value
                        }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData(prev => ({
                          ...prev,
                          location: e.target.value
                        }))}
                        placeholder="City, Country"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                      <Save className="mr-2 h-4 w-4" />
                      {loading ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lock className="h-5 w-5" />
                  <span>Security Settings</span>
                </CardTitle>
                <CardDescription>
                  Manage your password and security preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({
                        ...prev,
                        currentPassword: e.target.value
                      }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({
                          ...prev,
                          newPassword: e.target.value
                        }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({
                          ...prev,
                          confirmPassword: e.target.value
                        }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading}>
                      <Lock className="mr-2 h-4 w-4" />
                      {loading ? "Changing..." : "Change Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="h-5 w-5" />
                  <span>Notification Preferences</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch 
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) => setPreferences(prev => ({
                      ...prev,
                      emailNotifications: checked
                    }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">Get weekly financial summaries</p>
                  </div>
                  <Switch 
                    checked={preferences.weeklyReports}
                    onCheckedChange={(checked) => setPreferences(prev => ({
                      ...prev,
                      weeklyReports: checked
                    }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="h-5 w-5" />
                  <span>Privacy Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Tracking</p>
                    <p className="text-sm text-muted-foreground">Help improve the platform</p>
                  </div>
                  <Switch 
                    checked={privacySettings.analyticsTracking}
                    onCheckedChange={(checked) => setPrivacySettings(prev => ({
                      ...prev,
                      analyticsTracking: checked
                    }))}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="h-5 w-5" />
                    <span>Recent Activity</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.slice(0, 5).map((activity, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">
                            {activity.type === 'calculation' ? activity.tool : activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {activity.type === 'calculation' ? `Result: ${activity.result}` : `Read time: ${activity.readTime}`}
                          </p>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" onClick={() => navigate("/history")} className="w-full mt-4">
                    View Full History
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bookmark className="h-5 w-5" />
                    <span>Saved Content</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      {savedCalculations.length} calculations saved
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {bookmarkedArticles.length} articles bookmarked
                    </p>
                  </div>
                  <Button variant="outline" onClick={() => navigate("/bookmarks")} className="w-full mt-4">
                    View Bookmarks
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Management Tab */}
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
                <CardDescription>Export your data and manage storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Storage Used</span>
                    <span className="text-sm text-muted-foreground">2.4 MB / 100 MB</span>
                  </div>
                  <Progress value={2.4} className="h-2" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Export All Data</p>
                    <p className="text-sm text-muted-foreground">Download your complete data</p>
                  </div>
                  <Button variant="outline" onClick={exportUserData}>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Danger Zone Tab */}
          <TabsContent value="danger">
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-destructive">
                  <Trash2 className="h-5 w-5" />
                  <span>Danger Zone</span>
                </CardTitle>
                <CardDescription>
                  These actions are irreversible. Please proceed with caution.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>
                    Deleting your account will permanently remove all your data, including calculation history and bookmarks.
                  </AlertDescription>
                </Alert>

                <Button 
                  variant="destructive" 
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {loading ? "Deleting Account..." : "Delete Account"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}