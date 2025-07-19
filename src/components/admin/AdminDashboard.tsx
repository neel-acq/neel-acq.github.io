"use client";

import { useState, useEffect } from "react";
import {
  BarChart3,
  Users,
  FileText,
  Settings,
  TrendingUp,
  Eye,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Calendar,
  DollarSign,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Alert, AlertDescription } from "../ui/alert";
import { Progress } from "../ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
} from "recharts";
import { useAuth, useRouter } from "../../app/App";
import { toast } from "sonner";

export function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const { navigate } = useRouter();
  const [selectedTab, setSelectedTab] = useState("overview");
  const [blogSearchTerm, setBlogSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  // Check admin access with useEffect to avoid setState during render
  useEffect(() => {
    if (!user || !isAdmin) {
      navigate("/");
    }
  }, [user, isAdmin, navigate]);

  // Return early if not admin to avoid rendering
  if (!user || !isAdmin) {
    return null;
  }

  // Enhanced mock data
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Active Users (7d)",
      value: "987",
      change: "+8%",
      trend: "up",
      icon: Activity,
    },
    {
      title: "Total Articles",
      value: "87",
      change: "+5%",
      trend: "up",
      icon: FileText,
    },
    {
      title: "Tool Usage (30d)",
      value: "15,678",
      change: "+23%",
      trend: "up",
      icon: BarChart3,
    },
    {
      title: "Revenue (MTD)",
      value: "₹45,234",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Conversion Rate",
      value: "3.4%",
      change: "-0.2%",
      trend: "down",
      icon: TrendingUp,
    },
  ];

  const toolUsageData = [
    { name: "SIP Calculator", usage: 4500, growth: 15 },
    { name: "EMI Calculator", usage: 3200, growth: 12 },
    { name: "Budget Planner", usage: 2800, growth: 20 },
    { name: "Credit Score", usage: 2100, growth: 8 },
    { name: "Tax Calculator", usage: 1900, growth: 25 },
    { name: "Retirement Planner", usage: 1500, growth: 30 },
    { name: "FD Calculator", usage: 1200, growth: 5 },
    { name: "RD Calculator", usage: 800, growth: 10 },
  ];

  const userGrowthData = [
    { month: "Jul", users: 650, active: 520 },
    { month: "Aug", users: 720, active: 580 },
    { month: "Sep", users: 850, active: 680 },
    { month: "Oct", users: 920, active: 740 },
    { month: "Nov", users: 1050, active: 840 },
    { month: "Dec", users: 1150, active: 920 },
    { month: "Jan", users: 1234, active: 987 },
  ];

  const revenueData = [
    { month: "Jul", revenue: 28000, expenses: 20000 },
    { month: "Aug", revenue: 32000, expenses: 22000 },
    { month: "Sep", revenue: 35000, expenses: 24000 },
    { month: "Oct", revenue: 38000, expenses: 25000 },
    { month: "Nov", revenue: 41000, expenses: 26000 },
    { month: "Dec", revenue: 43000, expenses: 27000 },
    { month: "Jan", revenue: 45234, expenses: 28000 },
  ];

  const mockBlogPosts = [
    {
      id: 1,
      title: "10 Best SIP Mutual Funds for 2025",
      author: "Finance Team",
      status: "published",
      category: "Investment",
      publishedDate: "2025-01-15",
      views: 2543,
      engagement: 4.2,
      featured: true,
    },
    {
      id: 2,
      title: "How to Improve Your Credit Score",
      author: "Credit Expert",
      status: "draft",
      category: "Credit",
      publishedDate: null,
      views: 0,
      engagement: 0,
      featured: false,
    },
    {
      id: 3,
      title: "Emergency Fund Planning Guide",
      author: "Planning Team",
      status: "published",
      category: "Savings",
      publishedDate: "2025-01-10",
      views: 1834,
      engagement: 3.8,
      featured: false,
    },
    {
      id: 4,
      title: "Tax Saving Strategies 2025",
      author: "Tax Expert",
      status: "scheduled",
      category: "Tax",
      publishedDate: "2025-01-25",
      views: 0,
      engagement: 0,
      featured: true,
    },
    {
      id: 5,
      title: "Budget Like a Pro",
      author: "Finance Team",
      status: "published",
      category: "Budgeting",
      publishedDate: "2025-01-08",
      views: 1456,
      engagement: 3.5,
      featured: false,
    },
  ];

  const mockUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      joinDate: "2024-12-15",
      lastActive: "2025-01-19",
      toolsUsed: 15,
      status: "active",
      location: "Mumbai",
      subscription: "free",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      joinDate: "2024-11-20",
      lastActive: "2025-01-18",
      toolsUsed: 32,
      status: "active",
      location: "Delhi",
      subscription: "premium",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      joinDate: "2024-10-05",
      lastActive: "2024-12-20",
      toolsUsed: 8,
      status: "inactive",
      location: "Bangalore",
      subscription: "free",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      joinDate: "2025-01-10",
      lastActive: "2025-01-19",
      toolsUsed: 5,
      status: "active",
      location: "Chennai",
      subscription: "free",
    },
  ];

  const systemHealth = {
    uptime: 99.8,
    responseTime: 245,
    errors: 12,
    warnings: 3,
  };

  const filteredBlogPosts = mockBlogPosts.filter(
    (post) =>
      post.title
        .toLowerCase()
        .includes(blogSearchTerm.toLowerCase()) ||
      post.author
        .toLowerCase()
        .includes(blogSearchTerm.toLowerCase()) ||
      post.category
        .toLowerCase()
        .includes(blogSearchTerm.toLowerCase()),
  );

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name
        .toLowerCase()
        .includes(userSearchTerm.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(userSearchTerm.toLowerCase()),
  );

  const createBlogPost = (formData: any) => {
    console.log("Creating blog post:", formData);
    toast.success("Blog post created successfully!");
    setIsCreatingPost(false);
  };

  const BlogManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg">Blog Management</h3>
          <p className="text-sm text-muted-foreground">
            Manage your blog content and analytics
          </p>
        </div>
        <Dialog
          open={isCreatingPost}
          onOpenChange={setIsCreatingPost}
        >
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
              <DialogDescription>
                Add a new blog post to your website
              </DialogDescription>
            </DialogHeader>
            <BlogPostForm onSubmit={createBlogPost} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Total Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBlogPosts.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Published
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockBlogPosts.filter(
                  (p) => p.status === "published",
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Total Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockBlogPosts
                .reduce((sum, p) => sum + p.views, 0)
                .toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Avg Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                mockBlogPosts.reduce(
                  (sum, p) => sum + p.engagement,
                  0,
                ) / mockBlogPosts.length
              ).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            className="pl-10"
            value={blogSearchTerm}
            onChange={(e) => setBlogSearchTerm(e.target.value)}
          />
        </div>
        <Select>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Published</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Engagement</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBlogPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-xs">
                  <div className="flex items-center space-x-2">
                    <span className="truncate">
                      {post.title}
                    </span>
                    {post.featured && (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {post.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.status === "published"
                        ? "default"
                        : post.status === "scheduled"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {post.publishedDate || "—"}
                </TableCell>
                <TableCell>
                  {post.views.toLocaleString()}
                </TableCell>
                <TableCell>
                  {post.engagement.toFixed(1)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const BlogPostForm = ({
    onSubmit,
  }: {
    onSubmit: (data: any) => void;
  }) => {
    const [formData, setFormData] = useState({
      title: "",
      category: "",
      status: "draft",
      content: "",
      featured: false,
      author: user?.name || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            placeholder="Article title"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) =>
                setFormData({ ...formData, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="investment">
                  Investment
                </SelectItem>
                <SelectItem value="credit">Credit</SelectItem>
                <SelectItem value="savings">Savings</SelectItem>
                <SelectItem value="loans">Loans</SelectItem>
                <SelectItem value="tax">Tax</SelectItem>
                <SelectItem value="budgeting">
                  Budgeting
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">
                  Published
                </SelectItem>
                <SelectItem value="scheduled">
                  Scheduled
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={formData.featured}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, featured: checked })
            }
          />
          <Label>Featured Article</Label>
        </div>
        <div>
          <Label>Content</Label>
          <Textarea
            placeholder="Write your article content..."
            rows={8}
            value={formData.content}
            onChange={(e) =>
              setFormData({
                ...formData,
                content: e.target.value,
              })
            }
            required
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsCreatingPost(false)}
          >
            Cancel
          </Button>
          <Button type="submit">
            {formData.status === "published"
              ? "Publish Article"
              : "Save Draft"}
          </Button>
        </div>
      </form>
    );
  };

  const UserManagement = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg">User Management</h3>
          <p className="text-sm text-muted-foreground">
            Monitor and manage user accounts
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10 w-64"
              value={userSearchTerm}
              onChange={(e) =>
                setUserSearchTerm(e.target.value)
              }
            />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Users</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Total Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockUsers.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockUsers.filter((u) => u.status === "active")
                  .length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Premium Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockUsers.filter(
                  (u) => u.subscription === "premium",
                ).length
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              New This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                mockUsers.filter(
                  (u) =>
                    new Date(u.joinDate) >
                    new Date("2025-01-01"),
                ).length
              }
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Tools Used</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>{user.toolsUsed}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.subscription === "premium"
                        ? "default"
                        : "outline"
                    }
                  >
                    {user.subscription}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "active"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );

  const AdvancedAnalytics = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg">Advanced Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Detailed insights and performance metrics
        </p>
      </div>

      {/* Tool Usage Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tool Usage Analytics</CardTitle>
            <CardDescription>
              Usage and growth trends for financial tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={toolUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar
                  yAxisId="left"
                  dataKey="usage"
                  fill="#8884d8"
                  name="Usage Count"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="growth"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Growth %"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>
              Total and active user growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#8884d8"
                  strokeWidth={2}
                  name="Total Users"
                />
                <Line
                  type="monotone"
                  dataKey="active"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="Active Users"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue &amp; Expenses</CardTitle>
          <CardDescription>
            Monthly revenue and expense tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString()}`
                }
              />
              <Bar
                dataKey="revenue"
                fill="#82ca9d"
                name="Revenue"
              />
              <Bar
                dataKey="expenses"
                fill="#8884d8"
                name="Expenses"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#82ca9d"
                strokeWidth={2}
                name="Revenue Trend"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Activity className="h-4 w-4 mr-2" />
              System Uptime
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {systemHealth.uptime}%
            </div>
            <Progress
              value={systemHealth.uptime}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {systemHealth.responseTime}ms
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Errors (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {systemHealth.errors}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground">
              Warnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {systemHealth.warnings}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const SystemSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg">System Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure platform settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>
              Basic platform configuration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Site Name</Label>
              <Input defaultValue="FinFlip" />
            </div>
            <div>
              <Label>Site Description</Label>
              <Textarea defaultValue="Your trusted partner for personal finance management" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Contact Email</Label>
                <Input defaultValue="support@finflip.com" />
              </div>
              <div>
                <Label>Support Phone</Label>
                <Input defaultValue="+91 98765 43210" />
              </div>
            </div>
            <Button>Save General Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Toggles</CardTitle>
            <CardDescription>
              Enable or disable platform features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>User Registration</Label>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email notifications to users
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Premium Features</Label>
                <p className="text-sm text-muted-foreground">
                  Enable premium subscription features
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Analytics Tracking</Label>
                <p className="text-sm text-muted-foreground">
                  Track user analytics and behavior
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button>Save Feature Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>
              Backup and export options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Database Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Last backup: 2 hours ago
                </p>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Create Backup
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Export User Data</Label>
                <p className="text-sm text-muted-foreground">
                  Export all user data for compliance
                </p>
              </div>
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>System Logs</Label>
                <p className="text-sm text-muted-foreground">
                  Download system activity logs
                </p>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive platform management and analytics
          </p>
        </div>

        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      <span
                        className={
                          stat.trend === "up"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {stat.change}
                      </span>{" "}
                      from last month
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Frequently used admin actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => setSelectedTab("blog")}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    New Article
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTab("users")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    View Users
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTab("analytics")}
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockBlogPosts.slice(0, 4).map((post) => (
                      <div
                        key={post.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-sm truncate max-w-xs">
                            {post.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {post.views} views •{" "}
                            {post.engagement} engagement
                          </p>
                        </div>
                        <Badge
                          variant={
                            post.status === "published"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {post.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockUsers.slice(0, 4).map((user) => (
                      <div
                        key={user.id}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <p className="font-medium text-sm">
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {user.toolsUsed} tools used •{" "}
                            {user.location}
                          </p>
                        </div>
                        <Badge
                          variant={
                            user.status === "active"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {user.subscription}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <AdvancedAnalytics />
          </TabsContent>

          {/* Blog Management Tab */}
          <TabsContent value="blog">
            <BlogManagement />
          </TabsContent>

          {/* User Management Tab */}
          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          {/* Tools Management Tab */}
          <TabsContent value="tools" className="space-y-6">
            <div>
              <h3 className="text-lg">Tools Management</h3>
              <p className="text-sm text-muted-foreground">
                Monitor tool performance and configuration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tool Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {toolUsageData.slice(0, 5).map((tool) => (
                      <div
                        key={tool.name}
                        className="flex justify-between items-center"
                      >
                        <div>
                          <span className="font-medium text-sm">
                            {tool.name}
                          </span>
                          <p className="text-xs text-muted-foreground">
                            {tool.usage} uses this month
                          </p>
                        </div>
                        <Badge variant="outline">
                          +{tool.growth}%
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tool Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Active Tools</span>
                      <Badge variant="default">8</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Coming Soon</span>
                      <Badge variant="secondary">2</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Maintenance</span>
                      <Badge variant="outline">0</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}