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
  title: "FinFlip - Your Finance Companion",
  description: "FinFlip helps you manage your finances efficiently.",
  keywords: "finance, budgeting, tools, FinFlip",
  openGraph: {
    title: "FinFlip",
    description: "FinFlip helps you manage your finances efficiently.",
    url: "https://finflip.vercel.app/",
    siteName: "FinFlip",
    images: [
      {
        url: "../public/logo.png",
        width: 1200,
        height: 630,
        alt: "FinFlip Logo",
      },
    ],
    locale: "en_US",
    type: "website",
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
