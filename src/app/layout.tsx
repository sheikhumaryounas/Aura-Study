import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AuraStudy — Premium AI Study Companion",
    template: "%s | AuraStudy",
  },
  description:
    "AuraStudy is a premium AI-powered study companion with Pomodoro focus timer, subject tracker, streaks, leaderboard, and analytics dashboard.",
  keywords: [
    "study app",
    "pomodoro timer",
    "focus timer",
    "study companion",
    "AI study",
    "learning analytics",
  ],
  authors: [{ name: "AuraStudy Team" }],
  openGraph: {
    title: "AuraStudy — Premium AI Study Companion",
    description: "Level up your learning with AI-powered focus sessions and study analytics.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-sans antialiased" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
        {/* Ambient background blobs */}
        <div className="ambient-bg" aria-hidden="true" />

        {/* Nav */}
        <Navbar />

        {/* Main content */}
        <main style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
          {children}
        </main>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
