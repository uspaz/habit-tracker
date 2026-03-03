import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import ThemeToggle from "@/components/ui/ThemeToggle";

const poppins = Poppins({
  weight: ["400","500","600","700","800"],
  subsets: ["latin"]
});



export const metadata: Metadata = {
  title: "Hábitos diarios",
  description: "Continua con tu nuevo yo hoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash: lee localStorage ANTES del render para aplicar dark si corresponde */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.getItem('theme') === 'dark') {
              document.documentElement.classList.add('dark');
            }
          } catch {}
        `}} />
      </head>
      <body
        className={`${poppins.className} antialiased`}
      >
        <div className="min-h-screen max-w-screen bg-gray-50 dark:bg-gray-900 transition-colors">
          <Header></Header>
          {children}
          <ThemeToggle />
        </div>
      </body>
    </html>
  );
}
