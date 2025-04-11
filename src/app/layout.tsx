import type { Metadata } from "next";
import { Poppins, Fira_Code } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meta 100k - Acompanhe seu progresso",
  description: "Controle suas apostas e acompanhe seu progresso rumo aos R$100.000",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Meta 100k",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="apple-touch-icon" href="/icon-512x512.png" />
        <link rel="apple-touch-startup-image" href="/splash.png" />
        <meta name="theme-color" content="#1e1e1e" />
      </head>
      <body
        className={`${poppins.variable} ${firaCode.variable} font-sans antialiased bg-gray-800 text-white`}
      >
        {children}
      </body>
    </html>
  );
}
