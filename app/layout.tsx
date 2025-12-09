import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const romanticLovely = localFont({
  src: "../public/fonts/Romantic-Lovely.ttf",
  variable: "--font-romanticLovely",
  style: 'normal',
});


export const metadata: Metadata = {
  title: "Forever Invites",
  description: "Crea tu invitación",
};

export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  };
}

const agatho = localFont({
  src: [
    {
      path: "../public/fonts/Agatho-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Agatho-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Agatho-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Agatho-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Agatho-Narrow.otf",
      weight: "400",
      style: "normal",
    },
    // Opcionales si quieres usar CAPS como variantes separadas
    {
      path: "../public/fonts/Agatho-RegularCAPS.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Agatho-LightCAPS.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Agatho-BoldCAPS.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-agatho",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${agatho.variable} ${romanticLovely.variable} antialiased `}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
