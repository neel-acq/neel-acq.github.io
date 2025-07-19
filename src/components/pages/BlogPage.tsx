"use client";

import { useState } from "react";
import { Search, Filter, Calendar, User, Clock, Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { useRouter } from "../../app/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function BlogPage() {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Articles" },
    { value: "investment", label: "Investment" },
    { value: "credit", label: "Credit Cards" },
    { value: "savings", label: "Savings" },
    { value: "budgeting", label: "Budgeting" },
    { value: "loans", label: "Loans" },
    { value: "tax", label: "Tax Planning" },
  ];

  const mockArticles = [
    {
      id: "1",
      title: "10 Best SIP Mutual Funds for 2025",
      description: "Discover the top-performing SIP mutual funds that can help you build wealth systematically. We analyze historical performance, fund managers, and future potential.",
      category: "investment",
      author: "Rajesh Kumar",
      publishDate: "Jan 15, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=240&fit=crop",
      tags: ["SIP", "Mutual Funds", "Investment"],
      bookmarked: false,
    },
    {
      id: "2",
      title: "How to Improve Your Credit Score in 30 Days",
      description: "Practical steps to boost your credit score quickly and maintain good financial health. Learn the strategies that actually work.",
      category: "credit",
      author: "Priya Sharma",
      publishDate: "Jan 12, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop",
      tags: ["Credit Score", "CIBIL", "Financial Health"],
      bookmarked: true,
    },
    {
      id: "3",
      title: "Emergency Fund: How Much Should You Save?",
      description: "Learn the importance of emergency funds and how to calculate the right amount for your needs. A comprehensive guide to financial security.",
      category: "savings",
      author: "Amit Verma",
      publishDate: "Jan 10, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=240&fit=crop",
      tags: ["Emergency Fund", "Savings", "Financial Planning"],
      bookmarked: false,
    },
    {
      id: "4",
      title: "Budget Like a Pro: 50/30/20 Rule Explained",
      description: "Master the art of budgeting with the popular 50/30/20 rule. Allocate your income effectively for needs, wants, and savings.",
      category: "budgeting",
      author: "Neha Gupta",
      publishDate: "Jan 8, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=240&fit=crop",
      tags: ["Budgeting", "50/30/20", "Money Management"],
      bookmarked: false,
    },
    {
      id: "5",
      title: "Home Loan vs Rent: What's Better in 2025?",
      description: "An in-depth analysis of whether you should buy a home or continue renting. Consider all factors before making this major financial decision.",
      category: "loans",
      author: "Suresh Patel",
      publishDate: "Jan 5, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=240&fit=crop",
      tags: ["Home Loan", "Real Estate", "Investment Decision"],
      bookmarked: true,
    },
    {
      id: "6",
      title: "Tax Saving Strategies for Salaried Employees",
      description: "Maximize your tax savings with these proven strategies. Learn about Section 80C, 80D, and other deductions available to you.",
      category: "tax",
      author: "CA Vikash Singh",
      publishDate: "Jan 3, 2025",
      readTime: "9 min read",
      image: "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=400&h=240&fit=crop",
      tags: ["Tax Saving", "80C", "Deductions"],
      bookmarked: false,
    },
  ];

  const filteredArticles = mockArticles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getCategoryBadgeColor = (category: string) => {
    const colors: Record<string, string> = {
      investment: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      credit: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      savings: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      budgeting: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      loans: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      tax: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4">Financial Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest financial tips, market insights, and expert advice to help you make informed decisions
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredArticles.length} of {mockArticles.length} articles
            {selectedCategory !== "all" && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          </p>
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl mb-6">Featured Article</h2>
            <Card 
              className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
              onClick={() => navigate(`/blog/${filteredArticles[0].id}`)}
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="relative overflow-hidden h-48 md:h-full">
                    <ImageWithFallback
                      src={filteredArticles[0].image}
                      alt={filteredArticles[0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className={getCategoryBadgeColor(filteredArticles[0].category)}>
                        {categories.find(c => c.value === filteredArticles[0].category)?.label}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="text-2xl line-clamp-2 group-hover:text-primary transition-colors">
                      {filteredArticles[0].title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-base">
                      {filteredArticles[0].description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-4 w-4" />
                          <span>{filteredArticles[0].author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{filteredArticles[0].publishDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{filteredArticles[0].readTime}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {filteredArticles[0].tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 1 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(1).map((article) => (
              <Card 
                key={article.id} 
                className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
                onClick={() => navigate(`/blog/${article.id}`)}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getCategoryBadgeColor(article.category)}>
                      {categories.find(c => c.value === article.category)?.label}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {article.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>{article.author}</span>
                    </div>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}