"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Save, History, Share2, Plus, Trash2, Download, Calculator, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { Alert, AlertDescription } from "../ui/alert";
import { Switch } from "../ui/switch";
import { Slider } from "../ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, ComposedChart } from "recharts";
import { useRouter, useAuth } from "../../app/App";
import { toast } from "sonner";

export function ToolPage() {
  const { params, navigate } = useRouter();
  const { user } = useAuth();
  const { toolId } = params;

  // SIP Calculator State
  const [sipEntries, setSipEntries] = useState([
    { id: 1, amount: 5000, duration: 10, rate: 12, stepUp: 0 }
  ]);

  // EMI Calculator State
  const [emiData, setEmiData] = useState({
    principal: 1000000,
    rate: 8.5,
    tenure: 20,
    prepayment: 0,
    prepaymentYear: 5
  });

  // Budget Planner State
  const [budgetData, setBudgetData] = useState({
    income: 50000,
    expenses: {
      housing: 15000,
      food: 8000,
      transportation: 5000,
      utilities: 3000,
      entertainment: 4000,
      savings: 10000,
      others: 5000
    },
    goals: {
      emergencyFund: 300000,
      targetSavingsRate: 30
    }
  });

  // Credit Score State
  const [creditData, setCreditData] = useState({
    paymentHistory: 35,
    creditUtilization: 25,
    creditAge: 15,
    creditMix: 45,
    newCredit: 80
  });

  // Retirement Calculator State
  const [retirementData, setRetirementData] = useState({
    currentAge: 30,
    retirementAge: 60,
    currentSavings: 500000,
    monthlyInvestment: 20000,
    expectedReturn: 12,
    inflationRate: 6,
    targetCorpus: 10000000
  });

  // Tax Calculator State
  const [taxData, setTaxData] = useState({
    annualIncome: 1200000,
    regime: "new",
    section80C: 150000,
    section80D: 25000,
    homeLoanInterest: 200000,
    hra: 0,
    rentPaid: 0,
    cityType: "metro"
  });

  const getToolConfig = (toolId: string) => {
    const configs = {
      "sip-calculator": {
        name: "SIP Calculator",
        description: "Calculate returns on your systematic investment plans with step-up options",
        type: "sip"
      },
      "emi-calculator": {
        name: "EMI Calculator", 
        description: "Calculate monthly installments with prepayment options",
        type: "emi"
      },
      "budget-planner": {
        name: "Budget Planner",
        description: "Plan and track your monthly expenses with goals",
        type: "budget"
      },
      "credit-score": {
        name: "Credit Score Checker",
        description: "Analyze your credit score factors and get improvement tips",
        type: "credit"
      },
      "retirement-planner": {
        name: "Retirement Planner",
        description: "Plan your retirement corpus with inflation adjustment",
        type: "retirement"
      },
      "tax-calculator": {
        name: "Tax Calculator",
        description: "Calculate income tax with old vs new regime comparison",
        type: "tax"
      },
      "fd-calculator": {
        name: "FD Calculator",
        description: "Calculate fixed deposit maturity amount",
        type: "fd"
      },
      "rd-calculator": {
        name: "RD Calculator", 
        description: "Calculate recurring deposit returns",
        type: "rd"
      }
    };
    
    return configs[toolId as keyof typeof configs] || {
      name: "Financial Calculator",
      description: "Calculate your financial metrics",
      type: "generic"
    };
  };

  const toolConfig = getToolConfig(toolId || "");

  // SIP Calculator Functions
  const addSipEntry = () => {
    const newId = Math.max(...sipEntries.map(e => e.id)) + 1;
    setSipEntries([...sipEntries, { id: newId, amount: 1000, duration: 5, rate: 12, stepUp: 0 }]);
  };

  const removeSipEntry = (id: number) => {
    if (sipEntries.length > 1) {
      setSipEntries(sipEntries.filter(entry => entry.id !== id));
    }
  };

  const updateSipEntry = (id: number, field: string, value: number) => {
    setSipEntries(sipEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const calculateSIP = () => {
    return sipEntries.map(entry => {
      const monthlyRate = entry.rate / 100 / 12;
      const months = entry.duration * 12;
      const stepUpRate = entry.stepUp / 100;
      
      let totalInvestment = 0;
      let futureValue = 0;
      let currentAmount = entry.amount;
      
      for (let month = 1; month <= months; month++) {
        // Apply step-up annually
        if (month > 1 && (month - 1) % 12 === 0) {
          currentAmount = currentAmount * (1 + stepUpRate);
        }
        
        totalInvestment += currentAmount;
        
        // Calculate compound growth for this investment
        const remainingMonths = months - month;
        futureValue += currentAmount * Math.pow(1 + monthlyRate, remainingMonths + 1);
      }
      
      const gains = futureValue - totalInvestment;
      
      return {
        ...entry,
        futureValue: Math.round(futureValue),
        totalInvestment: Math.round(totalInvestment),
        gains: Math.round(gains)
      };
    });
  };

  const calculateEMI = () => {
    const principal = emiData.principal;
    const monthlyRate = emiData.rate / 100 / 12;
    const months = emiData.tenure * 12;
    
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;
    
    // Calculate with prepayment
    let remainingPrincipal = principal;
    let totalInterestWithPrepay = 0;
    let actualTenure = months;
    
    if (emiData.prepayment > 0) {
      const prepaymentMonth = emiData.prepaymentYear * 12;
      
      for (let month = 1; month <= months; month++) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const principalPayment = emi - interestPayment;
        
        totalInterestWithPrepay += interestPayment;
        remainingPrincipal -= principalPayment;
        
        // Apply prepayment
        if (month === prepaymentMonth) {
          remainingPrincipal -= emiData.prepayment;
        }
        
        if (remainingPrincipal <= 0) {
          actualTenure = month;
          break;
        }
      }
    }
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal),
      interestSaved: emiData.prepayment > 0 ? Math.round(totalInterest - totalInterestWithPrepay) : 0,
      tenureSaved: emiData.prepayment > 0 ? Math.round((months - actualTenure) / 12 * 10) / 10 : 0
    };
  };

  const calculateBudget = () => {
    const totalExpenses = Object.values(budgetData.expenses).reduce((sum, expense) => sum + expense, 0);
    const remaining = budgetData.income - totalExpenses;
    const savingsRate = (budgetData.expenses.savings / budgetData.income) * 100;
    const emergencyFundMonths = budgetData.goals.emergencyFund / (totalExpenses - budgetData.expenses.savings);
    
    return {
      totalExpenses,
      remaining,
      savingsRate: Math.round(savingsRate * 10) / 10,
      status: remaining >= 0 ? "surplus" : "deficit",
      emergencyFundMonths: Math.round(emergencyFundMonths * 10) / 10,
      recommendedEmergencyFund: (totalExpenses - budgetData.expenses.savings) * 6
    };
  };

  const calculateCreditScore = () => {
    const factors = [
      { name: "Payment History", weight: 35, score: creditData.paymentHistory },
      { name: "Credit Utilization", weight: 30, score: 100 - creditData.creditUtilization },
      { name: "Length of Credit", weight: 15, score: creditData.creditAge },
      { name: "Credit Mix", weight: 10, score: creditData.creditMix },
      { name: "New Credit", weight: 10, score: creditData.newCredit }
    ];
    
    const totalScore = factors.reduce((sum, factor) => {
      return sum + (factor.score * factor.weight / 100);
    }, 0);
    
    let rating = "Poor";
    if (totalScore >= 80) rating = "Excellent";
    else if (totalScore >= 70) rating = "Good";
    else if (totalScore >= 60) rating = "Fair";
    
    return {
      score: Math.round(totalScore),
      rating,
      factors: factors.map(f => ({
        ...f,
        impact: f.score >= 80 ? "positive" : f.score >= 60 ? "neutral" : "negative"
      }))
    };
  };

  const calculateRetirement = () => {
    const yearsToRetirement = retirementData.retirementAge - retirementData.currentAge;
    const monthlyRate = retirementData.expectedReturn / 100 / 12;
    const months = yearsToRetirement * 12;
    const inflationAdjustedRate = ((1 + retirementData.expectedReturn/100) / (1 + retirementData.inflationRate/100)) - 1;
    
    // Future value of current savings
    const currentSavingsFV = retirementData.currentSavings * Math.pow(1 + retirementData.expectedReturn/100, yearsToRetirement);
    
    // Future value of monthly investments
    const monthlyInvestmentFV = retirementData.monthlyInvestment * 
      (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    
    const totalCorpus = currentSavingsFV + monthlyInvestmentFV;
    const inflationAdjustedCorpus = totalCorpus / Math.pow(1 + retirementData.inflationRate/100, yearsToRetirement);
    
    // Monthly pension calculation
    const monthlyPension = totalCorpus * 0.06 / 12; // Assuming 6% withdrawal rate
    const inflationAdjustedPension = monthlyPension / Math.pow(1 + retirementData.inflationRate/100, yearsToRetirement);
    
    return {
      totalCorpus: Math.round(totalCorpus),
      inflationAdjustedCorpus: Math.round(inflationAdjustedCorpus),
      monthlyPension: Math.round(monthlyPension),
      inflationAdjustedPension: Math.round(inflationAdjustedPension),
      shortfall: Math.max(0, retirementData.targetCorpus - totalCorpus),
      targetAchieved: totalCorpus >= retirementData.targetCorpus
    };
  };

  const calculateTax = () => {
    const income = taxData.annualIncome;
    
    // New Tax Regime
    let newRegimeTax = 0;
    if (income > 300000 && income <= 600000) {
      newRegimeTax = (income - 300000) * 0.05;
    } else if (income > 600000 && income <= 900000) {
      newRegimeTax = 300000 * 0.05 + (income - 600000) * 0.10;
    } else if (income > 900000 && income <= 1200000) {
      newRegimeTax = 300000 * 0.05 + 300000 * 0.10 + (income - 900000) * 0.15;
    } else if (income > 1200000 && income <= 1500000) {
      newRegimeTax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + (income - 1200000) * 0.20;
    } else if (income > 1500000) {
      newRegimeTax = 300000 * 0.05 + 300000 * 0.10 + 300000 * 0.15 + 300000 * 0.20 + (income - 1500000) * 0.30;
    }
    
    // Old Tax Regime
    let oldRegimeTax = 0;
    const taxableIncome = income - taxData.section80C - taxData.section80D - taxData.homeLoanInterest;
    
    if (taxableIncome > 250000 && taxableIncome <= 500000) {
      oldRegimeTax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome > 500000 && taxableIncome <= 1000000) {
      oldRegimeTax = 250000 * 0.05 + (taxableIncome - 500000) * 0.20;
    } else if (taxableIncome > 1000000) {
      oldRegimeTax = 250000 * 0.05 + 500000 * 0.20 + (taxableIncome - 1000000) * 0.30;
    }
    
    // Add cess
    newRegimeTax *= 1.04;
    oldRegimeTax *= 1.04;
    
    return {
      newRegimeTax: Math.round(newRegimeTax),
      oldRegimeTax: Math.round(oldRegimeTax),
      savings: Math.round(Math.abs(newRegimeTax - oldRegimeTax)),
      recommendedRegime: newRegimeTax < oldRegimeTax ? "New" : "Old",
      effectiveRate: Math.round((Math.min(newRegimeTax, oldRegimeTax) / income) * 100 * 10) / 10
    };
  };

  const generateChartData = () => {
    if (toolConfig.type === "sip") {
      const results = calculateSIP();
      return results.map((result, index) => ({
        name: `SIP ${index + 1}`,
        investment: result.totalInvestment,
        returns: result.gains,
        total: result.futureValue
      }));
    }
    
    if (toolConfig.type === "emi") {
      const result = calculateEMI();
      return [
        { name: "Principal", value: result.principal, color: "#8884d8" },
        { name: "Interest", value: result.totalInterest, color: "#82ca9d" }
      ];
    }
    
    if (toolConfig.type === "budget") {
      const expenses = budgetData.expenses;
      return Object.entries(expenses).map(([category, amount]) => ({
        name: category.charAt(0).toUpperCase() + category.slice(1),
        value: amount,
        color: `hsl(${Math.random() * 360}, 70%, 50%)`
      }));
    }
    
    if (toolConfig.type === "credit") {
      const result = calculateCreditScore();
      return result.factors.map(factor => ({
        name: factor.name,
        score: factor.score,
        weight: factor.weight,
        impact: factor.impact
      }));
    }
    
    if (toolConfig.type === "retirement") {
      const years = retirementData.retirementAge - retirementData.currentAge;
      const data = [];
      let currentSavings = retirementData.currentSavings;
      let monthlyInvestments = 0;
      
      for (let year = 0; year <= years; year++) {
        currentSavings *= (1 + retirementData.expectedReturn/100);
        monthlyInvestments += retirementData.monthlyInvestment * 12 * (1 + retirementData.expectedReturn/100);
        
        data.push({
          year: retirementData.currentAge + year,
          currentSavings: Math.round(currentSavings),
          monthlyInvestments: Math.round(monthlyInvestments),
          total: Math.round(currentSavings + monthlyInvestments)
        });
      }
      
      return data;
    }
    
    return [];
  };

  const saveCalculation = () => {
    if (!user) {
      toast.error("Please login to save calculations");
      return;
    }
    
    const calculationData = {
      toolId,
      toolName: toolConfig.name,
      data: getCalculationSnapshot(),
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage (in real app, save to backend)
    const saved = JSON.parse(localStorage.getItem("finflip-calculations") || "[]");
    saved.push(calculationData);
    localStorage.setItem("finflip-calculations", JSON.stringify(saved));
    
    toast.success("Calculation saved to your history!");
  };

  const getCalculationSnapshot = () => {
    switch (toolConfig.type) {
      case "sip": return { sipEntries, results: calculateSIP() };
      case "emi": return { emiData, results: calculateEMI() };
      case "budget": return { budgetData, results: calculateBudget() };
      case "credit": return { creditData, results: calculateCreditScore() };
      case "retirement": return { retirementData, results: calculateRetirement() };
      case "tax": return { taxData, results: calculateTax() };
      default: return {};
    }
  };

  const exportData = () => {
    const data = getCalculationSnapshot();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${toolConfig.name}-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully!");
  };

  const shareCalculation = () => {
    if (navigator.share) {
      navigator.share({
        title: toolConfig.name,
        text: `Check out this ${toolConfig.name} calculation on FinFlip`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const renderInputs = () => {
    if (toolConfig.type === "sip") {
      return (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg">SIP Investments</h3>
            <Button onClick={addSipEntry} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add SIP
            </Button>
          </div>
          
          {sipEntries.map((entry, index) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">SIP #{index + 1}</CardTitle>
                  {sipEntries.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSipEntry(entry.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Monthly Investment (₹)</Label>
                  <Input
                    type="number"
                    value={entry.amount}
                    onChange={(e) => updateSipEntry(entry.id, "amount", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Investment Duration (years)</Label>
                  <Input
                    type="number"
                    value={entry.duration}
                    onChange={(e) => updateSipEntry(entry.id, "duration", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Expected Annual Return (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={entry.rate}
                    onChange={(e) => updateSipEntry(entry.id, "rate", Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label>Annual Step-up (%) - Optional</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={entry.stepUp}
                    onChange={(e) => updateSipEntry(entry.id, "stepUp", Number(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Increase SIP amount by this percentage annually
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      );
    }
    
    if (toolConfig.type === "emi") {
      return (
        <div className="space-y-4">
          <div>
            <Label>Loan Amount (₹)</Label>
            <Input
              type="number"
              value={emiData.principal}
              onChange={(e) => setEmiData({...emiData, principal: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label>Interest Rate (% per annum)</Label>
            <Input
              type="number"
              step="0.1"
              value={emiData.rate}
              onChange={(e) => setEmiData({...emiData, rate: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label>Loan Tenure (years)</Label>
            <Input
              type="number"
              value={emiData.tenure}
              onChange={(e) => setEmiData({...emiData, tenure: Number(e.target.value)})}
            />
          </div>
          <Separator />
          <h4 className="text-lg">Prepayment (Optional)</h4>
          <div>
            <Label>Prepayment Amount (₹)</Label>
            <Input
              type="number"
              value={emiData.prepayment}
              onChange={(e) => setEmiData({...emiData, prepayment: Number(e.target.value)})}
            />
          </div>
          <div>
            <Label>Prepayment Year</Label>
            <Input
              type="number"
              value={emiData.prepaymentYear}
              onChange={(e) => setEmiData({...emiData, prepaymentYear: Number(e.target.value)})}
            />
          </div>
        </div>
      );
    }
    
    if (toolConfig.type === "budget") {
      return (
        <div className="space-y-4">
          <div>
            <Label>Monthly Income (₹)</Label>
            <Input
              type="number"
              value={budgetData.income}
              onChange={(e) => setBudgetData({...budgetData, income: Number(e.target.value)})}
            />
          </div>
          <Separator />
          <h3 className="text-lg">Monthly Expenses</h3>
          {Object.entries(budgetData.expenses).map(([category, amount]) => (
            <div key={category}>
              <Label>{category.charAt(0).toUpperCase() + category.slice(1)} (₹)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setBudgetData({
                  ...budgetData,
                  expenses: {
                    ...budgetData.expenses,
                    [category]: Number(e.target.value)
                  }
                })}
              />
            </div>
          ))}
          <Separator />
          <h3 className="text-lg">Financial Goals</h3>
          <div>
            <Label>Emergency Fund Target (₹)</Label>
            <Input
              type="number"
              value={budgetData.goals.emergencyFund}
              onChange={(e) => setBudgetData({
                ...budgetData,
                goals: {
                  ...budgetData.goals,
                  emergencyFund: Number(e.target.value)
                }
              })}
            />
          </div>
          <div>
            <Label>Target Savings Rate (%)</Label>
            <Input
              type="number"
              value={budgetData.goals.targetSavingsRate}
              onChange={(e) => setBudgetData({
                ...budgetData,
                goals: {
                  ...budgetData.goals,
                  targetSavingsRate: Number(e.target.value)
                }
              })}
            />
          </div>
        </div>
      );
    }

    if (toolConfig.type === "credit") {
      return (
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Rate each factor on a scale of 0-100 based on your current situation
          </p>
          
          <div>
            <Label>Payment History (35% weight)</Label>
            <div className="mt-2">
              <Slider
                value={[creditData.paymentHistory]}
                onValueChange={(value) => setCreditData({...creditData, paymentHistory: value[0]})}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Current score: {creditData.paymentHistory}/100
              </p>
            </div>
          </div>

          <div>
            <Label>Credit Utilization Ratio (30% weight)</Label>
            <div className="mt-2">
              <Slider
                value={[creditData.creditUtilization]}
                onValueChange={(value) => setCreditData({...creditData, creditUtilization: value[0]})}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Current utilization: {creditData.creditUtilization}% (Lower is better)
              </p>
            </div>
          </div>

          <div>
            <Label>Length of Credit History (15% weight)</Label>
            <div className="mt-2">
              <Slider
                value={[creditData.creditAge]}
                onValueChange={(value) => setCreditData({...creditData, creditAge: value[0]})}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Credit age score: {creditData.creditAge}/100
              </p>
            </div>
          </div>

          <div>
            <Label>Credit Mix (10% weight)</Label>
            <div className="mt-2">
              <Slider
                value={[creditData.creditMix]}
                onValueChange={(value) => setCreditData({...creditData, creditMix: value[0]})}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Credit mix score: {creditData.creditMix}/100
              </p>
            </div>
          </div>

          <div>
            <Label>New Credit Inquiries (10% weight)</Label>
            <div className="mt-2">
              <Slider
                value={[creditData.newCredit]}
                onValueChange={(value) => setCreditData({...creditData, newCredit: value[0]})}
                max={100}
                step={1}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground mt-1">
                New credit score: {creditData.newCredit}/100
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (toolConfig.type === "retirement") {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Age</Label>
              <Input
                type="number"
                value={retirementData.currentAge}
                onChange={(e) => setRetirementData({...retirementData, currentAge: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label>Retirement Age</Label>
              <Input
                type="number"
                value={retirementData.retirementAge}
                onChange={(e) => setRetirementData({...retirementData, retirementAge: Number(e.target.value)})}
              />
            </div>
          </div>
          
          <div>
            <Label>Current Savings (₹)</Label>
            <Input
              type="number"
              value={retirementData.currentSavings}
              onChange={(e) => setRetirementData({...retirementData, currentSavings: Number(e.target.value)})}
            />
          </div>
          
          <div>
            <Label>Monthly Investment (₹)</Label>
            <Input
              type="number"
              value={retirementData.monthlyInvestment}
              onChange={(e) => setRetirementData({...retirementData, monthlyInvestment: Number(e.target.value)})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Expected Annual Return (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={retirementData.expectedReturn}
                onChange={(e) => setRetirementData({...retirementData, expectedReturn: Number(e.target.value)})}
              />
            </div>
            <div>
              <Label>Inflation Rate (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={retirementData.inflationRate}
                onChange={(e) => setRetirementData({...retirementData, inflationRate: Number(e.target.value)})}
              />
            </div>
          </div>
          
          <div>
            <Label>Target Retirement Corpus (₹)</Label>
            <Input
              type="number"
              value={retirementData.targetCorpus}
              onChange={(e) => setRetirementData({...retirementData, targetCorpus: Number(e.target.value)})}
            />
          </div>
        </div>
      );
    }

    if (toolConfig.type === "tax") {
      return (
        <div className="space-y-4">
          <div>
            <Label>Annual Income (₹)</Label>
            <Input
              type="number"
              value={taxData.annualIncome}
              onChange={(e) => setTaxData({...taxData, annualIncome: Number(e.target.value)})}
            />
          </div>
          
          <Separator />
          <h4 className="text-lg">Tax Saving Investments (Old Regime)</h4>
          
          <div>
            <Label>Section 80C Investments (₹)</Label>
            <Input
              type="number"
              value={taxData.section80C}
              onChange={(e) => setTaxData({...taxData, section80C: Number(e.target.value)})}
            />
            <p className="text-xs text-muted-foreground mt-1">Max limit: ₹1,50,000</p>
          </div>
          
          <div>
            <Label>Section 80D - Health Insurance (₹)</Label>
            <Input
              type="number"
              value={taxData.section80D}
              onChange={(e) => setTaxData({...taxData, section80D: Number(e.target.value)})}
            />
            <p className="text-xs text-muted-foreground mt-1">Max limit: ₹25,000</p>
          </div>
          
          <div>
            <Label>Home Loan Interest (₹)</Label>
            <Input
              type="number"
              value={taxData.homeLoanInterest}
              onChange={(e) => setTaxData({...taxData, homeLoanInterest: Number(e.target.value)})}
            />
            <p className="text-xs text-muted-foreground mt-1">Max limit: ₹2,00,000</p>
          </div>
          
          <div>
            <Label>HRA Exemption (₹)</Label>
            <Input
              type="number"
              value={taxData.hra}
              onChange={(e) => setTaxData({...taxData, hra: Number(e.target.value)})}
            />
          </div>
          
          <div>
            <Label>City Type</Label>
            <Select value={taxData.cityType} onValueChange={(value) => setTaxData({...taxData, cityType: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metro">Metro City</SelectItem>
                <SelectItem value="non-metro">Non-Metro City</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      );
    }
    
    return (
      <div className="text-center py-8 text-muted-foreground">
        This calculator is coming soon!
      </div>
    );
  };

  const renderResults = () => {
    if (toolConfig.type === "sip") {
      const results = calculateSIP();
      const totalInvestment = results.reduce((sum, r) => sum + r.totalInvestment, 0);
      const totalReturns = results.reduce((sum, r) => sum + r.futureValue, 0);
      const totalGains = totalReturns - totalInvestment;
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Total Investment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">₹{totalInvestment.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Total Gains</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">₹{totalGains.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Final Amount</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-primary">₹{totalReturns.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-2">
            {results.map((result, index) => (
              <div key={result.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span>
                  SIP #{index + 1}: ₹{result.amount}/month for {result.duration} years
                  {result.stepUp > 0 && ` (${result.stepUp}% annual step-up)`}
                </span>
                <Badge variant="outline">₹{result.futureValue.toLocaleString()}</Badge>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (toolConfig.type === "emi") {
      const result = calculateEMI();
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Monthly EMI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-primary">₹{result.emi.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Total Interest</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-red-600">₹{result.totalInterest.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
          
          {emiData.prepayment > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Interest Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-green-600">₹{result.interestSaved.toLocaleString()}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-muted-foreground">Tenure Saved</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-green-600">{result.tenureSaved} years</div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <Alert>
            <AlertDescription>
              Total amount payable: ₹{result.totalAmount.toLocaleString()} 
              (Principal: ₹{result.principal.toLocaleString()} + Interest: ₹{result.totalInterest.toLocaleString()})
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    
    if (toolConfig.type === "budget") {
      const result = calculateBudget();
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">₹{result.totalExpenses.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Remaining</CardTitle>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl ${result.status === 'surplus' ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{Math.abs(result.remaining).toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Savings Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-primary">{result.savingsRate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Emergency Fund</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{result.emergencyFundMonths} months</div>
              </CardContent>
            </Card>
          </div>
          
          <Alert>
            <AlertDescription>
              {result.status === 'surplus' 
                ? `Great! You have a surplus of ₹${result.remaining.toLocaleString()}. Consider increasing your savings.`
                : `Warning! You have a deficit of ₹${Math.abs(result.remaining).toLocaleString()}. Review your expenses.`
              }
            </AlertDescription>
          </Alert>

          <Alert>
            <AlertDescription>
              Recommended Emergency Fund: ₹{result.recommendedEmergencyFund.toLocaleString()} 
              (6 months of expenses excluding savings)
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    if (toolConfig.type === "credit") {
      const result = calculateCreditScore();
      
      return (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-primary mb-2">{result.score}</div>
            <div className="text-xl text-muted-foreground">{result.rating}</div>
          </div>
          
          <div className="space-y-3">
            {result.factors.map((factor) => (
              <div key={factor.name} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <div>
                  <span className="font-medium">{factor.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">({factor.weight}%)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{factor.score}/100</span>
                  <Badge 
                    variant={factor.impact === 'positive' ? 'default' : factor.impact === 'neutral' ? 'secondary' : 'destructive'}
                  >
                    {factor.impact}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <Alert>
            <AlertDescription>
              {result.score >= 80 
                ? "Excellent credit score! You qualify for the best interest rates."
                : result.score >= 70
                ? "Good credit score. You can get competitive interest rates."
                : result.score >= 60
                ? "Fair credit score. Consider improving payment history and reducing credit utilization."
                : "Poor credit score. Focus on timely payments and keeping credit utilization below 30%."
              }
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    if (toolConfig.type === "retirement") {
      const result = calculateRetirement();
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Retirement Corpus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-primary">₹{result.totalCorpus.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  Today's value: ₹{result.inflationAdjustedCorpus.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Monthly Pension</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-primary">₹{result.monthlyPension.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">
                  Today's value: ₹{result.inflationAdjustedPension.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {result.shortfall > 0 ? (
            <Alert variant="destructive">
              <AlertDescription>
                You have a shortfall of ₹{result.shortfall.toLocaleString()} to reach your target. 
                Consider increasing your monthly investment or extending your investment horizon.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AlertDescription>
                Congratulations! You're on track to achieve your retirement goal.
              </AlertDescription>
            </Alert>
          )}
        </div>
      );
    }

    if (toolConfig.type === "tax") {
      const result = calculateTax();
      
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">New Regime Tax</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">₹{result.newRegimeTax.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Old Regime Tax</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl">₹{result.oldRegimeTax.toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Tax Savings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl text-green-600">₹{result.savings.toLocaleString()}</div>
              </CardContent>
            </Card>
          </div>
          
          <Alert>
            <AlertDescription>
              Recommended regime: <strong>{result.recommendedRegime}</strong> 
              {" "}(Effective tax rate: {result.effectiveRate}%)
            </AlertDescription>
          </Alert>
        </div>
      );
    }
    
    return null;
  };

  const renderChart = () => {
    const chartData = generateChartData();
    
    if (!chartData.length) return null;
    
    if (toolConfig.type === "sip") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
            <Bar dataKey="investment" fill="#8884d8" name="Investment" />
            <Bar dataKey="returns" fill="#82ca9d" name="Returns" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    if (toolConfig.type === "emi" || toolConfig.type === "budget") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={"color" in entry ? entry.color : "#8884d8"} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    
    if (toolConfig.type === "credit") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#8884d8" name="Score" />
          </BarChart>
        </ResponsiveContainer>
      );
    }
    
    if (toolConfig.type === "retirement") {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
            <Bar dataKey="currentSavings" fill="#8884d8" name="Current Savings Growth" />
            <Bar dataKey="monthlyInvestments" fill="#82ca9d" name="Monthly Investments" />
            <Line type="monotone" dataKey="total" stroke="#ff7300" strokeWidth={2} name="Total Corpus" />
          </ComposedChart>
        </ResponsiveContainer>
      );
    }
    
    return null;
  };

  if (!toolId) {
    return (
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl mb-4">Tool not found</h1>
          <Button onClick={() => navigate("/tools")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Tools
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => navigate("/tools")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl">{toolConfig.name}</h1>
              <p className="text-muted-foreground">{toolConfig.description}</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={shareCalculation}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={exportData}>
              <Download className="h-4 w-4" />
            </Button>
            {user && (
              <Button variant="outline" size="sm" onClick={saveCalculation}>
                <Save className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5" />
                  <span>Calculator Inputs</span>
                </CardTitle>
                <CardDescription>
                  Enter your values to calculate results
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderInputs()}
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderResults()}
              </CardContent>
            </Card>

            {/* Chart */}
            {renderChart() && (
              <Card>
                <CardHeader>
                  <CardTitle>Visual Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderChart()}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Ad Slots */}
        <div className="mt-16 space-y-8">
          <Card className="p-6 bg-muted/30 text-center">
            <p className="text-sm text-muted-foreground mb-2">Advertisement</p>
            <p className="text-lg">Your Ad Could Be Here</p>
            <p className="text-sm text-muted-foreground">Contact us for advertising opportunities</p>
          </Card>
        </div>
      </div>
    </div>
  );
}