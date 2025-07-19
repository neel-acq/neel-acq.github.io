"use client";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Calendar,
  User,
  ArrowRight,
  Clock,
  Search,
  Filter,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";

const blogs = [
  {
    id: 1,
    title:
      "10 Essential Financial Tips for Young Professionals",
    excerpt:
      "Start your financial journey right with these fundamental tips that every young professional should know...",
    content:
      "Building wealth early in your career sets the foundation for lifelong financial success. Here are ten essential tips that every young professional should implement: 1. Start an emergency fund immediately, 2. Take advantage of employer 401(k) matching, 3. Automate your savings, 4. Live below your means, 5. Invest in low-cost index funds, 6. Build your credit score responsibly, 7. Get adequate insurance coverage, 8. Continuously educate yourself about finance, 9. Set specific financial goals, 10. Review and adjust your plan regularly.",
    category: "Personal Finance",
    author: "Sarah Johnson",
    date: "Jan 15, 2024",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    featured: true,
  },
  {
    id: 2,
    title: "How to Create an Emergency Fund in 6 Months",
    excerpt:
      "Building an emergency fund doesn't have to be overwhelming. Here's a step-by-step guide to get you started...",
    content:
      "An emergency fund is your financial safety net. Here's how to build one in 6 months: Start by calculating your monthly expenses, aim for 3-6 months of expenses, open a separate high-yield savings account, automate transfers, reduce unnecessary expenses, consider side income sources, and stay committed to your goal.",
    category: "Saving",
    author: "Mike Chen",
    date: "Jan 12, 2024",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 3,
    title: "Investment Strategies for Market Volatility",
    excerpt:
      "Learn how to navigate uncertain markets and protect your investments during volatile times...",
    content:
      "Market volatility is normal, but it can be scary for investors. Here are strategies to navigate uncertainty: diversify your portfolio, maintain a long-term perspective, dollar-cost averaging, rebalance regularly, avoid emotional decisions, consider defensive assets, and stay informed but don't overreact.",
    category: "Investing",
    author: "Emily Rodriguez",
    date: "Jan 10, 2024",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    featured: true,
  },
  {
    id: 4,
    title: "Understanding Credit Scores: A Complete Guide",
    excerpt:
      "Everything you need to know about credit scores, from how they're calculated to how to improve them...",
    content:
      "Credit scores range from 300-850 and affect your ability to get loans and credit cards. Factors include payment history (35%), credit utilization (30%), length of credit history (15%), credit mix (10%), and new credit (10%). Improve your score by paying bills on time, keeping utilization low, and monitoring your credit report.",
    category: "Credit",
    author: "David Park",
    date: "Jan 8, 2024",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    featured: false,
  },
  {
    id: 5,
    title: "Tax Planning Strategies for 2024",
    excerpt:
      "Maximize your tax savings with these proven strategies and planning techniques for the new tax year...",
    content:
      "Effective tax planning can save you thousands. Key strategies include maximizing retirement contributions, harvesting tax losses, utilizing HSAs, timing income and deductions, considering Roth conversions, and working with a tax professional for complex situations.",
    category: "Tax Planning",
    author: "Jennifer Liu",
    date: "Jan 5, 2024",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1554224154-26032fced8bd?w=400&h=250&fit=crop",
    featured: true,
  },
  {
    id: 6,
    title: "Budgeting Apps vs. Traditional Methods",
    excerpt:
      "Compare digital budgeting solutions with traditional methods to find what works best for your lifestyle...",
    content:
      "Both digital and traditional budgeting methods have their merits. Apps offer automation and real-time tracking, while traditional methods provide tangible control. Choose based on your tech comfort, spending habits, and personal preferences. The best budget is the one you'll actually use consistently.",
    category: "Budgeting",
    author: "Alex Thompson",
    date: "Jan 3, 2024",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=250&fit=crop",
    featured: false,
  },
];

const categories = [
  "All",
  "Personal Finance",
  "Saving",
  "Investing",
  "Credit",
  "Tax Planning",
  "Budgeting",
];

export function FeaturedBlogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");
  const [selectedBlog, setSelectedBlog] = useState<
    (typeof blogs)[0] | null
  >(null);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      blog.excerpt
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      blog.author
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlogs = filteredBlogs.filter(
    (blog) => blog.featured,
  );
  const regularBlogs = filteredBlogs.filter(
    (blog) => !blog.featured,
  );

  return (
    <section
      id="blog"
      className="py-16 bg-gray-50 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Blogs
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Stay informed with our latest insights, tips, and
            expert analysis on personal finance and investment
            strategies
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-semibold mb-2">
              No articles found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        ) : (
          <>
            {/* Featured Blog - Large Card */}
            {featuredBlogs.length > 0 && (
              <div className="mb-12">
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group">
                  <div className="md:flex">
                    <div className="md:w-1/2">
                      <ImageWithFallback
                        src={featuredBlogs[0]?.image}
                        alt={featuredBlogs[0]?.title}
                        className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                        >
                          {featuredBlogs[0]?.category}
                        </Badge>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Featured
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 transition-colors duration-200">
                        {featuredBlogs[0]?.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        {featuredBlogs[0]?.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <User className="h-4 w-4" />
                            <span>
                              {featuredBlogs[0]?.author}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {featuredBlogs[0]?.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {featuredBlogs[0]?.readTime}
                            </span>
                          </div>
                        </div>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setSelectedBlog(
                                  featuredBlogs[0],
                                )
                              }
                            >
                              Read More
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh]">
                            <DialogHeader>
                              <DialogTitle className="text-2xl">
                                {featuredBlogs[0]?.title}
                              </DialogTitle>
                              <DialogDescription>
                                Read the full article:{" "}
                                {featuredBlogs[0]?.excerpt}
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-[70vh]">
                              <div className="space-y-4">
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                  <Badge>
                                    {featuredBlogs[0]?.category}
                                  </Badge>
                                  <span>
                                    By{" "}
                                    {featuredBlogs[0]?.author}
                                  </span>
                                  <span>
                                    {featuredBlogs[0]?.date}
                                  </span>
                                  <span>
                                    {featuredBlogs[0]?.readTime}
                                  </span>
                                </div>
                                <ImageWithFallback
                                  src={featuredBlogs[0]?.image}
                                  alt={featuredBlogs[0]?.title}
                                  className="w-full h-64 object-cover rounded-lg"
                                />
                                <div className="prose dark:prose-invert max-w-none">
                                  <p>
                                    {featuredBlogs[0]?.content}
                                  </p>
                                </div>
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Regular Blog Cards Grid */}
            {regularBlogs.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularBlogs.map((blog) => (
                  <Dialog key={blog.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1">
                        <div className="relative">
                          <ImageWithFallback
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge
                              variant="secondary"
                              className="bg-white/90 text-gray-700"
                            >
                              {blog.category}
                            </Badge>
                          </div>
                        </div>

                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors duration-200">
                            {blog.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                            {blog.excerpt}
                          </p>

                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                            <div className="flex items-center space-x-2">
                              <User className="h-3 w-3" />
                              <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{blog.date}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3" />
                                <span>{blog.readTime}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">
                          {blog.title}
                        </DialogTitle>
                        <DialogDescription>
                          Read the full article: {blog.excerpt}
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh]">
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <Badge>{blog.category}</Badge>
                            <span>By {blog.author}</span>
                            <span>{blog.date}</span>
                            <span>{blog.readTime}</span>
                          </div>
                          <ImageWithFallback
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                          <div className="prose dark:prose-invert max-w-none">
                            <p>{blog.content}</p>
                          </div>
                        </div>
                      </ScrollArea>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            )}
          </>
        )}

        <div className="text-center mt-12">
          <Button className="bg-blue-600 hover:bg-blue-700">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
}