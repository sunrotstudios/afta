import type { Metadata } from "next";
import "./globals.css";
import { GridProvider } from "../context/GridContext";

export const metadata: Metadata = {
  title: "Cratify",
  description: "the music nerds little grid maker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Custom font preload */}
        <link rel="preload" href="/fonts/Mondwest.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="custom-font">
        <div className="noise-overlay"></div>
        <GridProvider>
          {children}
        </GridProvider>
      </body>
    </html>
  );
}