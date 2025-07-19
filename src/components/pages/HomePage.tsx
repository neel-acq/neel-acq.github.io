"use client";

import { Calculator, TrendingUp, CreditCard, PieChart, Target, ArrowRight, BookOpen, Users, Shield, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Alert, AlertDescription } from "../ui/alert";
import { useRouter, useAuth } from "../../app/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function HomePage() {
  const { navigate } = useRouter();
  const { user, isAdmin } = useAuth();

  const featuredTools = [
    {
      id: "sip-calculator",
      name: "SIP Calculator",
      description: "Calculate returns on your systematic investment plans",
      icon: TrendingUp,
      color: "bg-blue-500",
    },
    {
      id: "emi-calculator",
      name: "EMI Calculator",
      description: "Calculate monthly installments for loans",
      icon: Calculator,
      color: "bg-green-500",
    },
    {
      id: "budget-planner",
      name: "Budget Planner",
      description: "Plan and track your monthly expenses",
      icon: PieChart,
      color: "bg-purple-500",
    },
    {
      id: "credit-score",
      name: "Credit Score Checker",
      description: "Check and improve your credit score",
      icon: CreditCard,
      color: "bg-orange-500",
    },
    {
      id: "retirement-planner",
      name: "Retirement Planner",
      description: "Plan for your retirement goals",
      icon: Target,
      color: "bg-red-500",
    },
    {
      id: "tax-calculator",
      name: "Tax Calculator",
      description: "Calculate income tax and plan savings",
      icon: Calculator,
      color: "bg-indigo-500",
    },
  ];

  const latestArticles = [
    {
      id: "1",
      title: "10 Best SIP Mutual Funds for 2025",
      description: "Discover the top-performing SIP mutual funds that can help you build wealth systematically.",
      category: "Investment",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=240&fit=crop",
    },
    {
      id: "2",
      title: "How to Improve Your Credit Score in 30 Days",
      description: "Practical steps to boost your credit score quickly and maintain good financial health.",
      category: "Credit",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop",
    },
    {
      id: "3",
      title: "Emergency Fund: How Much Should You Save?",
      description: "Learn the importance of emergency funds and how to calculate the right amount for your needs.",
      category: "Savings",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=240&fit=crop",
    },
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Users" },
    { icon: Calculator, value: "50+", label: "Financial Tools" },
    { icon: BookOpen, value: "200+", label: "Articles Published" },
    { icon: Shield, value: "100%", label: "Secure & Private" },
  ];

  return (
    <div className="min-h-screen">
      {/* Admin Quick Access */}
      {isAdmin && (
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="container mx-auto px-4 py-3">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>Welcome back, Admin! You have administrative privileges.</span>
                <Button 
                  size="sm" 
                  onClick={() => navigate("/admin")}
                  className="ml-4"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Access Admin Panel
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Master Your Financial Future
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Calculate, plan, and achieve your financial goals with our comprehensive suite of tools and expert insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={() => navigate("/tools")}
              className="group"
            >
              Try Tools
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/blog")}
            >
              Read Articles
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-semibold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tools */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Financial Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful calculators and planners to help you make informed financial decisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <Card 
                key={tool.id} 
                className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                onClick={() => navigate(`/tools/${tool.id}`)}
              >
                <CardHeader>
                  <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {tool.name}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Try Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => navigate("/tools")}>
              View All Tools
            </Button>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Latest Articles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stay updated with the latest financial tips, market insights, and investment strategies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
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
                    <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs">
                      {article.category}
                    </span>
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
                  <div className="text-sm text-muted-foreground">
                    {article.readTime}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" onClick={() => navigate("/blog")}>
              Read All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get weekly financial tips, market updates, and exclusive tool features delivered to your inbox
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1"
            />
            <Button>Subscribe</Button>
          </div>
          
          <p className="text-xs text-muted-foreground mt-4">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </div>
  );
}