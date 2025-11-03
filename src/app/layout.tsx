import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Howbout - Social Calendar",
  description: "A sleek, modern social calendar app for planning with friends",
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
