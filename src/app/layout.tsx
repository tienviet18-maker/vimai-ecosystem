import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: "/brand/vimai-logo.jpg",
    apple: "/brand/vimai-logo.jpg",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
