import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Sherpa - Network with Autonomous Vehicles",
  description:
    "Sherpa is a tool that helps you network with autonomous vehicles.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
