"use client";

import { Menu, Moon, Sun, User, LogOut, Settings, History, Bookmark, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { useTheme, useAuth, useRouter } from "../../app/App";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAdmin } = useAuth();
  const { currentPath, navigate } = useRouter();

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: "Blog", path: "/blog" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Add admin panel to navigation for admin users
  if (isAdmin) {
    navigationItems.splice(4, 0, { name: "Admin", path: "/admin" });
  }

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground">₹</span>
          </div>
          <span className="text-xl font-semibold">FinFlip</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`transition-colors hover:text-primary flex items-center space-x-1 ${
                isActive(item.path) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <span>{item.name}</span>
              {item.name === "Admin" && <Shield className="h-3 w-3" />}
            </button>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* User Menu or Login */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                  <User className="h-4 w-4" />
                  {isAdmin && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 h-3 w-3 p-0 text-[8px]">
                      A
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-medium">
                  Hello, {user.name}!
                  {isAdmin && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Admin
                    </Badge>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/history")}>
                  <History className="mr-2 h-4 w-4" />
                  Calculation History
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/bookmarks")}>
                  <Bookmark className="mr-2 h-4 w-4" />
                  Saved Articles
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/admin")}>
                      <Shield className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center space-x-2">
              <Button variant="ghost" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`text-left py-2 text-lg transition-colors flex items-center space-x-2 ${
                      isActive(item.path) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    <span>{item.name}</span>
                    {item.name === "Admin" && <Shield className="h-4 w-4" />}
                  </button>
                ))}
                
                {!user && (
                  <>
                    <hr className="my-4" />
                    <Button variant="ghost" onClick={() => navigate("/login")} className="justify-start">
                      Login
                    </Button>
                    <Button onClick={() => navigate("/signup")} className="justify-start">
                      Sign Up
                    </Button>
                  </>
                )}

                {user && (
                  <>
                    <hr className="my-4" />
                    <div className="text-sm text-muted-foreground px-2">
                      Signed in as {user.name}
                      {isAdmin && <Badge variant="secondary" className="ml-2 text-xs">Admin</Badge>}
                    </div>
                    <Button variant="ghost" onClick={() => navigate("/profile")} className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" onClick={() => navigate("/history")} className="justify-start">
                      <History className="mr-2 h-4 w-4" />
                      History
                    </Button>
                    <Button variant="ghost" onClick={() => navigate("/bookmarks")} className="justify-start">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Bookmarks
                    </Button>
                    <Button variant="ghost" onClick={logout} className="justify-start">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}