import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import MainNavbar from "./navbar";
import Container from 'react-bootstrap/esm/Container';
import Footer from './footer';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Beth's Bon Bons & Cake Pops",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Container className="p-3">
        <MainNavbar />
        {children}
        <Footer />
        </Container>
      </body>
    </html>
  );
}