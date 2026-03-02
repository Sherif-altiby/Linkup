import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./__components/home/Navbar";
import { getCurrentUser } from "@/lib/auth/currentUser";
import UserInitializer from "@/lib/UserInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkUp",
  description: "LinkUp is a next-gen social platform to connect, chat, and discover content you love.",
};

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {

    const user = await getCurrentUser()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 text-text-color`}
      >
        <UserInitializer user={user} />
          <Navbar />
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
