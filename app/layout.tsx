import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export const metadata: Metadata = {
  title: "Beauté-Beauté",
  description: "Luxury Beauty E-commerce",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
  <AuthProvider>
  <WishlistProvider>
    <Header />
    <main>{children}</main>
    <Footer />
  </WishlistProvider>
</AuthProvider>
</body>
    </html>
  );
}