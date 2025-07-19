"use client";

import { useRouter } from "../../app/App";

export function Footer() {
  const { navigate } = useRouter();

  const footerSections = [
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
      ],
    },
    {
      title: "Tools",
      links: [
        { name: "SIP Calculator", path: "/tools/sip-calculator" },
        { name: "EMI Calculator", path: "/tools/emi-calculator" },
        { name: "Budget Planner", path: "/tools/budget-planner" },
        { name: "Credit Score", path: "/tools/credit-score" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", path: "/blog" },
        { name: "Financial Tips", path: "/blog?category=tips" },
        { name: "Investment Guide", path: "/blog?category=investment" },
        { name: "Credit Cards", path: "/blog?category=credit-cards" },
      ],
    },
  ];

  return (
    <footer className="bg-muted/50 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground">₹</span>
              </div>
              <span className="text-xl font-semibold">FinFlip</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for personal finance management. Calculate, plan, and achieve your financial goals.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Made with ❤️ for financial wellness</p>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-border" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 FinFlip. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Disclaimer: This tool provides estimates only. Consult a financial advisor for personalized advice.
          </p>
        </div>
      </div>
    </footer>
  );
}