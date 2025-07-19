"use client";

import { useState } from "react";
import { createContext, useContext, useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./components/pages/HomePage";
import { ToolsPage } from "./components/pages/ToolsPage";
import { BlogPage } from "./components/pages/BlogPage";
import { BlogPostPage } from "./components/pages/BlogPostPage";
import { AboutPage } from "./components/pages/AboutPage";
import { ContactPage } from "./components/pages/ContactPage";
import { PrivacyPage } from "./components/pages/PrivacyPage";
import { LoginPage } from "./components/auth/LoginPage";
import { SignupPage } from "./components/auth/SignupPage";
import { ProfilePage } from "./components/auth/ProfilePage";
import { HistoryPage } from "./components/pages/HistoryPage";
import { BookmarksPage } from "./components/pages/BookmarksPage";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { ToolPage } from "./components/pages/ToolPage";

// Theme Context
interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Auth Context
interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  signup: async () => false,
  logout: () => {},
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

// Router Context
interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: "/",
  navigate: () => {},
  params: {},
});

export const useRouter = () => useContext(RouterContext);

// Simple Router Component
function Router({ children }: { children: React.ReactNode }) {
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    // Set initial path from window location
    setCurrentPath(window.location.pathname);
    
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
  };

  const getParams = () => {
    const pathParts = currentPath.split("/");
    const params: Record<string, string> = {};
    
    if (pathParts[1] === "tools" && pathParts[2]) {
      params.toolId = pathParts[2];
    }
    if (pathParts[1] === "blog" && pathParts[2]) {
      params.postId = pathParts[2];
    }
    
    return params;
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params: getParams() }}>
      {children}
    </RouterContext.Provider>
  );
}

// Main App Component
export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem("finflip-theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
    }

    // Load user from localStorage (mock auth)
    const savedUser = localStorage.getItem("finflip-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("finflip-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call your auth API
    if (email && password) {
      const mockUser = {
        id: "1",
        email,
        name: email.split("@")[0],
        isAdmin: email === "admin@finflip.com",
      };
      setUser(mockUser);
      localStorage.setItem("finflip-user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup
    if (email && password && name) {
      const mockUser = {
        id: Date.now().toString(),
        email,
        name,
        isAdmin: false,
      };
      setUser(mockUser);
      localStorage.setItem("finflip-user", JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("finflip-user");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ 
        user, 
        login, 
        signup, 
        logout, 
        isAdmin: user?.isAdmin || false 
      }}>
        <Router>
          <div className="min-h-screen bg-background">
            <AppContent />
            <Toaster />
          </div>
        </Router>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

function AppContent() {
  const { currentPath } = useRouter();

  const renderPage = () => {
    if (currentPath === "/") return <HomePage />;
    if (currentPath === "/tools") return <ToolsPage />;
    if (currentPath.startsWith("/tools/")) return <ToolPage />;
    if (currentPath === "/blog") return <BlogPage />;
    if (currentPath.startsWith("/blog/")) return <BlogPostPage />;
    if (currentPath === "/about") return <AboutPage />;
    if (currentPath === "/contact") return <ContactPage />;
    if (currentPath === "/privacy") return <PrivacyPage />;
    if (currentPath === "/login") return <LoginPage />;
    if (currentPath === "/signup") return <SignupPage />;
    if (currentPath === "/profile") return <ProfilePage />;
    if (currentPath === "/history") return <HistoryPage />;
    if (currentPath === "/bookmarks") return <BookmarksPage />;
    if (currentPath === "/admin" || currentPath.startsWith("/admin/")) return <AdminDashboard />;
    return <NotFoundPage />;
  };

  const isAuthPage = ["/login", "/signup"].includes(currentPath);

  return (
    <>
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? "" : "pt-16"}>
        {renderPage()}
      </main>
      {!isAuthPage && <Footer />}
    </>
  );
}