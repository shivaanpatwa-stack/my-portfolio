import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Finance Lab — Shivaan Patwa",
  description:
    "Weekly Finance Journal, market analysis tools, and financial education by Shivaan Patwa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
