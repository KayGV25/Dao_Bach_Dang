import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from '@/components/navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trang Chủ | Đạo Bạch Đằng",
    template: "%s | Đạo Bạch Đằng"
  },
  description: "Trang web giới thiệu về Đạo Bạch Đằng",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-clip`}
      >
        <NavBar/>
        <div className="w-full bg-background">
          {children}
        </div>
        <footer className="w-svw bg-primary px-8 py-4 flex">
          <div>
            asdfasdf
          </div>
        </footer>
      </body>
    </html>
  );
}
