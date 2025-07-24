"use client";

import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { useRouter } from "../../app/App";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function BlogPostPage() {
  const { params, navigate } = useRouter();

  const mockPost = {
    id: params.postId || "1",
    title: "10 Best SIP Mutual Funds for 2025",
    content: `
      <p>Systematic Investment Plan (SIP) is one of the most effective ways to build wealth over time. In this comprehensive guide, we'll explore the top 10 SIP mutual funds that offer excellent potential for 2025.</p>
      
      <h2>What is SIP?</h2>
      <p>SIP allows you to invest a fixed amount regularly in mutual funds, helping you benefit from rupee cost averaging and the power of compounding.</p>
      
      <h2>Top 10 SIP Mutual Funds for 2025</h2>
      <ol>
        <li><strong>Axis Bluechip Fund</strong> - Large cap fund with consistent performance</li>
        <li><strong>Mirae Asset Large Cap Fund</strong> - Diversified equity fund</li>
        <li><strong>SBI Small Cap Fund</strong> - High growth potential</li>
        <li><strong>HDFC Mid-Cap Opportunities Fund</strong> - Mid-cap exposure</li>
        <li><strong>Parag Parikh Flexi Cap Fund</strong> - Multi-cap flexibility</li>
      </ol>
      
      <h2>How to Choose the Right SIP Fund</h2>
      <p>Consider factors like your risk tolerance, investment horizon, and financial goals when selecting SIP funds.</p>
    `,
    category: "investment",
    author: "Rajesh Kumar",
    publishDate: "Jan 15, 2025",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop",
    tags: ["SIP", "Mutual Funds", "Investment"],
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => navigate("/blog")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <article>
          <header className="mb-8">
            <Badge className="mb-4">Investment</Badge>
            <h1 className="text-3xl md:text-4xl mb-4">{mockPost.title}</h1>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{mockPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{mockPost.publishDate}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{mockPost.readTime}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <ImageWithFallback
              src={mockPost.image}
              alt={mockPost.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </header>

          <div className="prose prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: mockPost.content }} />
          </div>

          <Separator className="my-8" />

          <div className="flex flex-wrap gap-2">
            {mockPost.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </article>

        <Card className="mt-8 p-6 bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground mb-2">Advertisement</p>
          <p className="text-lg">Your Ad Could Be Here</p>
        </Card>
      </div>
    </div>
  );
}