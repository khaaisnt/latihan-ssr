import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latihan SSR",
  description: "Aplikasi SSR dengan Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[#F5F8FB]">
      <main>
        <Navbar />
        {children}
      </main>
    </div>
  );
}
