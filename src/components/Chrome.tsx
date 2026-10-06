"use client";
import { usePathname } from "next/navigation";

/** Public header/footer are hidden inside /admin. */
export function Chrome({ header, footer, children }: { header: React.ReactNode; footer: React.ReactNode; children: React.ReactNode }) {
  const admin = usePathname().startsWith("/admin");
  return (
    <>
      {!admin && header}
      <main id="main">{children}</main>
      {!admin && footer}
    </>
  );
}
