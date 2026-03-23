import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/header/header";
import Footer from "@/components/shared/footer/footer";
import { ModalProvider } from "@/components/providers/ModalProvider";
import YandexMetrika from "@/components/YandexMetrika";
import { getSiteContext } from "@/lib/getSiteContext";
import YandexMetrikaParams from "@/components/YandexMetrikaParams";
import { CookieConsent } from "@/components/shared/CookieConsent/CookieConsent";

export async function generateMetadata(): Promise<Metadata> {
  const { city, seo, baseUrl } = await getSiteContext();

  return {
    title: seo?.title ?? "Полимерпесчаные люки — производство и продажа | 73полимер.рф",
    description:
      seo?.metaDescription ??
      "Производство полимерпесчаных люков в России. Доставка по всей РФ. Гарантия качества. Низкие цены.",
    keywords: [
      "полимерпесчаные люки",
      "канализационные люки",
      "люки от производителя",
      city?.city,
      city?.region,
      city?.geoRegion,
    ].filter(Boolean) as string[],
    alternates: {
      canonical: baseUrl,
    },
  };
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { city, metrikaId } = await getSiteContext();
  return (
    <html lang="ru">
      <body data-city={city?.subdomain ?? "root"}>
        <ModalProvider>
          <YandexMetrika metrikaId={metrikaId} />
          <YandexMetrikaParams />
          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </ModalProvider>
      </body>
    </html>
  );
}