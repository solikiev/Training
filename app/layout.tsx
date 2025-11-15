import type { Metadata, Viewport } from "next";
import "./globals.css";
import PWARegistration from "./components/PWARegistration";

export const metadata: Metadata = {
  title: "Training Tracker",
  description: "Track your fitness training sessions with color-coded calendar and detailed history",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Training Tracker",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#3b82f6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PWARegistration />
        {children}
      </body>
    </html>
  );
}
