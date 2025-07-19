"use client";

import { useEffect } from "react";
import { History, Calculator, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useAuth, useRouter } from "../../app/App";

export function HistoryPage() {
  const { user } = useAuth();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const mockHistory = [
    {
      id: 1,
      tool: "SIP Calculator",
      calculation: "₹5,000/month for 10 years",
      result: "₹11,61,695",
      date: "2 hours ago",
      type: "sip",
    },
    {
      id: 2,
      tool: "EMI Calculator",
      calculation: "₹10,00,000 loan at 8.5% for 20 years",
      result: "₹8,678/month",
      date: "1 day ago",
      type: "emi",
    },
    {
      id: 3,
      tool: "Budget Planner",
      calculation: "Monthly budget analysis",
      result: "20% savings rate",
      date: "3 days ago",
      type: "budget",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">Calculation History</h1>
          <p className="text-muted-foreground">
            View and manage your saved calculations
          </p>
        </div>

        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Calculator className="h-5 w-5" />
                      <span>{item.tool}</span>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.calculation}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{item.result}</Badge>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{item.date}</span>
                  <Button variant="outline" size="sm" onClick={() => navigate(`/tools/${item.type}-calculator`)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}