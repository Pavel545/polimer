import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";

// Настройка шрифтов через next/font
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Название вашего проекта",
  description: "Описание проекта",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        {/* Подключаем SF Pro Text как кастомный шрифт */}
        <link
          rel="stylesheet"
          href="https://fonts.cdnfonts.com/css/sf-pro-text"
        />
      </head>
      <body>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}