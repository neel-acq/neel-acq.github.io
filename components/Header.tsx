import { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useApp } from './AppContext';
import { useAuth } from './AuthContext';
import { AuthModals } from './AuthModals';
import { UserProfile } from './UserProfile';

export function Header() {
  const { isDarkMode, toggleDarkMode, activeSection, isMenuOpen, setIsMenuOpen } = useApp();
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'Tools', href: 'tools' },
    { name: 'Blog', href: 'blog' },
    { name: 'Newsletter', href: 'newsletter' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${isScrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => scrollToSection('home')}
          className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
          <span className="text-xl font-bold text-foreground">FinFlip</span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`text-sm transition-colors duration-200 ${
                activeSection === link.href 
                  ? 'text-blue-600 font-medium' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Side - Dark Mode Toggle and Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDarkMode}
            className="w-9 h-9 transition-transform hover:scale-110"
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4 transition-transform rotate-0 scale-100" />
            ) : (
              <Moon className="h-4 w-4 transition-transform rotate-0 scale-100" />
            )}
          </Button>

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <UserProfile user={user} />
            ) : (
              <>
                <AuthModals 
                  trigger={
                    <Button variant="ghost" size="sm" className="hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      Login
                    </Button>
                  }
                  defaultTab="login"
                />
                <AuthModals 
                  trigger={
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 shadow-sm">
                      Register
                    </Button>
                  }
                  defaultTab="register"
                />
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">F</span>
                  </div>
                  <span className="text-xl font-bold">FinFlip</span>
                </div>
              </div>
              
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-lg text-left py-2 px-3 rounded-lg transition-all duration-200 ${
                      activeSection === link.href
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20 font-medium'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    {link.name}
                  </button>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex flex-col space-y-2">
                    {isAuthenticated ? (
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <UserProfile user={user} />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{user?.name}</p>
                          <p className="text-sm text-muted-foreground truncate">{user?.email}</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <AuthModals 
                          trigger={
                            <Button variant="ghost" className="justify-start">
                              Login
                            </Button>
                          }
                          defaultTab="login"
                        />
                        <AuthModals 
                          trigger={
                            <Button className="bg-blue-600 hover:bg-blue-700 justify-start">
                              Register
                            </Button>
                          }
                          defaultTab="register"
                        />
                      </>
                    )}
                  </div>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}