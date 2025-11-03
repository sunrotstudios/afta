import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "afta - You down?",
  description: "The social calendar that helps friends actually sync up. Make plans that happen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
