"use client";

import { useState } from "react";
import { Calculator, TrendingUp, CreditCard, PieChart, Target, Home, Car, Building, Percent, DollarSign, Search, Filter } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { useRouter } from "../../app/App";

export function ToolsPage() {
  const { navigate } = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const allTools = [
    {
      id: "sip-calculator",
      name: "SIP Calculator",
      description: "Calculate returns on your systematic investment plans with flexible contribution options",
      icon: TrendingUp,
      color: "bg-blue-500",
      category: "investment",
      tags: ["SIP", "Mutual Funds", "Investment"],
    },
    {
      id: "emi-calculator",
      name: "EMI Calculator",
      description: "Calculate monthly installments for home, car, and personal loans",
      icon: Calculator,
      color: "bg-green-500",
      category: "loan",
      tags: ["EMI", "Loan", "Monthly Payment"],
    },
    {
      id: "budget-planner",
      name: "Budget Planner",
      description: "Plan and track your monthly income and expenses effectively",
      icon: PieChart,
      color: "bg-purple-500",
      category: "savings",
      tags: ["Budget", "Expense", "Planning"],
    },
    {
      id: "credit-score",
      name: "Credit Score Checker",
      description: "Check your credit score and get tips to improve it",
      icon: CreditCard,
      color: "bg-orange-500",
      category: "credit",
      tags: ["Credit Score", "CIBIL", "Credit Report"],
    },
    {
      id: "retirement-planner",
      name: "Retirement Planner",
      description: "Plan your retirement corpus and monthly savings required",
      icon: Target,
      color: "bg-red-500",
      category: "investment",
      tags: ["Retirement", "Long-term", "Planning"],
    },
    {
      id: "tax-calculator",
      name: "Tax Calculator",
      description: "Calculate income tax liability and plan tax-saving investments",
      icon: Percent,
      color: "bg-indigo-500",
      category: "tax",
      tags: ["Tax", "Income Tax", "80C"],
    },
    {
      id: "home-loan-calculator",
      name: "Home Loan Calculator",
      description: "Calculate home loan EMI, interest, and total payment amount",
      icon: Home,
      color: "bg-cyan-500",
      category: "loan",
      tags: ["Home Loan", "Property", "EMI"],
    },
    {
      id: "car-loan-calculator",
      name: "Car Loan Calculator",
      description: "Calculate car loan EMI and compare different loan options",
      icon: Car,
      color: "bg-yellow-500",
      category: "loan",
      tags: ["Car Loan", "Auto Loan", "EMI"],
    },
    {
      id: "fd-calculator",
      name: "FD Calculator",
      description: "Calculate fixed deposit returns and maturity amounts",
      icon: Building,
      color: "bg-teal-500",
      category: "savings",
      tags: ["Fixed Deposit", "FD", "Bank"],
    },
    {
      id: "rd-calculator",
      name: "RD Calculator",
      description: "Calculate recurring deposit returns and monthly savings",
      icon: DollarSign,
      color: "bg-pink-500",
      category: "savings",
      tags: ["Recurring Deposit", "RD", "Monthly Savings"],
    },
  ];

  const categories = [
    { value: "all", label: "All Tools" },
    { value: "investment", label: "Investment" },
    { value: "loan", label: "Loans" },
    { value: "savings", label: "Savings" },
    { value: "credit", label: "Credit" },
    { value: "tax", label: "Tax" },
  ];

  const filteredTools = allTools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4">Financial Tools</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive collection of financial calculators and planning tools to help you make informed decisions
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
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
            Showing {filteredTools.length} of {allTools.length} tools
            {selectedCategory !== "all" && ` in ${categories.find(c => c.value === selectedCategory)?.label}`}
          </p>
        </div>

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
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
                  <CardDescription className="line-clamp-3">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Try Calculator
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg mb-2">No tools found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
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
        )}

        {/* Popular Categories */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl mb-6">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => {
              const toolCount = allTools.filter(tool => tool.category === category.value).length;
              return (
                <Button
                  key={category.value}
                  variant="outline"
                  className="h-auto p-4 flex-col"
                  onClick={() => setSelectedCategory(category.value)}
                >
                  <span className="font-medium">{category.label}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {toolCount} tools
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}