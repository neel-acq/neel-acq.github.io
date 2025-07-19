"use client";

import { useEffect } from "react";
import { Bookmark, Calendar, User, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useAuth, useRouter } from "../../app/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function BookmarksPage() {
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

  const mockBookmarks = [
    {
      id: "2",
      title: "How to Improve Your Credit Score in 30 Days",
      description: "Practical steps to boost your credit score quickly and maintain good financial health.",
      category: "credit",
      author: "Priya Sharma",
      publishDate: "Jan 12, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=240&fit=crop",
    },
    {
      id: "5",
      title: "Home Loan vs Rent: What's Better in 2025?",
      description: "An in-depth analysis of whether you should buy a home or continue renting.",
      category: "loans",
      author: "Suresh Patel", 
      publishDate: "Jan 5, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=240&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl mb-2">Bookmarked Articles</h1>
          <p className="text-muted-foreground">
            Articles you've saved for later reading
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBookmarks.map((article) => (
            <Card 
              key={article.id} 
              className="group cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg"
              onClick={() => navigate(`/blog/${article.id}`)}
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute top-3 left-3">
                  <Badge>{article.category}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {article.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  <span>{article.readTime}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockBookmarks.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg mb-2">No bookmarks yet</h3>
            <p className="text-muted-foreground">Start reading articles and bookmark them for later!</p>
          </div>
        )}
      </div>
    </div>
  );
}