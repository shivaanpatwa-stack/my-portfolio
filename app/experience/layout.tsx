import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience Vault — Shivaan Patwa",
  description:
    "Leadership programs, entrepreneurship, and experiences that shaped Shivaan Patwa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
