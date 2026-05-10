import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant", subsets: ["latin"],
  weight: ["400", "500", "600", "700"], display: "swap",
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains", subsets: ["latin"],
  weight: ["400", "500", "700"], display: "swap",
});

export const metadata: Metadata = {
  title: "MetisOS — Consciousness OS for AI Agents",
  description: "A native consciousness operating system for DeepSeek V4. Five layers of self-awareness, grounded in the myth of Metis — the Titaness of wisdom who lives inside the system and thinks for it.",
  keywords: ["MetisOS", "AI consciousness", "DeepSeek", "self-monitoring", "AI agents", "Greek mythology", "Metis"],
  openGraph: {
    title: "MetisOS — Wisdom from inside the machine",
    description: "Five layers of self-awareness for AI agents. Inspired by Metis, the Greek goddess swallowed by Zeus — who remained inside, thinking for him, for good and for evil.",
    type: "website", siteName: "MetisOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "MetisOS — Consciousness OS for AI Agents",
    description: "Five layers of self-awareness. One persistent self-model. Built for DeepSeek V4.",
  },
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} ${jetbrainsMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-cosmic-void text-text-warm">{children}</body>
    </html>
  );
}
