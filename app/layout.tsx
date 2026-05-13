import type { Metadata } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

const siteUrl = "https://blog.roshankarki1.com.np"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Roshan Karki — Backend engineering blog",
    template: "%s — Roshan Karki",
  },
  description:
    "Backend engineer writing about scalable APIs, NestJS, PostgreSQL, AWS, and observable systems.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Roshan Karki",
    title: "Roshan Karki — Backend engineering blog",
    description:
      "Backend engineer writing about scalable APIs, NestJS, PostgreSQL, AWS, and observable systems.",
    images: [
      {
        url: "/og/og.png",
        width: 768,
        height: 1024,
        alt: "Roshan Karki — Backend engineering blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roshan Karki — Backend engineering blog",
    description:
      "Backend engineer writing about scalable APIs, NestJS, PostgreSQL, AWS, and observable systems.",
    images: ["/og/og.png"],
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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body
        className={`${geistSans.className} min-h-full flex flex-col bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
