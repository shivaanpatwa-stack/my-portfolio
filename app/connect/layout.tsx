import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connect — Shivaan Patwa",
  description:
    "Get in touch with Shivaan Patwa — open to collaborations, connections, and conversations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
