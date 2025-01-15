import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

import type { Metadata } from "next";
import MainNavbar from "./navbar";
import Container from 'react-bootstrap/esm/Container';
import Footer from './footer';
import { Playfair_Display } from 'next/font/google';

export const metadata: Metadata = {
  title: "Beth's Bon Bons & Cake Pops",
  description: "",
};

const primaryFont = Playfair_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-primary',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={primaryFont.variable}>
      <body
        className="d-flex flex-column min-vh-100"
      >
        <Container className="p-3">
          <MainNavbar />
          {children}
        </Container>
        <Container className="mt-auto">
          <Footer />
        </Container>
      </body>
    </html>
  );
}