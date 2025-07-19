import { FinancialCalculators } from './FinancialCalculators';

export function TrendingTools() {
  return (
    <section id="tools" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Financial Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our comprehensive suite of financial calculators and tools designed to help you make informed financial decisions
          </p>
        </div>
        
        <FinancialCalculators />
      </div>
    </section>
  );
}