import { useState } from 'react';
import { Calculator, TrendingUp, PiggyBank, CreditCard, DollarSign, PieChart, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { toast } from 'sonner@2.0.3';

interface CalculatorProps {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  users: string;
}

const tools: CalculatorProps[] = [
  {
    id: 'emi',
    name: 'EMI Calculator',
    description: 'Calculate loan EMIs with interest rates',
    icon: Calculator,
    color: 'bg-blue-500',
    users: '50k+ users'
  },
  {
    id: 'sip',
    name: 'SIP Calculator',
    description: 'Plan your systematic investment',
    icon: TrendingUp,
    color: 'bg-green-500',
    users: '35k+ users'
  },
  {
    id: 'budget',
    name: 'Budget Planner',
    description: 'Track expenses and savings',
    icon: PiggyBank,
    color: 'bg-purple-500',
    users: '40k+ users'
  },
  {
    id: 'credit',
    name: 'Credit Score',
    description: 'Monitor your credit health',
    icon: CreditCard,
    color: 'bg-orange-500',
    users: '25k+ users'
  },
  {
    id: 'tax',
    name: 'Tax Calculator',
    description: 'Calculate income tax liability',
    icon: DollarSign,
    color: 'bg-red-500',
    users: '30k+ users'
  },
  {
    id: 'investment',
    name: 'Investment Tracker',
    description: 'Monitor portfolio performance',
    icon: PieChart,
    color: 'bg-indigo-500',
    users: '20k+ users'
  }
];

function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState<{emi: number; totalInterest: number; totalAmount: number} | null>(null);

  const calculateEMI = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      toast.error('Please enter valid positive values');
      return;
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - p;

    setResult({
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalAmount: Math.round(totalAmount)
    });

    toast.success('EMI calculated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan Amount (₹)</Label>
          <Input
            id="principal"
            type="number"
            placeholder="e.g., 1000000"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Interest Rate (% per annum)</Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            placeholder="e.g., 8.5"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tenure">Loan Tenure (years)</Label>
          <Input
            id="tenure"
            type="number"
            placeholder="e.g., 20"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculateEMI} className="w-full bg-blue-600 hover:bg-blue-700">
        Calculate EMI
      </Button>

      {result && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">₹{result.emi.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">₹{result.totalInterest.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">₹{result.totalAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SIPCalculator() {
  const [monthly, setMonthly] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState<{maturityAmount: number; totalInvestment: number; totalReturns: number} | null>(null);

  const calculateSIP = () => {
    const p = parseFloat(monthly);
    const r = parseFloat(rate) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      toast.error('Please enter valid positive values');
      return;
    }

    const maturityAmount = p * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
    const totalInvestment = p * n;
    const totalReturns = maturityAmount - totalInvestment;

    setResult({
      maturityAmount: Math.round(maturityAmount),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns)
    });

    toast.success('SIP returns calculated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="monthly">Monthly Investment (₹)</Label>
          <Input
            id="monthly"
            type="number"
            placeholder="e.g., 5000"
            value={monthly}
            onChange={(e) => setMonthly(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Expected Return (% per annum)</Label>
          <Input
            id="rate"
            type="number"
            step="0.1"
            placeholder="e.g., 12"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tenure">Investment Period (years)</Label>
          <Input
            id="tenure"
            type="number"
            placeholder="e.g., 15"
            value={tenure}
            onChange={(e) => setTenure(e.target.value)}
          />
        </div>
      </div>

      <Button onClick={calculateSIP} className="w-full bg-green-600 hover:bg-green-700">
        Calculate SIP Returns
      </Button>

      {result && (
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">₹{result.maturityAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Maturity Amount</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">₹{result.totalInvestment.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Investment</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">₹{result.totalReturns.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Returns</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function BudgetPlanner() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    housing: '',
    food: '',
    transport: '',
    utilities: '',
    entertainment: '',
    savings: ''
  });

  const [result, setResult] = useState<{totalExpenses: number; remaining: number; savingsRate: number} | null>(null);

  const calculateBudget = () => {
    const totalIncome = parseFloat(income);
    const totalExpenses = Object.values(expenses).reduce((sum, expense) => sum + (parseFloat(expense) || 0), 0);

    if (totalIncome <= 0) {
      toast.error('Please enter a valid income amount');
      return;
    }

    const remaining = totalIncome - totalExpenses;
    const savingsRate = ((parseFloat(expenses.savings) || 0) / totalIncome) * 100;

    setResult({
      totalExpenses,
      remaining,
      savingsRate
    });

    if (remaining < 0) {
      toast.error('Your expenses exceed your income!');
    } else {
      toast.success('Budget calculated successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="income">Monthly Income (₹)</Label>
        <Input
          id="income"
          type="number"
          placeholder="e.g., 50000"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(expenses).map(([key, value]) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)} (₹)</Label>
            <Input
              id={key}
              type="number"
              placeholder="e.g., 5000"
              value={value}
              onChange={(e) => setExpenses(prev => ({ ...prev, [key]: e.target.value }))}
            />
          </div>
        ))}
      </div>

      <Button onClick={calculateBudget} className="w-full bg-purple-600 hover:bg-purple-700">
        Calculate Budget
      </Button>

      {result && (
        <Card className={`${result.remaining >= 0 ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'}`}>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">₹{result.totalExpenses.toLocaleString()}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</div>
              </div>
              <div>
                <div className={`text-2xl font-bold ${result.remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ₹{Math.abs(result.remaining).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {result.remaining >= 0 ? 'Remaining' : 'Over Budget'}
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{result.savingsRate.toFixed(1)}%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Savings Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export function FinancialCalculators() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const renderCalculator = (toolId: string) => {
    switch (toolId) {
      case 'emi':
        return <EMICalculator />;
      case 'sip':
        return <SIPCalculator />;
      case 'budget':
        return <BudgetPlanner />;
      default:
        return (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">This calculator is under development and will be available soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => {
        const IconComponent = tool.icon;
        return (
          <Dialog key={tool.id}>
            <DialogTrigger asChild>
              <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {tool.users}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {tool.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 group-hover:border-blue-200 dark:group-hover:border-blue-800 transition-colors duration-200"
                  >
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${tool.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="h-5 w-5 text-white" />
                  </div>
                  <span>{tool.name}</span>
                </DialogTitle>
                <DialogDescription>
                  {tool.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6">
                {renderCalculator(tool.id)}
              </div>
            </DialogContent>
          </Dialog>
        );
      })}
    </div>
  );
}