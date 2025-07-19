"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function AboutPage() {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4">About FinFlip</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for personal finance management and financial literacy
          </p>
        </div>

        <div className="grid gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                FinFlip is dedicated to empowering individuals with the tools and knowledge they need to make informed financial decisions. We believe that financial literacy should be accessible to everyone, regardless of their background or experience level.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What We Offer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg mb-2">Comprehensive Financial Tools</h3>
                <p className="text-muted-foreground">
                  From SIP calculators to budget planners, our suite of tools helps you plan, calculate, and achieve your financial goals.
                </p>
              </div>
              <div>
                <h3 className="text-lg mb-2">Expert Financial Content</h3>
                <p className="text-muted-foreground">
                  Stay updated with the latest market insights, investment strategies, and personal finance tips from our team of experts.
                </p>
              </div>
              <div>
                <h3 className="text-lg mb-2">User-Friendly Experience</h3>
                <p className="text-muted-foreground">
                  Our platform is designed to be intuitive and accessible, making complex financial calculations simple and understandable.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
              <CardDescription>Get in touch with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Email:</strong> support@finflip.com</p>
                <p><strong>Phone:</strong> +91 98765 43210</p>
                <p><strong>Address:</strong> 123 Finance Street, Mumbai, India</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}