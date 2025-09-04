import Navbar from "@/components/layout/navbar";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Indonesia Digital Learning",
  description: "A platform for digital learning in Indonesia",
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
