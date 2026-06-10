import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Siam Diet — Bakının Premium Sağlam Qidalanma və Diet Meal Platforması",
  description: "Bakıda fərdiləşdirilmiş pəhriz yeməkləri, fitnes nutrition və diyetoloq təsdiqli menyuların çatdırılması. Gündəlik kalorini hesabla, fərdi boşqabını qur və WhatsApp ilə dərhal sifariş et!",
  keywords: ["diet yemek baki", "diet qida baki", "healthy food baku", "fitness food baku", "keto diet baku", "vegan food baku", "siam diet"],
  openGraph: {
    title: "Siam Diet — Premium Sağlam Qidalanma",
    description: "Kalorini hesabla. Menyunu qur. Sağlam qidalan. Biz çatdıraq.",
    url: "https://siamdiet.az", // Placeholder
    siteName: "Siam Diet",
    locale: "az_AZ",
    type: "website",
  },
  alternates: {
    canonical: "https://siamdiet.az",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="az" className="scroll-smooth">
      <body className="font-sans antialiased text-color-text-primary bg-color-background min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-grow pt-[80px]">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
