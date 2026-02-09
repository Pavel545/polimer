import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";
import { ModalProvider } from "@/components/providers/ModalProvider";

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
  title: "Производcтво канализационных полимерпесчаных (полимерно песчаных) пластиковых люков",
  description: "Изготовление полимерно песчаных люков - канализационные люки из пластика! Доставка продукции собственного производства по всем регионам России! Оставляйте заявку на сайте или звоните +7 (967) 771-79-86",
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
        <ModalProvider>
          <Header />
          {children}
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
