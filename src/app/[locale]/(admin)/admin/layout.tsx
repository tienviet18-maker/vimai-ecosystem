import type { ReactNode } from "react";

export const runtime = "edge";

export const metadata = {
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return children;
}

