import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from '@/components/navbar';
import { FaLocationArrow } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoTime } from "react-icons/io5";
import { Analytics } from "@vercel/analytics/next"

import Link from "next/link";

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <meta name="apple-mobile-web-app-title" content="Đạo Bạch Đằng" />
        <meta name="google-site-verification" content="hvN2a2Y9DDlarXiht0RqmaOxmGw0q-fdUmYkg9zfjr8" />
        <meta property="og:logo" content="your value" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <NavBar/>
        <main className="pt-14 min-h-screen pb-12">
          <div className="w-full bg-background">
            {children}
          </div>
        </main>
        <footer className="w-full bg-primary px-8 py-4 flex justify-start text-white text-xs">
          <div className="flex flex-col gap-1">
            <Link href="https://maps.app.goo.gl/kaDR5Xo2ZVKxZVeR6" target="_blank" className="flex gap-2">
              <FaLocationArrow className="self-center"/>
              <span>Khu B - Công viên Hoàng Văn Thụ, Phường 2, Tân Bình, Thành phố Hồ Chí Minh, Việt Nam</span>
            </Link>
            <Link href="https://www.facebook.com/daobachdangofficial" target="_blank" className="flex gap-2">
              <FaFacebook className="self-center"/>
              <span>Page Đạo Bạch Đằng</span>
            </Link>
            <div className="flex gap-1.5">
              <IoTime className="self-center"/>
              <span>Thời gian hoạt động: 8:30 - 11h30, Chủ Nhật hằng tuần</span>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
