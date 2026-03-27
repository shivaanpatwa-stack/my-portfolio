import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MUN Arena — Shivaan Patwa",
  description:
    "Model UN conference record, committee experience, and delegate profile of Shivaan Patwa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
