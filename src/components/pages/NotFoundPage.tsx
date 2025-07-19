"use client";

import { Home, ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "../../app/App";

export function NotFoundPage() {
  const { navigate } = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-muted-foreground mb-4">404</h1>
          <h2 className="text-2xl mb-4">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => navigate("/")} className="w-full">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()} 
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}