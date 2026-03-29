import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageTransition from "./components/PageTransition";
import LoadingScreen from "./components/LoadingScreen";
import GlobalUI from "./components/GlobalUI";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shivaan Patwa — Finance, MUN & Global Citizen",
  description:
    "Personal portfolio of Shivaan Patwa — finance enthusiast, Model UN delegate, and global citizen across 29 countries.",
  keywords: [
    "Shivaan Patwa",
    "Finance",
    "MUN",
    "Model UN",
    "Portfolio",
    "Oberoi International School",
    "Weekly Finance Journal",
  ],
  authors: [{ name: "Shivaan Patwa" }],
  openGraph: {
    title: "Shivaan Patwa — Finance, MUN & Global Citizen",
    description:
      "Personal portfolio of Shivaan Patwa — finance enthusiast, Model UN delegate, and global citizen across 29 countries.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivaan Patwa — Finance, MUN & Global Citizen",
    description:
      "Personal portfolio of Shivaan Patwa — finance enthusiast, Model UN delegate, and global citizen across 29 countries.",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GlobalUI />
        <LoadingScreen />
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
