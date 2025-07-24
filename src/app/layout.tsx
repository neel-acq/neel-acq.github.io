import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
// import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinFlip – Smart Personal Finance Tools & Blog",
  description: "FinFlip helps you flip your finances with powerful tools, insights, and expert blog articles.",
  keywords: ["personal finance", "budget", "EMI calculator", "FinFlip", "money saving", "investing"],
  metadataBase: new URL("https://finflip.vercel.app"),
  openGraph: {
    title: "FinFlip – Smart Personal Finance Tools",
    description: "Tools, tips, and blog articles to manage your money smarter.",
    url: "https://finflip.vercel.app",
    siteName: "FinFlip",
    images: [
      {
        url: "https://finflip.vercel.app/logo.png", // Put in /public
        width: 1200,
        height: 630,
        alt: "FinFlip Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinFlip",
    description: "Flip your finances. Manage smarter.",
    creator: "@unknown", // optional
    images: ["https://finflip.vercel.app/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="zJ2UKtQdEmhkKzINo6Vakhh3yUSDpNWvm7-W4EQ4I2A" />
        {/* ✅ Google AdSense script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6060938536896052"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
