import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { Mail, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string}>({});

  const validateForm = () => {
    const newErrors: {name?: string; email?: string} = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    } else if (name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock success/failure based on email
      if (email.includes('test@example.com')) {
        throw new Error('This email is already subscribed');
      }
      
      setIsSubmitted(true);
      toast.success('Successfully subscribed to newsletter!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setEmail('');
    setName('');
    setErrors({});
  };

  if (isSubmitted) {
    return (
      <section id="newsletter" className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto animate-fade-in">
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Thank you for subscribing!
              </h3>
              <p className="text-gray-600 mb-6">
                Welcome to the FinFlip community, {name}! You'll receive our latest insights and tips directly in your inbox.
              </p>
              <Button 
                onClick={resetForm}
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Subscribe Another Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with FinFlip
            </h2>
            <p className="text-blue-100 text-lg">
              Get the latest financial tips, market insights, and exclusive tools delivered to your inbox weekly
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (errors.name) setErrors(prev => ({ ...prev, name: undefined }));
                      }}
                      className={`bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 ${
                        errors.name ? 'border-red-400' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.name && (
                      <p className="text-red-200 text-sm">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Input
                      type="email"
                      placeholder="Your email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      className={`bg-white/20 border-white/30 text-white placeholder-white/70 focus:bg-white/30 ${
                        errors.email ? 'border-red-400' : ''
                      }`}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-red-200 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    'Subscribe to Newsletter'
                  )}
                </Button>
              </form>
              
              <p className="text-blue-100 text-sm mt-4">
                Join 50,000+ readers. No spam, unsubscribe anytime.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="text-white/80 p-4 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <div className="text-2xl font-bold mb-2">📊</div>
              <div className="text-sm">Weekly market insights</div>
            </div>
            <div className="text-white/80 p-4 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <div className="text-2xl font-bold mb-2">💡</div>
              <div className="text-sm">Expert financial tips</div>
            </div>
            <div className="text-white/80 p-4 rounded-lg hover:bg-white/10 transition-colors duration-200">
              <div className="text-2xl font-bold mb-2">🎯</div>
              <div className="text-sm">Exclusive tools access</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}