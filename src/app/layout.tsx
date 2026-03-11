import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";
import { ModalProvider } from "@/components/providers/ModalProvider";



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
    <html lang="ru" >
      <head>
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
