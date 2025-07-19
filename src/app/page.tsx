import { AppProvider } from "../../components/AppContext";
import { AuthProvider } from "../../components/AuthContext";
import { ToastProvider } from "../../components/ToastProvider";
import { Header } from "../../components/Header";
import { HeroSection } from "../../components/HeroSection";
import { TrendingTools } from "../../components/TrendingTools";
import { FeaturedBlogs } from "../../components/FeaturedBlogs";
import { Newsletter } from "../../components/Newsletter";
import { Footer } from "../../components/Footer";
import {
  AdSenseBanner,
  AdSenseInContent,
  AdSenseMobileSticky,
} from "../../components/AdSense";
import {
  PWAInstallPrompt,
  OfflineBanner,
} from "../../components/PWAComponents";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <div className="min-h-screen bg-background">
          {/* Toast Notifications */}
          <ToastProvider />

          {/* PWA Components */}
          <OfflineBanner />
          <PWAInstallPrompt />

          {/* Main App Structure */}
          <Header />

          {/* Top Banner Ad */}
          <div className="container mx-auto px-4 py-4">
            <AdSenseBanner className="w-full max-w-3xl mx-auto" />
          </div>

          <main>
            <HeroSection />
            <TrendingTools />

            {/* In-Content Ad */}
            <div className="container mx-auto px-4 py-8">
              <AdSenseInContent className="w-full max-w-md mx-auto" />
            </div>

            <FeaturedBlogs />
            <Newsletter />
          </main>

          <Footer />

          {/* Mobile Sticky Ad */}
          <AdSenseMobileSticky />
        </div>
      </AppProvider>
    </AuthProvider>
  );
}