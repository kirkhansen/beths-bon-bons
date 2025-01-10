import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";

import type { Metadata } from "next";
import MainNavbar from "./navbar";
import Container from 'react-bootstrap/esm/Container';
import Footer from './footer';

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