import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Navbar from "@/components/shop/Navbar";
import "./globals.css";
import Footer from "@/components/shop/Footer";
import Marquee from "@/components/shop/Marquee";
import { ToastProvider } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Bead Luxe | Handcrafted Luxury",
  description: "Exquisite handcrafted beads and jewelry",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <ToastProvider>
          <Navbar />
          <main>{children}</main>
          <Marquee />
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
