import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Acoustic Bird Classification",
  description: "AI-powered bird species identification from audio recordings for biodiversity monitoring",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="text-2xl">🐦</div>
                <span className="font-bold text-xl text-slate-900">
                  Acoustic Bird Classification
                </span>
              </Link>
              
              <div className="hidden md:flex items-center space-x-8">
                <Link 
                  href="/" 
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Home
                </Link>
                <Link 
                  href="/bird-classification" 
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Classify
                </Link>
                <Link 
                  href="/dataset" 
                  className="text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Dataset
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button className="text-slate-600 hover:text-slate-900">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        
        <main>{children}</main>
      </body>
    </html>
  );
}
