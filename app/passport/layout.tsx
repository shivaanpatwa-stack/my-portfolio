import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Passport — Shivaan Patwa",
  description:
    "29 countries, 6 continents — the travel story of Shivaan Patwa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
