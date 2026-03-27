"use client";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const styles = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .page-transition {
    animation: fadeInUp 0.3s ease forwards;
  }
`;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <style>{styles}</style>
      <div key={pathname} className="page-transition">
        {children}
      </div>
    </>
  );
}
