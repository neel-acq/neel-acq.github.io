import { Button } from './ui/button';
import { ArrowRight, TrendingUp, BookOpen, Play } from 'lucide-react';
import { useApp } from './AppContext';

export function HeroSection() {
  const { setActiveSection } = useApp();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  return (
    <section id="home" className="relative py-20 md:py-32 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm mb-6 animate-fade-in">
            <TrendingUp className="h-4 w-4" />
            <span>Your Personal Finance Journey Starts Here</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Welcome to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-500">
              FinFlip
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Your Personal Finance Guide - Master your money with powerful tools, expert insights, and personalized financial planning
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up animation-delay-400">
            <Button 
              size="lg" 
              onClick={() => scrollToSection('tools')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Explore Tools
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => scrollToSection('blog')}
              className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3 rounded-lg transition-all duration-200 hover:-translate-y-1"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Read Blog
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center animate-fade-in-up animation-delay-600">
            <div className="space-y-2 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
              <div className="text-2xl font-bold text-blue-600">100k+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="space-y-2 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
              <div className="text-2xl font-bold text-blue-600">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Finance Tools</div>
            </div>
            <div className="space-y-2 p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-200">
              <div className="text-2xl font-bold text-blue-600">1000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Expert Articles</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float-delayed"></div>
      </div>
    </section>
  );
}