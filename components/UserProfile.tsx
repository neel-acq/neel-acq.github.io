import { useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from './AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { 
  User, 
  Settings, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  LogOut,
  Crown,
  TrendingUp,
  Bookmark
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface UserProfileProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
    plan: 'free' | 'pro' | 'premium';
    joinDate: string;
  };
}

export function UserProfile({ user }: UserProfileProps) {
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Mock user data if none provided
  const defaultUser = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    plan: 'free' as const,
    joinDate: 'January 2024',
  };

  const currentUser = user || defaultUser;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      
      toast.success('Logged out successfully', {
        description: 'You have been safely logged out of your account.',
      });
    } catch (error) {
      toast.error('Logout failed', {
        description: 'Please try again.',
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'pro':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">Pro</Badge>;
      case 'premium':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">Premium</Badge>;
      default:
        return <Badge variant="outline">Free</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          {currentUser.plan === 'premium' && (
            <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-80 p-4" 
        align="end" 
        forceMount
      >
        {/* User Info Header */}
        <div className="flex items-center space-x-3 p-2">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={currentUser.avatar} 
              alt={currentUser.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
              {getInitials(currentUser.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="font-medium text-sm truncate">{currentUser.name}</p>
              {getPlanBadge(currentUser.plan)}
            </div>
            <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
            <p className="text-xs text-muted-foreground">Member since {currentUser.joinDate}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 p-2 mb-2">
          <div className="text-center">
            <div className="text-lg font-semibold text-blue-600">12</div>
            <div className="text-xs text-muted-foreground">Tools Used</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-green-600">$2,450</div>
            <div className="text-xs text-muted-foreground">Saved</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-purple-600">8</div>
            <div className="text-xs text-muted-foreground">Articles Read</div>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Menu Items */}
        <DropdownMenuLabel className="font-normal">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Account</span>
        </DropdownMenuLabel>
        
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile Settings</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <TrendingUp className="mr-2 h-4 w-4" />
          <span>Dashboard</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Bookmark className="mr-2 h-4 w-4" />
          <span>Saved Articles</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="font-normal">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Settings</span>
        </DropdownMenuLabel>
        
        <DropdownMenuItem className="cursor-pointer">
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing & Subscription</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Bell className="mr-2 h-4 w-4" />
          <span>Notifications</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="mr-2 h-4 w-4" />
          <span>Preferences</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer">
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem 
          className="cursor-pointer text-destructive focus:text-destructive" 
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoggingOut ? 'Logging out...' : 'Sign Out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}